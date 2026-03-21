import { useState, useRef, useEffect } from "react";
import { useTheme, ACCENT_PRESETS } from "@/contexts/ThemeContext";

interface ThemeSwitcherProps {
  variant?: "dropdown" | "sidebar" | "settings";
}

/* ── Dropdown variant (header icon button -> floating panel) ── */
const DropdownVariant = () => {
  const { mode, accent, setMode, setAccent, accentName } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="td-wrap" ref={wrapRef} style={{ position: "relative" }}>
      <button
        className="tb-ico"
        onClick={() => setOpen(!open)}
        title="Тема"
        style={{
          width: 30, height: 30, borderRadius: 6, background: "none",
          border: "none", cursor: "pointer", color: "var(--text2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, transition: "all 0.15s",
        }}
      >
        {mode === "dark" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        )}
      </button>
      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            width: 210, background: "var(--bg3)",
            border: "1px solid var(--border2)", borderRadius: 10,
            padding: 14, zIndex: 300,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            animation: "fadeIn 0.18s ease",
          }}
        >
          {/* Mode row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text2)" }}>Режим</span>
            <div style={{ display: "flex", background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 6, overflow: "hidden" }}>
              <button
                onClick={() => setMode("dark")}
                style={{
                  padding: "4px 9px", fontSize: 11, fontWeight: 500, cursor: "pointer",
                  border: "none", background: mode === "dark" ? "var(--bg4)" : "none",
                  color: mode === "dark" ? "var(--text)" : "var(--text3)",
                  fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                }}
              >
                Тёмная
              </button>
              <button
                onClick={() => setMode("light")}
                style={{
                  padding: "4px 9px", fontSize: 11, fontWeight: 500, cursor: "pointer",
                  border: "none", background: mode === "light" ? "var(--bg4)" : "none",
                  color: mode === "light" ? "var(--text)" : "var(--text3)",
                  fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                }}
              >
                Светлая
              </button>
            </div>
          </div>
          {/* Separator */}
          <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />
          {/* Accent label */}
          <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 7 }}>Акцентный цвет</div>
          {/* Dots */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {ACCENT_PRESETS.map((p) => {
              const isActive = p.hex.toLowerCase() === accent.toLowerCase();
              return (
                <div
                  key={p.hex}
                  onClick={() => setAccent(p.hex)}
                  title={p.name}
                  style={{
                    width: 22, height: 22, borderRadius: "50%", cursor: "pointer",
                    border: `2px solid ${isActive ? "#fff" : "transparent"}`,
                    background: p.hex, transition: "all 0.18s",
                    position: "relative", flexShrink: 0,
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {isActive && (
                    <span style={{ fontSize: 9, color: "#fff", fontWeight: 700, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Name */}
          <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 7 }}>
            Выбрано: <span style={{ color: "var(--text2)" }}>{accentName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Sidebar variant (compact dots + mode button) ── */
const SidebarVariant = () => {
  const { mode, accent, toggleMode, setAccent, accentName } = useTheme();

  return (
    <div style={{ padding: "12px 14px 8px", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: "var(--text3)",
        textTransform: "uppercase", letterSpacing: 1, marginBottom: 8,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        Тема
        <button
          onClick={toggleMode}
          style={{
            fontSize: 11, color: "var(--text2)", cursor: "pointer",
            background: "none", border: "none", fontFamily: "'Inter', sans-serif",
            padding: "2px 6px", borderRadius: 4, transition: "all 0.15s",
          }}
        >
          {mode === "dark" ? "Тёмная" : "Светлая"}
        </button>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 4 }}>
        {ACCENT_PRESETS.map((p) => {
          const isActive = p.hex.toLowerCase() === accent.toLowerCase();
          return (
            <div
              key={p.hex}
              onClick={() => setAccent(p.hex)}
              title={p.name}
              style={{
                width: 22, height: 22, borderRadius: "50%", cursor: "pointer",
                border: `2px solid ${isActive ? "rgba(255,255,255,0.7)" : "transparent"}`,
                background: p.hex, transition: "all 0.18s",
                position: "relative", flexShrink: 0,
              }}
            />
          );
        })}
      </div>
      <div style={{ fontSize: 9, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {accentName}
      </div>
    </div>
  );
};

/* ── Settings variant (large 36px circles) ── */
const SettingsVariant = () => {
  const { mode, accent, toggleMode, setAccent } = useTheme();

  return (
    <div className="settings-section" style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 9, overflow: "hidden" }}>
      <div style={{
        padding: "14px 18px", borderBottom: "1px solid var(--border)",
        fontSize: 10, fontWeight: 700, color: "var(--text3)",
        textTransform: "uppercase", letterSpacing: 1.5,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        Тема интерфейса
      </div>
      {/* Mode toggle */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 18px", borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
          {mode === "dark" ? "Тёмная тема" : "Светлая тема"}
        </span>
        <button
          onClick={toggleMode}
          style={{
            background: "var(--bg3)", border: "1px solid var(--border)",
            borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 500,
            color: "var(--text2)", cursor: "pointer", fontFamily: "'Inter', sans-serif",
            transition: "all 0.15s",
          }}
        >
          Переключить
        </button>
      </div>
      {/* Theme circles */}
      <div style={{ padding: "14px 18px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ACCENT_PRESETS.map((p) => {
            const isActive = p.hex.toLowerCase() === accent.toLowerCase();
            return (
              <div
                key={p.hex}
                onClick={() => setAccent(p.hex)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: `2px solid ${isActive ? "rgba(255,255,255,0.8)" : "transparent"}`,
                    background: p.hex, transition: "all 0.18s",
                    position: "relative",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {isActive && (
                    <span style={{ fontSize: 13, color: "#fff", fontWeight: 700, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                      ✓
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 10, color: isActive ? "var(--text2)" : "var(--text3)" }}>
                  {p.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ThemeSwitcher = ({ variant = "dropdown" }: ThemeSwitcherProps) => {
  switch (variant) {
    case "dropdown":
      return <DropdownVariant />;
    case "sidebar":
      return <SidebarVariant />;
    case "settings":
      return <SettingsVariant />;
    default:
      return <DropdownVariant />;
  }
};

export default ThemeSwitcher;
