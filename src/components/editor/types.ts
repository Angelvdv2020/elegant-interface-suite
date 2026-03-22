export type SectionType =
  | "hero" | "cards" | "text" | "gallery" | "form" | "separator" | "cta"
  | "navbar" | "footer" | "pricing" | "testimonials" | "faq" | "video"
  | "stats" | "team" | "columns" | "html" | "logos" | "timeline" | "banner";

export type AnimationType =
  | "none" | "fade-in" | "fade-up" | "fade-down" | "fade-left" | "fade-right"
  | "zoom-in" | "zoom-out" | "flip" | "bounce" | "slide-up" | "rotate-in";

export type Breakpoint = "desktop" | "tablet" | "mobile";

export interface ResponsivePadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ResponsiveSettings {
  padding: ResponsivePadding;
  visible: boolean;
}

export const defaultResponsiveSettings: Record<Breakpoint, ResponsiveSettings> = {
  desktop: { padding: { top: 28, right: 32, bottom: 28, left: 32 }, visible: true },
  tablet: { padding: { top: 20, right: 24, bottom: 20, left: 24 }, visible: true },
  mobile: { padding: { top: 16, right: 16, bottom: 16, left: 16 }, visible: true },
};

export interface Section {
  id: string;
  type: SectionType;
  label: string;
  content: SectionContent;
  responsive?: Record<Breakpoint, ResponsiveSettings>;
  animation?: AnimationType;
}

// ─── Content interfaces ───

export interface HeroContent {
  title: string;
  description: string;
  buttonText: string;
}

export interface CardItem {
  bg: string;
  label: string;
  description: string;
}

export interface CardsContent {
  cards: CardItem[];
}

export interface TextContent {
  title: string;
  body: string;
}

export interface GalleryContent {
  images: { url: string; alt: string }[];
  columns: number;
}

export interface FormContent {
  title: string;
  fields: { label: string; type: string; placeholder: string; required: boolean }[];
  buttonText: string;
}

export interface SeparatorContent {
  height: number;
  style: "line" | "space" | "dots";
}

export interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  bgColor: string;
}

export interface NavbarContent {
  logo: string;
  links: { label: string; url: string }[];
  buttonText: string;
}

export interface FooterContent {
  logo: string;
  columns: { title: string; links: { label: string; url: string }[] }[];
  copyright: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlighted: boolean;
}

export interface PricingContent {
  title: string;
  description: string;
  plans: PricingPlan[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  items: FAQItem[];
}

export interface VideoContent {
  url: string;
  title: string;
  description: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  provider?: "youtube" | "vimeo" | "direct";
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsContent {
  items: StatItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface TeamContent {
  title: string;
  members: TeamMember[];
}

export interface ColumnItem {
  title: string;
  body: string;
}

export interface ColumnsContent {
  columns: ColumnItem[];
  count: number;
}

export interface HTMLContent {
  code: string;
}

export interface LogoItem {
  url: string;
  alt: string;
}

export interface LogosContent {
  title: string;
  logos: LogoItem[];
}

export interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

export interface TimelineContent {
  title: string;
  items: TimelineItem[];
}

export interface BannerContent {
  text: string;
  buttonText: string;
  bgColor: string;
}

export type SectionContent =
  | HeroContent
  | CardsContent
  | TextContent
  | GalleryContent
  | FormContent
  | SeparatorContent
  | CTAContent
  | NavbarContent
  | FooterContent
  | PricingContent
  | TestimonialsContent
  | FAQContent
  | VideoContent
  | StatsContent
  | TeamContent
  | ColumnsContent
  | HTMLContent
  | LogosContent
  | TimelineContent
  | BannerContent;

// ─── Section templates ───

export const sectionTemplates: Record<SectionType, { label: string; icon: string; content: SectionContent }> = {
  navbar: {
    label: "Навигация",
    icon: "menu",
    content: {
      logo: "SiteName",
      links: [
        { label: "Главная", url: "#" },
        { label: "О нас", url: "#about" },
        { label: "Контакты", url: "#contact" },
      ],
      buttonText: "Войти",
    } as NavbarContent,
  },
  hero: {
    label: "Герой",
    icon: "image",
    content: { title: "Заголовок", description: "Описание секции", buttonText: "Действие →" } as HeroContent,
  },
  cards: {
    label: "Карточки",
    icon: "layout-grid",
    content: {
      cards: [
        { bg: "bg-blue-50", label: "Пункт 1", description: "Описание функции" },
        { bg: "bg-green-50", label: "Пункт 2", description: "Описание функции" },
        { bg: "bg-purple-50", label: "Пункт 3", description: "Описание функции" },
      ],
    } as CardsContent,
  },
  text: {
    label: "Текст",
    icon: "align-left",
    content: { title: "Заголовок", body: "Текст контента" } as TextContent,
  },
  columns: {
    label: "Колонки",
    icon: "columns",
    content: {
      count: 2,
      columns: [
        { title: "Колонка 1", body: "Содержание первой колонки" },
        { title: "Колонка 2", body: "Содержание второй колонки" },
      ],
    } as ColumnsContent,
  },
  gallery: {
    label: "Галерея",
    icon: "images",
    content: { images: [], columns: 3 } as GalleryContent,
  },
  video: {
    label: "Видео",
    icon: "play",
    content: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Видео-презентация",
      description: "Посмотрите наше видео",
    } as VideoContent,
  },
  stats: {
    label: "Статистика",
    icon: "bar-chart",
    content: {
      items: [
        { value: "1,247", label: "Клиентов" },
        { value: "98.5%", label: "Удовлетворённость" },
        { value: "24/7", label: "Поддержка" },
        { value: "15+", label: "Лет опыта" },
      ],
    } as StatsContent,
  },
  pricing: {
    label: "Тарифы",
    icon: "credit-card",
    content: {
      title: "Тарифные планы",
      description: "Выберите подходящий план",
      plans: [
        { name: "Starter", price: "$9", period: "/мес", features: ["3 страницы", "Базовые блоки", "Email поддержка"], buttonText: "Выбрать", highlighted: false },
        { name: "Pro", price: "$29", period: "/мес", features: ["Безлимит страниц", "Все блоки", "Приоритетная поддержка", "История версий"], buttonText: "Выбрать", highlighted: true },
        { name: "Enterprise", price: "$99", period: "/мес", features: ["White-label", "SSO", "SLA 99.9%", "Кастомные блоки", "Выделенный менеджер"], buttonText: "Связаться", highlighted: false },
      ],
    } as PricingContent,
  },
  testimonials: {
    label: "Отзывы",
    icon: "message-circle",
    content: {
      title: "Что говорят клиенты",
      items: [
        { quote: "Отличный продукт, рекомендую всем!", author: "Мария Иванова", role: "Маркетолог" },
        { quote: "Сэкономили массу времени на разработке.", author: "Алексей Петров", role: "CTO" },
      ],
    } as TestimonialsContent,
  },
  team: {
    label: "Команда",
    icon: "users",
    content: {
      title: "Наша команда",
      members: [
        { name: "Анна Смирнова", role: "CEO", avatar: "" },
        { name: "Дмитрий Козлов", role: "CTO", avatar: "" },
        { name: "Елена Новикова", role: "Дизайнер", avatar: "" },
      ],
    } as TeamContent,
  },
  faq: {
    label: "FAQ",
    icon: "help-circle",
    content: {
      title: "Частые вопросы",
      items: [
        { question: "Как начать работу?", answer: "Зарегистрируйтесь и создайте свой первый сайт за пару минут." },
        { question: "Есть бесплатный период?", answer: "Да, 14 дней пробного периода без ограничений." },
        { question: "Можно ли экспортировать сайт?", answer: "Да, экспорт в статический HTML доступен на всех тарифах." },
      ],
    } as FAQContent,
  },
  logos: {
    label: "Логотипы",
    icon: "award",
    content: {
      title: "Нам доверяют",
      logos: [],
    } as LogosContent,
  },
  timeline: {
    label: "Таймлайн",
    icon: "clock",
    content: {
      title: "Наш путь",
      items: [
        { title: "Основание", description: "Запуск первой версии продукта", date: "2020" },
        { title: "Рост", description: "1000+ активных пользователей", date: "2022" },
        { title: "Сегодня", description: "Международное расширение", date: "2024" },
      ],
    } as TimelineContent,
  },
  banner: {
    label: "Баннер",
    icon: "flag",
    content: {
      text: "🎉 Специальное предложение — скидка 20% до конца месяца!",
      buttonText: "Подробнее →",
      bgColor: "bg-amber-50",
    } as BannerContent,
  },
  form: {
    label: "Форма",
    icon: "file-text",
    content: {
      title: "Свяжитесь с нами",
      fields: [
        { label: "Имя", type: "text", placeholder: "Ваше имя", required: true },
        { label: "Email", type: "email", placeholder: "email@example.com", required: true },
        { label: "Сообщение", type: "textarea", placeholder: "Ваше сообщение…", required: false },
      ],
      buttonText: "Отправить",
    } as FormContent,
  },
  separator: {
    label: "Разделитель",
    icon: "minus",
    content: { height: 40, style: "line" } as SeparatorContent,
  },
  cta: {
    label: "CTA-блок",
    icon: "megaphone",
    content: {
      title: "Готовы начать?",
      description: "Попробуйте бесплатно прямо сейчас",
      buttonText: "Попробовать →",
      bgColor: "bg-brand",
    } as CTAContent,
  },
  html: {
    label: "HTML-код",
    icon: "code",
    content: {
      code: '<div style="padding:20px;text-align:center;color:#6b7280;">Ваш HTML-код здесь</div>',
    } as HTMLContent,
  },
  footer: {
    label: "Подвал",
    icon: "panel-bottom",
    content: {
      logo: "SiteName",
      columns: [
        { title: "Продукт", links: [{ label: "Возможности", url: "#" }, { label: "Тарифы", url: "#" }] },
        { title: "Компания", links: [{ label: "О нас", url: "#" }, { label: "Контакты", url: "#" }] },
      ],
      copyright: "© 2024 SiteName. Все права защищены.",
    } as FooterContent,
  },
};
