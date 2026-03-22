import type { Section, SectionType, SectionContent } from "@/components/editor/types";
import { sectionTemplates } from "@/components/editor/types";

export interface PageTemplate {
  title: string;
  slug: string;
  sections: { type: SectionType; label: string; content: SectionContent }[];
}

export interface SiteTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  pages: PageTemplate[];
}

const s = (type: SectionType): { type: SectionType; label: string; content: SectionContent } => ({
  type,
  label: sectionTemplates[type].label,
  content: { ...sectionTemplates[type].content },
});

export const siteTemplates: SiteTemplate[] = [
  {
    id: "blank",
    name: "Пустой сайт",
    description: "Начните с чистого листа",
    icon: "📄",
    pages: [
      { title: "Главная", slug: "index", sections: [s("hero"), s("text")] },
    ],
  },
  {
    id: "landing",
    name: "Лендинг",
    description: "Одностраничный сайт с CTA, отзывами и тарифами",
    icon: "🚀",
    pages: [
      {
        title: "Главная", slug: "index",
        sections: [
          s("navbar"),
          { type: "hero", label: "Герой", content: { title: "Запустите свой продукт за минуты", description: "Визуальный конструктор для команд, которые ценят скорость и качество.", buttonText: "Попробовать бесплатно →" } },
          s("logos"),
          { type: "cards", label: "Преимущества", content: { cards: [
            { bg: "bg-blue-50", label: "Быстрый старт", description: "Создайте сайт за 5 минут без кода" },
            { bg: "bg-green-50", label: "Адаптивность", description: "Идеально на любом устройстве" },
            { bg: "bg-purple-50", label: "SEO-оптимизация", description: "Встроенные инструменты продвижения" },
          ] } },
          s("stats"),
          s("testimonials"),
          s("pricing"),
          { type: "cta", label: "CTA", content: { title: "Готовы начать?", description: "14 дней бесплатно, без привязки карты", buttonText: "Создать сайт →", bgColor: "bg-primary" } },
          s("footer"),
        ],
      },
    ],
  },
  {
    id: "portfolio",
    name: "Портфолио",
    description: "Многостраничное портфолио с проектами и контактами",
    icon: "🎨",
    pages: [
      {
        title: "Главная", slug: "index",
        sections: [
          s("navbar"),
          { type: "hero", label: "Герой", content: { title: "Привет, я дизайнер", description: "Создаю цифровые продукты, которые любят пользователи", buttonText: "Смотреть работы ↓" } },
          s("stats"),
          s("gallery"),
          s("footer"),
        ],
      },
      {
        title: "Обо мне", slug: "about",
        sections: [
          s("navbar"),
          { type: "text", label: "Обо мне", content: { title: "Обо мне", body: "Я занимаюсь дизайном и разработкой более 8 лет. Работал с крупными брендами и стартапами." } },
          s("timeline"),
          s("footer"),
        ],
      },
      {
        title: "Контакты", slug: "contact",
        sections: [
          s("navbar"),
          { type: "text", label: "Контакты", content: { title: "Давайте работать вместе", body: "Заполните форму или напишите мне на hello@example.com" } },
          s("form"),
          s("footer"),
        ],
      },
    ],
  },
  {
    id: "business",
    name: "Бизнес-сайт",
    description: "Корпоративный сайт с услугами, командой и FAQ",
    icon: "🏢",
    pages: [
      {
        title: "Главная", slug: "index",
        sections: [
          s("navbar"),
          { type: "hero", label: "Герой", content: { title: "Надёжные решения для вашего бизнеса", description: "Комплексные услуги от стратегии до реализации", buttonText: "Узнать больше →" } },
          s("cards"),
          s("stats"),
          s("testimonials"),
          { type: "cta", label: "CTA", content: { title: "Начните трансформацию", description: "Бесплатная консультация за 15 минут", buttonText: "Записаться →", bgColor: "bg-primary" } },
          s("footer"),
        ],
      },
      {
        title: "Услуги", slug: "services",
        sections: [
          s("navbar"),
          { type: "text", label: "Заголовок", content: { title: "Наши услуги", body: "Мы предлагаем полный спектр услуг для развития вашего бизнеса" } },
          { type: "cards", label: "Услуги", content: { cards: [
            { bg: "bg-blue-50", label: "Консалтинг", description: "Анализ бизнес-процессов и стратегия развития" },
            { bg: "bg-green-50", label: "Разработка", description: "Создание цифровых продуктов под ключ" },
            { bg: "bg-amber-50", label: "Поддержка", description: "Техническая поддержка и сопровождение" },
          ] } },
          s("pricing"),
          s("footer"),
        ],
      },
      {
        title: "Команда", slug: "team",
        sections: [
          s("navbar"),
          s("team"),
          s("footer"),
        ],
      },
      {
        title: "FAQ", slug: "faq",
        sections: [
          s("navbar"),
          s("faq"),
          s("footer"),
        ],
      },
      {
        title: "Контакты", slug: "contact",
        sections: [
          s("navbar"),
          { type: "columns", label: "Контакты", content: { count: 2, columns: [
            { title: "Офис", body: "г. Москва, ул. Примерная, 42\nПн-Пт: 9:00 — 18:00" },
            { title: "Связь", body: "info@company.com\n+7 (999) 123-45-67" },
          ] } },
          s("form"),
          s("footer"),
        ],
      },
    ],
  },
  {
    id: "blog",
    name: "Блог / Медиа",
    description: "Сайт с блогом, подписками и контентом",
    icon: "📝",
    pages: [
      {
        title: "Главная", slug: "index",
        sections: [
          s("navbar"),
          { type: "hero", label: "Герой", content: { title: "Блог о технологиях и дизайне", description: "Свежие статьи, гайды и инсайты каждую неделю", buttonText: "Читать →" } },
          s("cards"),
          s("banner"),
          s("footer"),
        ],
      },
      {
        title: "О блоге", slug: "about",
        sections: [
          s("navbar"),
          { type: "text", label: "О нас", content: { title: "О блоге", body: "Мы пишем о технологиях, дизайне и продуктах. Наша цель — делиться знаниями и вдохновлять создателей." } },
          s("team"),
          s("footer"),
        ],
      },
      {
        title: "Подписка", slug: "subscribe",
        sections: [
          s("navbar"),
          { type: "cta", label: "Подписка", content: { title: "Подпишитесь на рассылку", description: "Новые статьи каждую пятницу, без спама", buttonText: "Подписаться", bgColor: "bg-primary" } },
          s("faq"),
          s("footer"),
        ],
      },
    ],
  },
];
