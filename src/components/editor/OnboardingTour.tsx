import { useState, useEffect, useCallback } from "react";
import { X, ChevronRight, ChevronLeft, HelpCircle, Sparkles } from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector or area name
  position: "top" | "bottom" | "left" | "right" | "center";
  action?: string;
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Добро пожаловать в Visually! 👋",
    description: "Этот гид поможет вам освоить редактор за пару минут. Давайте начнём!",
    target: "center",
    position: "center",
  },
  {
    id: "topbar",
    title: "Панель инструментов",
    description: "Здесь вы найдёте переключение режимов (Дизайн, Слои, Блоки), отмену/повтор действий, историю версий и настройки сайта.",
    target: "topbar",
    position: "bottom",
  },
  {
    id: "sidebar",
    title: "Боковая панель",
    description: "Слева — список страниц, секции текущей страницы, кнопка добавления блоков и медиабиблиотека для загрузки изображений.",
    target: "sidebar",
    position: "right",
  },
  {
    id: "add-block",
    title: "Добавление блоков",
    description: "Нажмите «+ Добавить блок» чтобы выбрать из 20 типов секций: навигация, герой, карточки, тарифы, отзывы, FAQ, форма и др.",
    target: "sidebar",
    position: "right",
    action: "Попробуйте добавить блок «Герой»",
  },
  {
    id: "canvas",
    title: "Область редактирования",
    description: "Центральная часть — ваш сайт. Кликните на секцию для выбора, дважды кликните на текст для редактирования. Перетаскивайте блоки для изменения порядка.",
    target: "canvas",
    position: "left",
  },
  {
    id: "inline-edit",
    title: "Inline-редактирование",
    description: "Дважды кликните на любой текст прямо на холсте — заголовок, описание, кнопку — чтобы отредактировать его на месте.",
    target: "canvas",
    position: "left",
    action: "Попробуйте отредактировать заголовок",
  },
  {
    id: "properties",
    title: "Панель свойств",
    description: "Справа — свойства выбранной секции: адаптивные отступы для desktop/tablet/mobile и переключение видимости на разных устройствах.",
    target: "properties",
    position: "left",
  },
  {
    id: "device-switch",
    title: "Переключение устройств",
    description: "Используйте иконки 💻📱🖥️ в тулбаре для предпросмотра сайта на разных экранах. Каждое устройство имеет свои настройки отступов.",
    target: "topbar",
    position: "bottom",
  },
  {
    id: "pages",
    title: "Управление страницами",
    description: "Создавайте многостраничные сайты! Переключайтесь между страницами в сайдбаре и добавляйте новые кнопкой «+ Страница».",
    target: "sidebar",
    position: "right",
  },
  {
    id: "settings",
    title: "Глобальные настройки",
    description: "Нажмите «Настройки» в тулбаре для доступа к шрифтам (30 пресетов), цветовым палитрам, фигурам, SEO мета-тегам и эффектам.",
    target: "topbar",
    position: "bottom",
    action: "Откройте настройки и выберите палитру",
  },
  {
    id: "history",
    title: "История версий",
    description: "Кнопка «История» сохраняет снимки при каждой публикации. Вы можете просматривать и восстанавливать любую предыдущую версию.",
    target: "topbar",
    position: "bottom",
  },
  {
    id: "preview",
    title: "Предпросмотр и публикация",
    description: "Переключитесь в режим «Просмотр» чтобы увидеть сайт глазами посетителя. Нажмите «Опубликовать» чтобы сайт стал доступен по ссылке /site/ваш-slug.",
    target: "topbar",
    position: "bottom",
  },
  {
    id: "export",
    title: "Экспорт HTML",
    description: "Скачайте страницу как статический HTML-файл для размещения на любом хостинге — кнопка «HTML» в тулбаре.",
    target: "topbar",
    position: "bottom",
  },
  {
    id: "done",
    title: "Вы готовы! 🎉",
    description: "Теперь вы знаете все основные возможности редактора. Начните с добавления блоков и настройки контента. Удачи в создании сайта!",
    target: "center",
    position: "center",
  },
];

const STORAGE_KEY = "visually_tour_completed";

interface OnboardingTourProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

const OnboardingTour = ({ forceOpen, onClose }: OnboardingTourProps) => {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (forceOpen) {
      setActive(true);
      setStep(0);
      return;
    }
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      // Auto-start tour for first-time users after a brief delay
      const timer = setTimeout(() => setActive(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const close = useCallback(() => {
    setActive(false);
    localStorage.setItem(STORAGE_KEY, "true");
    onClose?.();
  }, [onClose]);

  const next = () => {
    if (step < tourSteps.length - 1) setStep(step + 1);
    else close();
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const currentStep = tourSteps[step];
  const isCenter = currentStep.position === "center";
  const progress = ((step + 1) / tourSteps.length) * 100;

  if (!active && showButton) {
    return (
      <button
        onClick={() => { setActive(true); setStep(0); }}
        className="fixed bottom-12 right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all text-xs font-medium active:scale-95"
        title="Обучающий гид"
      >
        <HelpCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Гид</span>
      </button>
    );
  }

  if (!active) return null;

  // Compute highlight area
  const getHighlightStyle = (): React.CSSProperties => {
    if (isCenter) return {};
    const areas: Record<string, React.CSSProperties> = {
      topbar: { position: "fixed", top: 0, left: 0, right: 0, height: 44, zIndex: 60 },
      sidebar: { position: "fixed", top: 44, left: 0, width: 260, bottom: 24, zIndex: 60 },
      canvas: { position: "fixed", top: 44, left: 260, right: 280, bottom: 24, zIndex: 60 },
      properties: { position: "fixed", top: 44, right: 0, width: 280, bottom: 24, zIndex: 60 },
    };
    return areas[currentStep.target] || {};
  };

  const getTooltipPosition = (): React.CSSProperties => {
    if (isCenter) {
      return { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 70 };
    }
    const positions: Record<string, Record<string, React.CSSProperties>> = {
      topbar: {
        bottom: { position: "fixed", top: 52, left: "50%", transform: "translateX(-50%)", zIndex: 70 },
      },
      sidebar: {
        right: { position: "fixed", top: 120, left: 268, zIndex: 70 },
      },
      canvas: {
        left: { position: "fixed", top: 120, right: 288, zIndex: 70 },
      },
      properties: {
        left: { position: "fixed", top: 120, right: 288, zIndex: 70 },
      },
    };
    return positions[currentStep.target]?.[currentStep.position] || { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 70 };
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/40 transition-opacity" onClick={close} />

      {/* Highlight outline */}
      {!isCenter && (
        <div
          style={{
            ...getHighlightStyle(),
            boxShadow: "0 0 0 4px hsl(var(--primary) / 0.4), 0 0 0 9999px rgba(0,0,0,0.35)",
            borderRadius: 8,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        style={getTooltipPosition()}
        className="w-[340px] max-w-[90vw] bg-background rounded-xl shadow-2xl border border-border p-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        {/* Progress bar */}
        <div className="w-full h-1 rounded-full bg-secondary mb-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">{currentStep.title}</h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{currentStep.description}</p>
            {currentStep.action && (
              <p className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
                💡 {currentStep.action}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground font-medium tabular-nums">
              {step + 1} / {tourSteps.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={close}
              className="px-2.5 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Пропустить
            </button>
            {step > 0 && (
              <button
                onClick={prev}
                className="flex items-center gap-0.5 px-2.5 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-3 w-3" />
                Назад
              </button>
            )}
            <button
              onClick={next}
              className="flex items-center gap-0.5 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-[11px] font-medium hover:bg-primary/90 transition-colors active:scale-95"
            >
              {step < tourSteps.length - 1 ? (
                <>Далее <ChevronRight className="h-3 w-3" /></>
              ) : (
                "Начать работу"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
