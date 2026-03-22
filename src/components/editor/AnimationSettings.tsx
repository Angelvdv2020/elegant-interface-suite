import type { AnimationType } from "./types";

interface AnimationSettingsProps {
  animation?: AnimationType;
  onChange: (animation: AnimationType) => void;
}

const animationOptions: { value: AnimationType; label: string; preview: string }[] = [
  { value: "none", label: "Без анимации", preview: "—" },
  { value: "fade-in", label: "Плавное появление", preview: "↓" },
  { value: "fade-up", label: "Снизу вверх", preview: "↑" },
  { value: "fade-down", label: "Сверху вниз", preview: "↓" },
  { value: "fade-left", label: "Слева", preview: "←" },
  { value: "fade-right", label: "Справа", preview: "→" },
  { value: "zoom-in", label: "Увеличение", preview: "⊕" },
  { value: "zoom-out", label: "Уменьшение", preview: "⊖" },
  { value: "flip", label: "Переворот", preview: "↻" },
  { value: "bounce", label: "Пружина", preview: "⤴" },
  { value: "slide-up", label: "Слайд вверх", preview: "⬆" },
  { value: "rotate-in", label: "Вращение", preview: "↺" },
];

const AnimationSettings = ({ animation = "none", onChange }: AnimationSettingsProps) => {
  return (
    <div className="px-3 py-3 border-b border-border">
      <div className="text-[10px] text-muted-foreground mb-2 font-medium">Анимация при прокрутке</div>
      <div className="grid grid-cols-2 gap-1">
        {animationOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] transition-colors ${
              animation === opt.value
                ? "bg-primary/10 text-primary border border-primary/20 font-medium"
                : "border border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            <span className="text-[11px]">{opt.preview}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimationSettings;
