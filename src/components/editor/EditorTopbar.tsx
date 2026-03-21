import { Link } from "react-router-dom";
import {
  Undo2, Redo2, Monitor, Tablet, Smartphone, Eye, EyeOff, Save,
  Settings2, Layers, Blocks, LogOut, History, Download
} from "lucide-react";

interface EditorTopbarProps {
  device: "desktop" | "tablet" | "mobile";
  setDevice: (d: "desktop" | "tablet" | "mobile") => void;
  activeTab: "design" | "layers" | "blocks";
  setActiveTab: (t: "design" | "layers" | "blocks") => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  previewMode: boolean;
  onTogglePreview: () => void;
  onPublish?: () => void;
  onSaveDraft?: () => void;
  saveStatus?: "saved" | "saving" | "unsaved";
  onSignOut?: () => void;
  onOpenHistory?: () => void;
  onExportHtml?: () => void;
}

const EditorTopbar = ({
  device, setDevice, activeTab, setActiveTab,
  onUndo, onRedo, canUndo, canRedo,
  previewMode, onTogglePreview,
  onPublish, onSaveDraft, saveStatus = "saved",
  onSignOut, onOpenHistory, onExportHtml,
}: EditorTopbarProps) => (
  <div className="flex items-center gap-1.5 px-3 h-11 border-b border-border bg-secondary/50 shrink-0">
    <Link to="/dashboard" className="flex items-center gap-1.5 mr-2">
      <div className="flex h-6 w-6 items-center justify-center rounded bg-brand text-[10px] font-bold text-brand-light">V</div>
      <span className="text-[13px] font-medium text-foreground hidden sm:inline">Visually</span>
    </Link>
    <span className="rounded bg-brand px-1.5 py-0.5 text-[9px] font-bold text-brand-light">PRO</span>
    <div className="w-px h-4 bg-border mx-1" />

    {!previewMode && (
      <>
        {(["design", "layers", "blocks"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[12px] transition-colors ${activeTab === tab ? "bg-background border border-border text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "design" && <Settings2 className="h-3.5 w-3.5" />}
            {tab === "layers" && <Layers className="h-3.5 w-3.5" />}
            {tab === "blocks" && <Blocks className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{tab === "design" ? "Дизайн" : tab === "layers" ? "Слои" : "Блоки"}</span>
          </button>
        ))}
        <div className="w-px h-4 bg-border mx-1" />
        <button onClick={onUndo} disabled={!canUndo} className={`p-1.5 rounded transition-colors ${canUndo ? "text-muted-foreground hover:text-foreground hover:bg-secondary" : "text-muted-foreground/30 cursor-not-allowed"}`}>
          <Undo2 className="h-3.5 w-3.5" />
        </button>
        <button onClick={onRedo} disabled={!canRedo} className={`p-1.5 rounded transition-colors ${canRedo ? "text-muted-foreground hover:text-foreground hover:bg-secondary" : "text-muted-foreground/30 cursor-not-allowed"}`}>
          <Redo2 className="h-3.5 w-3.5" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button onClick={onOpenHistory} className="flex items-center gap-1 px-2 py-1 rounded text-[12px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="История версий">
          <History className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">История</span>
        </button>
      </>
    )}

    <div className="flex-1" />

    <div className="hidden sm:flex items-center gap-0.5 mr-2">
      {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as const).map(([d, Icon]) => (
        <button key={d} onClick={() => setDevice(d)} className={`p-1.5 rounded transition-colors ${device === d ? "bg-brand text-brand-light" : "text-muted-foreground hover:bg-secondary"}`}>
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>

    <button
      onClick={onTogglePreview}
      className={`flex items-center gap-1 px-2 py-1 rounded text-[12px] transition-colors ${previewMode ? "bg-brand text-brand-light" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
    >
      {previewMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{previewMode ? "Редактор" : "Просмотр"}</span>
    </button>

    {!previewMode && (
      <>
        <button
          onClick={onSaveDraft}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Save className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">
            {saveStatus === "saving" ? "Сохраняю…" : saveStatus === "unsaved" ? "Сохранить" : "Черновик"}
          </span>
        </button>
        <button
          onClick={onExportHtml}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] text-muted-foreground hover:bg-secondary transition-colors"
          title="Экспорт HTML"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">HTML</span>
        </button>
        <button
          onClick={onPublish}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-success text-white text-[12px] font-medium hover:bg-success/90 transition-colors active:scale-[0.97]"
        >
          Опубликовать
        </button>
      </>
    )}

    {onSignOut && (
      <button onClick={onSignOut} className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-1" title="Выйти">
        <LogOut className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);

export default EditorTopbar;
