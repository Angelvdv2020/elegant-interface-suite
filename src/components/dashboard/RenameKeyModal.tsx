import { useState } from "react";

interface RenameKeyModalProps {
  keyId: string;
  currentAlias: string;
  onClose: () => void;
  onSave: (keyId: string, newAlias: string) => void;
}

const RenameKeyModal = ({ keyId, currentAlias, onClose, onSave }: RenameKeyModalProps) => {
  const [alias, setAlias] = useState(currentAlias);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (alias.trim()) onSave(keyId, alias.trim());
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: 380, padding: 24,
          background: "var(--bg2)", border: "1px solid var(--border2)",
          borderRadius: 12,
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", right: 14, top: 14,
            width: 28, height: 28, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text2)", fontSize: 16,
          }}
        >
          ✕
        </button>

        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Переименовать</div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              fontSize: 10, color: "var(--text3)", textTransform: "uppercase",
              letterSpacing: 0.5, display: "block", marginBottom: 6, fontWeight: 600,
            }}>
              Название
            </label>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Например: Мой iPhone"
              maxLength={50}
              autoFocus
              style={{
                width: "100%", background: "var(--bg3)", border: "1px solid var(--border)",
                borderRadius: 7, padding: "9px 14px", fontSize: 13,
                color: "var(--text)", fontFamily: "'Inter', sans-serif", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1, padding: "9px 16px", borderRadius: 7,
                border: "1px solid var(--border)", background: "var(--bg3)",
                color: "var(--text2)", fontSize: 12, fontWeight: 500,
                cursor: "pointer", fontFamily: "'Inter', sans-serif",
              }}
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={!alias.trim()}
              style={{
                flex: 1, padding: "9px 16px", borderRadius: 7,
                border: "none", background: "var(--accent)",
                color: "#0d1117", fontSize: 12, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Inter', sans-serif",
                opacity: !alias.trim() ? 0.4 : 1,
              }}
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenameKeyModal;
