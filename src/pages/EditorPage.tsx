import { useState, useCallback } from "react";
import EditorTopbar from "@/components/editor/EditorTopbar";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorProperties from "@/components/editor/EditorProperties";
import { useEditorData } from "@/hooks/useEditorData";
import type { Section } from "@/components/editor/types";
import { Loader2 } from "lucide-react";

const EditorPage = () => {
  const {
    sections, setSections, siteId, isLoading, isAuthenticated, saveStatus,
  } = useEditorData();

  const [selected, setSelected] = useState("hero");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"design" | "layers" | "blocks">("design");

  // Undo/Redo history (local only)
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
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSections(history[newIndex]);
    }
  }, [historyIndex, history, setSections]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSections(history[newIndex]);
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
      />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar sections={sections} selected={selected} setSelected={setSelected} siteId={siteId} />
        <EditorCanvas
          device={device}
          sections={sections}
          selected={selected}
          setSelected={setSelected}
          onSectionsReorder={handleSectionsReorder}
          onSectionContentChange={handleContentChange}
        />
        <EditorProperties sections={sections} selected={selected} setSelected={setSelected} />
      </div>
      <div className="flex items-center gap-4 px-3 h-6 border-t border-border bg-secondary/50 text-[10px] text-muted-foreground shrink-0">
        <span className={`${statusColor} font-medium`}>{statusLabel}</span>
        <span>Zoom: 100%</span>
        <span>{device === "desktop" ? "1280" : device === "tablet" ? "768" : "375"} × auto</span>
        {!isAuthenticated && <span className="text-warning">Войдите для сохранения в облако</span>}
        <span className="ml-auto">v2.4.1</span>
      </div>
    </div>
  );
};

export default EditorPage;
