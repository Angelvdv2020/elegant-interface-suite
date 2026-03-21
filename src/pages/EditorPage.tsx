import { useState, useCallback } from "react";
import EditorTopbar from "@/components/editor/EditorTopbar";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorProperties from "@/components/editor/EditorProperties";
import type { Section } from "@/components/editor/types";

const defaultSections: Section[] = [
  {
    id: "hero", type: "hero", label: "Герой",
    content: {
      title: "Ваш заголовок здесь",
      description: "Кликните по любому элементу страницы, чтобы его отредактировать. Перетащите блоки для изменения порядка.",
      buttonText: "Начать →",
    },
  },
  {
    id: "cards", type: "cards", label: "Карточки",
    content: {
      cards: [
        { bg: "bg-brand-light", label: "Функция 1", description: "Краткое описание преимущества продукта" },
        { bg: "bg-success-light", label: "Функция 2", description: "Краткое описание преимущества продукта" },
        { bg: "bg-purple-50", label: "Функция 3", description: "Краткое описание преимущества продукта" },
      ],
    },
  },
  {
    id: "text", type: "text", label: "Текстовый блок",
    content: {
      title: "О нашем продукте",
      body: "Здесь может быть любой текстовый контент. Кликните дважды чтобы начать редактирование. Поддерживается форматирование: жирный, курсив, ссылки.",
    },
  },
];

const EditorPage = () => {
  const [selected, setSelected] = useState("cards");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"design" | "layers" | "blocks">("design");
  const [sections, setSections] = useState<Section[]>(defaultSections);

  // Undo/Redo history
  const [history, setHistory] = useState<Section[][]>([defaultSections]);
  const [historyIndex, setHistoryIndex] = useState(0);

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
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSections(history[newIndex]);
    }
  }, [historyIndex, history]);

  const handleSectionsReorder = useCallback((newSections: Section[]) => {
    setSections(newSections);
    pushHistory(newSections);
  }, [pushHistory]);

  const handleContentChange = useCallback((sectionId: string, content: Section["content"]) => {
    setSections(prev => {
      const updated = prev.map(s => s.id === sectionId ? { ...s, content } : s);
      pushHistory(updated);
      return updated;
    });
  }, [pushHistory]);

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
        <EditorSidebar sections={sections} selected={selected} setSelected={setSelected} />
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
        <span className="text-success font-medium">● Сохранено</span>
        <span>Zoom: 100%</span>
        <span>{device === "desktop" ? "1280" : device === "tablet" ? "768" : "375"} × auto</span>
        <span className="ml-auto">v2.4.1</span>
      </div>
    </div>
  );
};

export default EditorPage;
