import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const ACCENT_PRESETS = [
  { hex: "#00ff88", name: "Emerald" },
  { hex: "#00cfff", name: "Cyan" },
  { hex: "#ff6b6b", name: "Coral" },
  { hex: "#ffaa00", name: "Amber" },
  { hex: "#b088ff", name: "Violet" },
  { hex: "#ff69b4", name: "Pink" },
];

interface ThemeContextType {
  mode: "dark" | "light";
  accent: string;
  accentName: string;
  setMode: (m: "dark" | "light") => void;
  setAccent: (hex: string) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"dark" | "light">(() =>
    (localStorage.getItem("theme-mode") as "dark" | "light") || "dark"
  );
  const [accent, setAccentState] = useState(() =>
    localStorage.getItem("theme-accent") || "#00ff88"
  );

  const accentName = ACCENT_PRESETS.find(p => p.hex.toLowerCase() === accent.toLowerCase())?.name || "Custom";

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("theme-accent", accent);
    document.documentElement.style.setProperty("--accent-c", accent);
  }, [accent]);

  const setAccent = (hex: string) => setAccentState(hex);
  const toggleMode = () => setMode(m => m === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ mode, accent, accentName, setMode, setAccent, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
