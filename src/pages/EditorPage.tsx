import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EditorTopbar from "@/components/editor/EditorTopbar";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorProperties from "@/components/editor/EditorProperties";
import { useEditorData } from "@/hooks/useEditorData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Section, SectionType, Breakpoint, ResponsiveSettings, AnimationType } from "@/components/editor/types";
import { sectionTemplates } from "@/components/editor/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";
import VersionHistory from "@/components/editor/VersionHistory";
import GlobalSettings from "@/components/editor/GlobalSettings";
import OnboardingTour from "@/components/editor/OnboardingTour";
import SaveAsTemplate from "@/components/editor/SaveAsTemplate";
import { downloadHtml } from "@/lib/exportHtml";

const EditorPage = () => {
  const {
    sections, setSections, siteId, pageId, pages, activePageId,
    switchPage, addPage, deletePage,
    isLoading, isAuthenticated, saveStatus,
    siteSettings, updateSiteSettings,
  } = useEditorData();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"design" | "layers" | "blocks">("design");
  const [previewMode, setPreviewMode] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  // Undo/Redo
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
    if (historyIndex > 0) { const i = historyIndex - 1; setHistoryIndex(i); setSections(history[i]); }
  }, [historyIndex, history, setSections]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) { const i = historyIndex + 1; setHistoryIndex(i); setSections(history[i]); }
  }, [historyIndex, history, setSections]);

  const handleSectionsReorder = useCallback((ns: Section[]) => { setSections(ns); pushHistory(ns); }, [setSections, pushHistory]);

  const handleContentChange = useCallback((sectionId: string, content: Section["content"]) => {
    const updated = sections.map(s => s.id === sectionId ? { ...s, content } : s);
    setSections(updated); pushHistory(updated);
  }, [sections, setSections, pushHistory]);

  const handleAddSection = useCallback((type: SectionType) => {
    const tmpl = sectionTemplates[type];
    const ns: Section = { id: crypto.randomUUID(), type, label: tmpl.label, content: { ...tmpl.content } };
    const updated = [...sections, ns];
    setSections(updated); pushHistory(updated); setSelected(ns.id);
  }, [sections, setSections, pushHistory]);

  const handleDuplicateSection = useCallback((id: string) => {
    const idx = sections.findIndex(s => s.id === id);
    if (idx === -1) return;
    const original = sections[idx];
    const dup: Section = { ...original, id: crypto.randomUUID(), label: `${original.label} (копия)`, content: JSON.parse(JSON.stringify(original.content)) };
    const updated = [...sections.slice(0, idx + 1), dup, ...sections.slice(idx + 1)];
    setSections(updated); pushHistory(updated); setSelected(dup.id);
  }, [sections, setSections, pushHistory]);

  const handleDeleteSection = useCallback((id: string) => {
    const updated = sections.filter(s => s.id !== id);
    setSections(updated); pushHistory(updated);
    if (selected === id) setSelected(updated[0]?.id ?? "");
  }, [sections, setSections, pushHistory, selected]);

  const handleUpdateResponsive = useCallback((sectionId: string, responsive: Record<Breakpoint, ResponsiveSettings>) => {
    const updated = sections.map(s => s.id === sectionId ? { ...s, responsive } : s);
    setSections(updated); pushHistory(updated);
  }, [sections, setSections, pushHistory]);

  const handlePublish = useCallback(async () => {
    if (!pageId) return;
    await supabase.from("pages").update({ is_published: true, published_at: new Date().toISOString(), is_draft: false }).eq("id", pageId);
    const { data: versions } = await supabase.from("page_versions").select("version_number").eq("page_id", pageId).order("version_number", { ascending: false }).limit(1);
    const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;
    await supabase.from("page_versions").insert({ page_id: pageId, version_number: nextVersion, sections_snapshot: sections as unknown as Json, created_by: user?.id ?? null });
    toast.success(`Опубликовано (v${nextVersion})`);
  }, [pageId, sections, user]);

  const handleSignOut = useCallback(async () => { await signOut(); navigate("/"); }, [signOut, navigate]);

  const handleRestoreVersion = useCallback((rs: Section[]) => { setSections(rs); pushHistory(rs); }, [setSections, pushHistory]);

  // Page management handlers
  const handleSelectPage = useCallback((id: string) => {
    setSelected("");
    setHistory([]); setHistoryIndex(-1);
    switchPage(id);
  }, [switchPage]);

  const handleAddPage = useCallback(async () => {
    const title = prompt("Название страницы:");
    if (!title?.trim()) return;
    const newPage = await addPage(title.trim());
    if (newPage) {
      setTimeout(() => switchPage(newPage.id), 300);
    }
  }, [addPage, switchPage]);

  const handleDeletePage = useCallback(async (id: string) => {
    if (!confirm("Удалить эту страницу?")) return;
    await deletePage(id);
  }, [deletePage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const statusLabel = saveStatus === "saved" ? "● Сохранено" : saveStatus === "saving" ? "● Сохранение…" : "● Не сохранено";
  const statusColor = saveStatus === "saved" ? "text-green-600" : saveStatus === "saving" ? "text-amber-500" : "text-destructive";
  const currentPage = pages.find(p => p.id === activePageId);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <EditorTopbar
        device={device} setDevice={setDevice}
        activeTab={activeTab} setActiveTab={setActiveTab}
        onUndo={handleUndo} onRedo={handleRedo}
        canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1}
        previewMode={previewMode} onTogglePreview={() => setPreviewMode(!previewMode)}
        onPublish={handlePublish} saveStatus={saveStatus}
        onSignOut={handleSignOut} onOpenHistory={() => setHistoryOpen(true)}
        onExportHtml={() => downloadHtml(sections, currentPage?.title ?? "Страница")}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        {!previewMode && (
          <EditorSidebar
            sections={sections} selected={selected} setSelected={setSelected}
            siteId={siteId} onAddSection={handleAddSection} onDeleteSection={handleDeleteSection}
            pages={pages.map(p => ({ id: p.id, title: p.title, isActive: p.id === activePageId }))}
            onSelectPage={handleSelectPage}
            onAddPage={handleAddPage}
          />
        )}
        <EditorCanvas
          device={device} sections={sections} selected={selected} setSelected={setSelected}
          onSectionsReorder={handleSectionsReorder} onSectionContentChange={handleContentChange}
          onDeleteSection={handleDeleteSection} onDuplicateSection={handleDuplicateSection}
          previewMode={previewMode}
        />
        {!previewMode && (
          <EditorProperties sections={sections} selected={selected} setSelected={setSelected} onUpdateResponsive={handleUpdateResponsive} />
        )}
      </div>
      <div className="flex items-center gap-4 px-3 h-6 border-t border-border bg-secondary/50 text-[10px] text-muted-foreground shrink-0">
        <span className={`${statusColor} font-medium`}>{statusLabel}</span>
        <span>Страница: {currentPage?.title ?? "—"}</span>
        <span>{pages.length} стр.</span>
        <span>{device === "desktop" ? "1280" : device === "tablet" ? "768" : "375"} × auto</span>
        {!isAuthenticated && <span className="text-amber-500">Войдите для сохранения</span>}
        <span className="ml-auto">v3.0</span>
      </div>
      <VersionHistory open={historyOpen} onClose={() => setHistoryOpen(false)} pageId={pageId} onRestore={handleRestoreVersion} />
      <GlobalSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} settings={siteSettings} onUpdate={updateSiteSettings} />
      <OnboardingTour forceOpen={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
};

export default EditorPage;
