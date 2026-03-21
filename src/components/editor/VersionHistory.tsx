import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { History, RotateCcw, Eye, X, Loader2, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Section, SectionContent } from "./types";
import { toast } from "sonner";

interface VersionHistoryProps {
  open: boolean;
  onClose: () => void;
  pageId: string | null;
  onRestore: (sections: Section[]) => void;
}

interface VersionRow {
  id: string;
  version_number: number;
  created_at: string;
  sections_snapshot: unknown;
}

const VersionHistory = ({ open, onClose, pageId, onRestore }: VersionHistoryProps) => {
  const [previewVersion, setPreviewVersion] = useState<VersionRow | null>(null);

  const { data: versions = [], isLoading } = useQuery({
    queryKey: ["page-versions", pageId],
    queryFn: async () => {
      if (!pageId) return [];
      const { data, error } = await supabase
        .from("page_versions")
        .select("id, version_number, created_at, sections_snapshot")
        .eq("page_id", pageId)
        .order("version_number", { ascending: false });
      if (error) throw error;
      return data as VersionRow[];
    },
    enabled: !!pageId && open,
  });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }) +
      " " + d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  const parseSections = (snapshot: unknown): Section[] => {
    if (!Array.isArray(snapshot)) return [];
    return (snapshot as any[]).map((s) => ({
      id: s.id ?? crypto.randomUUID(),
      type: s.type,
      label: s.label,
      content: s.content as SectionContent,
    }));
  };

  const handleRestore = (version: VersionRow) => {
    const sections = parseSections(version.sections_snapshot);
    if (sections.length === 0) {
      toast.error("Не удалось разобрать снимок");
      return;
    }
    onRestore(sections);
    toast.success(`Восстановлено из v${version.version_number}`);
    onClose();
  };

  const previewSections = previewVersion ? parseSections(previewVersion.sections_snapshot) : [];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border shrink-0">
          <DialogTitle className="text-base font-semibold flex items-center gap-2">
            <History className="h-4 w-4" />
            История версий
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden min-h-[400px]">
          {/* Version list */}
          <div className="w-[260px] shrink-0 border-r border-border overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : versions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground px-4 text-center">
                <Clock className="h-8 w-8 opacity-30" />
                <p className="text-sm">Нет сохранённых версий</p>
                <p className="text-[11px]">Версии создаются при публикации</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {versions.map((v) => {
                  const isActive = previewVersion?.id === v.id;
                  const sectionCount = Array.isArray(v.sections_snapshot) ? (v.sections_snapshot as any[]).length : 0;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setPreviewVersion(v)}
                      className={`rounded-lg p-3 cursor-pointer transition-colors ${
                        isActive
                          ? "bg-brand-light border border-brand/20"
                          : "hover:bg-secondary border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[13px] font-semibold ${isActive ? "text-brand" : "text-foreground"}`}>
                          Версия {v.version_number}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{sectionCount} блок.</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">{formatDate(v.created_at)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Preview area */}
          <div className="flex-1 overflow-y-auto bg-[#f5f5f5]">
            {!previewVersion ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                <Eye className="h-8 w-8 opacity-30" />
                <p className="text-sm">Выберите версию для предпросмотра</p>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-medium text-foreground">
                    Предпросмотр v{previewVersion.version_number}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleRestore(previewVersion)}
                    className="gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Восстановить
                  </Button>
                </div>
                <div className="bg-background rounded-lg shadow-sm overflow-hidden">
                  {previewSections.map((s) => (
                    <VersionSectionPreview key={s.id} section={s} />
                  ))}
                  {previewSections.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground text-sm">Пустой снимок</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function VersionSectionPreview({ section }: { section: Section }) {
  const c = section.content as any;

  if (section.type === "hero") {
    return (
      <div className="p-5 border-b border-border">
        <div className="w-full h-16 rounded-lg bg-gradient-to-r from-brand to-brand-700 mb-3" />
        <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
        <p className="text-[12px] text-muted-foreground mb-2">{c.description}</p>
        <span className="inline-block px-3 py-1.5 bg-brand text-brand-light rounded text-[12px]">{c.buttonText}</span>
      </div>
    );
  }

  if (section.type === "cards") {
    return (
      <div className="p-5 border-b border-border">
        <div className="grid grid-cols-3 gap-2">
          {c.cards?.map((card: any, i: number) => (
            <div key={i} className="border border-border rounded p-3">
              <div className={`w-5 h-5 rounded ${card.bg} mb-2`} />
              <div className="text-[12px] font-medium">{card.label}</div>
              <div className="text-[11px] text-muted-foreground">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === "cta") {
    return (
      <div className="p-5 border-b border-border">
        <div className={`${c.bgColor || "bg-brand"} rounded-lg p-6 text-center`}>
          <h3 className="text-lg font-bold text-brand-light mb-1">{c.title}</h3>
          <p className="text-[12px] text-brand-light/80">{c.description}</p>
        </div>
      </div>
    );
  }

  if (section.type === "form") {
    return (
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-semibold mb-2">{c.title}</h3>
        <div className="space-y-1">
          {c.fields?.map((f: any, i: number) => (
            <div key={i} className="text-[11px] text-muted-foreground">📝 {f.label} ({f.type})</div>
          ))}
        </div>
      </div>
    );
  }

  // text, separator, gallery fallback
  return (
    <div className="p-5 border-b border-border">
      <h3 className="text-sm font-semibold mb-1">{c.title || section.label}</h3>
      {c.body && <p className="text-[12px] text-muted-foreground">{c.body}</p>}
    </div>
  );
}

export default VersionHistory;
