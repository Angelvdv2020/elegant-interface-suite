import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EditorTopbar from "@/components/editor/EditorTopbar";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorProperties from "@/components/editor/EditorProperties";
import { useEditorData } from "@/hooks/useEditorData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Section, SectionType, Breakpoint, ResponsiveSettings } from "@/components/editor/types";
import { sectionTemplates } from "@/components/editor/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";
import VersionHistory from "@/components/editor/VersionHistory";
import { downloadHtml } from "@/lib/exportHtml";

const EditorPage = () => {
  const { sections, setSections, siteId, pageId, isLoading, isAuthenticated, saveStatus } = useEditorData();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"design" | "layers" | "blocks">("design");
  const [previewMode, setPreviewMode] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Undo/Redo history
  const [history, setHistory] = useState<Section[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const pushHistory = useCallback((newSections: Section[]) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIndex + 1);
      const next = [...trimmed, newSections].slice(-50);
      setHistoryIndex(next.length - 1);
      return next;
    });
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const i = historyIndex - 1;
      setHistoryIndex(i);
      setSections(history[i]);
    }
  }, [historyIndex, history, setSections]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const i = historyIndex + 1;
      setHistoryIndex(i);
      setSections(history[i]);
    }
  }, [historyIndex, history, setSections]);

  const handleSectionsReorder = useCallback((newSections: Section[]) => {
    setSections(newSections);
    pushHistory(newSections);
  }, [setSections, pushHistory]);

  const handleContentChange = useCallback((sectionId: string, content: Section["content"]) => {
    const updated = sections.map(s => s.id === sectionId ? { ...s, content } : s);
    setSections(updated);
    pushHistory(updated);
  }, [sections, setSections, pushHistory]);

  const handleAddSection = useCallback((type: SectionType) => {
    const tmpl = sectionTemplates[type];
    const newSection: Section = {
      id: crypto.randomUUID(),
      type,
      label: tmpl.label,
      content: { ...tmpl.content },
    };
    const updated = [...sections, newSection];
    setSections(updated);
    pushHistory(updated);
    setSelected(newSection.id);
  }, [sections, setSections, pushHistory]);

  const handleDeleteSection = useCallback((id: string) => {
    const updated = sections.filter(s => s.id !== id);
    setSections(updated);
    pushHistory(updated);
    if (selected === id) setSelected(updated[0]?.id ?? "");
  }, [sections, setSections, pushHistory, selected]);

  const handlePublish = useCallback(async () => {
    if (!pageId) return;
    await supabase.from("pages").update({ is_published: true, published_at: new Date().toISOString(), is_draft: false }).eq("id", pageId);
    // Save version snapshot
    const { data: versions } = await supabase
      .from("page_versions")
      .select("version_number")
      .eq("page_id", pageId)
      .order("version_number", { ascending: false })
      .limit(1);
    const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;
    await supabase.from("page_versions").insert({
      page_id: pageId,
      version_number: nextVersion,
      sections_snapshot: sections as unknown as Json,
      created_by: user?.id ?? null,
    });
    toast.success(`Опубликовано (v${nextVersion})`);
  }, [pageId, sections, user]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate("/");
  }, [signOut, navigate]);

  const handleRestoreVersion = useCallback((restoredSections: Section[]) => {
    setSections(restoredSections);
    pushHistory(restoredSections);
  }, [setSections, pushHistory]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const statusLabel = saveStatus === "saved" ? "● Сохранено" : saveStatus === "saving" ? "● Сохранение…" : "● Не сохранено";
  const statusColor = saveStatus === "saved" ? "text-success" : saveStatus === "saving" ? "text-warning" : "text-destructive";

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <EditorTopbar
        device={device}
        setDevice={setDevice}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        previewMode={previewMode}
        onTogglePreview={() => setPreviewMode(!previewMode)}
        onPublish={handlePublish}
        saveStatus={saveStatus}
        onSignOut={handleSignOut}
        onOpenHistory={() => setHistoryOpen(true)}
        onExportHtml={() => downloadHtml(sections, "Страница")}
      />
      <div className="flex flex-1 overflow-hidden">
        {!previewMode && (
          <EditorSidebar
            sections={sections}
            selected={selected}
            setSelected={setSelected}
            siteId={siteId}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
        )}
        <EditorCanvas
          device={device}
          sections={sections}
          selected={selected}
          setSelected={setSelected}
          onSectionsReorder={handleSectionsReorder}
          onSectionContentChange={handleContentChange}
          onDeleteSection={handleDeleteSection}
          previewMode={previewMode}
        />
        {!previewMode && (
          <EditorProperties sections={sections} selected={selected} setSelected={setSelected} />
        )}
      </div>
      <div className="flex items-center gap-4 px-3 h-6 border-t border-border bg-secondary/50 text-[10px] text-muted-foreground shrink-0">
        <span className={`${statusColor} font-medium`}>{statusLabel}</span>
        <span>Zoom: 100%</span>
        <span>{device === "desktop" ? "1280" : device === "tablet" ? "768" : "375"} × auto</span>
        {!isAuthenticated && <span className="text-warning">Войдите для сохранения</span>}
        <span className="ml-auto">v2.4.1</span>
      </div>
      <VersionHistory
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        pageId={pageId}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
};

export default EditorPage;
