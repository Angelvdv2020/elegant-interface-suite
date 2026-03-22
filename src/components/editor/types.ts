export type SectionType = "hero" | "cards" | "text" | "gallery" | "form" | "separator" | "cta";
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
}

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

export type SectionContent =
  | HeroContent
  | CardsContent
  | TextContent
  | GalleryContent
  | FormContent
  | SeparatorContent
  | CTAContent;

// Section templates for adding new sections
export const sectionTemplates: Record<SectionType, { label: string; icon: string; content: SectionContent }> = {
  hero: {
    label: "Герой",
    icon: "image",
    content: { title: "Заголовок", description: "Описание секции", buttonText: "Действие →" },
  },
  cards: {
    label: "Карточки",
    icon: "layout-grid",
    content: {
      cards: [
        { bg: "bg-brand-light", label: "Пункт 1", description: "Описание" },
        { bg: "bg-success-light", label: "Пункт 2", description: "Описание" },
        { bg: "bg-purple-50", label: "Пункт 3", description: "Описание" },
      ],
    },
  },
  text: {
    label: "Текст",
    icon: "align-left",
    content: { title: "Заголовок", body: "Текст контента" },
  },
  gallery: {
    label: "Галерея",
    icon: "images",
    content: { images: [], columns: 3 },
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
    },
  },
  separator: {
    label: "Разделитель",
    icon: "minus",
    content: { height: 40, style: "line" },
  },
  cta: {
    label: "CTA-блок",
    icon: "megaphone",
    content: {
      title: "Готовы начать?",
      description: "Попробуйте бесплатно прямо сейчас",
      buttonText: "Попробовать →",
      bgColor: "bg-brand",
    },
  },
};
