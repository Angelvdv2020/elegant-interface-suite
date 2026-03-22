import type { SectionType, SectionContent } from "@/components/editor/types";
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

const c = (type: SectionType, label: string, content: Partial<SectionContent>): { type: SectionType; label: string; content: SectionContent } => ({
  type, label, content: { ...sectionTemplates[type].content, ...content } as SectionContent,
});

export const siteTemplates: SiteTemplate[] = [
  // ── 1. Пустой ──
  { id: "blank", name: "Пустой сайт", description: "Начните с чистого листа", icon: "📄",
    pages: [{ title: "Главная", slug: "index", sections: [s("hero"), s("text")] }] },

  // ── 2. Лендинг ──
  { id: "landing", name: "Лендинг", description: "Одностраничник с CTA, отзывами и тарифами", icon: "🚀",
    pages: [{ title: "Главная", slug: "index", sections: [
      s("navbar"),
      c("hero", "Герой", { title: "Запустите свой продукт за минуты", description: "Визуальный конструктор для команд, которые ценят скорость.", buttonText: "Попробовать бесплатно →" }),
      s("logos"), s("stats"), s("testimonials"), s("pricing"),
      c("cta", "CTA", { title: "Готовы начать?", description: "14 дней бесплатно", buttonText: "Создать сайт →" }),
      s("footer"),
    ]}] },

  // ── 3. Портфолио ──
  { id: "portfolio", name: "Портфолио", description: "Многостраничное портфолио с проектами", icon: "🎨",
    pages: [
      { title: "Главная", slug: "index", sections: [
        s("navbar"),
        c("hero", "Герой", { title: "Привет, я дизайнер", description: "Создаю продукты, которые любят пользователи", buttonText: "Смотреть работы ↓" }),
        s("stats"), s("gallery"), s("footer"),
      ]},
      { title: "Обо мне", slug: "about", sections: [s("navbar"), c("text", "Обо мне", { title: "Обо мне", body: "8+ лет в дизайне и разработке." }), s("timeline"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 4. Бизнес ──
  { id: "business", name: "Бизнес-сайт", description: "Корпоративный сайт с услугами и FAQ", icon: "🏢",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Надёжные решения для бизнеса", description: "Комплексные услуги от стратегии до реализации", buttonText: "Узнать больше →" }), s("cards"), s("stats"), s("testimonials"), s("cta"), s("footer")] },
      { title: "Услуги", slug: "services", sections: [s("navbar"), c("text", "Заголовок", { title: "Наши услуги", body: "Полный спектр услуг для развития" }), s("cards"), s("pricing"), s("footer")] },
      { title: "Команда", slug: "team", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "FAQ", slug: "faq", sections: [s("navbar"), s("faq"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 5. Блог ──
  { id: "blog", name: "Блог / Медиа", description: "Сайт с контентом и подпиской", icon: "📝",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Блог о технологиях", description: "Статьи, гайды и инсайты каждую неделю", buttonText: "Читать →" }), s("cards"), s("banner"), s("footer")] },
      { title: "О блоге", slug: "about", sections: [s("navbar"), c("text", "О нас", { title: "О блоге", body: "Делимся знаниями и вдохновляем создателей." }), s("team"), s("footer")] },
      { title: "Подписка", slug: "subscribe", sections: [s("navbar"), c("cta", "Подписка", { title: "Подпишитесь", description: "Без спама. Новые статьи каждую пятницу.", buttonText: "Подписаться" }), s("faq"), s("footer")] },
    ] },

  // ── 6. Интернет-магазин ──
  { id: "ecommerce", name: "Интернет-магазин", description: "Витрина с товарами, корзиной и доставкой", icon: "🛒",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Стильные вещи для вашего дома", description: "Бесплатная доставка от 5 000 ₽", buttonText: "Каталог →" }), s("cards"), s("banner"), s("testimonials"), s("footer")] },
      { title: "Каталог", slug: "catalog", sections: [s("navbar"), c("text", "Каталог", { title: "Каталог товаров", body: "Выберите категорию для просмотра" }), s("gallery"), s("footer")] },
      { title: "Доставка", slug: "delivery", sections: [s("navbar"), c("text", "Доставка", { title: "Доставка и оплата", body: "Мы доставляем по всей России. Оплата онлайн или при получении." }), s("faq"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 7. Ресторан ──
  { id: "restaurant", name: "Ресторан / Кафе", description: "Меню, бронирование, атмосфера", icon: "🍽️",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Добро пожаловать в Osteria", description: "Итальянская кухня в самом сердце города", buttonText: "Забронировать столик →" }), s("gallery"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Меню", slug: "menu", sections: [s("navbar"), c("text", "Меню", { title: "Наше меню", body: "Сезонные блюда из свежих местных ингредиентов" }), s("cards"), s("footer")] },
      { title: "Бронирование", slug: "booking", sections: [s("navbar"), c("text", "Бронь", { title: "Забронировать столик", body: "Заполните форму и мы подтвердим бронь" }), s("form"), s("footer")] },
    ] },

  // ── 8. Фитнес / Спорт ──
  { id: "fitness", name: "Фитнес-студия", description: "Расписание, тренеры, абонементы", icon: "💪",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Твоя лучшая форма начинается здесь", description: "Персональные тренировки и групповые занятия", buttonText: "Записаться →" }), s("cards"), s("stats"), s("pricing"), s("footer")] },
      { title: "Тренеры", slug: "trainers", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Расписание", slug: "schedule", sections: [s("navbar"), c("text", "Расписание", { title: "Расписание занятий", body: "Групповые занятия проходят с понедельника по субботу" }), s("cards"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 9. Медицина / Клиника ──
  { id: "medical", name: "Клиника", description: "Врачи, услуги, запись на приём", icon: "🏥",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Забота о вашем здоровье", description: "Современная клиника с опытными специалистами", buttonText: "Записаться на приём →" }), s("cards"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Врачи", slug: "doctors", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Услуги", slug: "services", sections: [s("navbar"), c("text", "Услуги", { title: "Наши услуги", body: "Диагностика, лечение, профилактика" }), s("pricing"), s("footer")] },
      { title: "Запись", slug: "appointment", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 10. Образование / Курсы ──
  { id: "education", name: "Онлайн-курсы", description: "Программа, тарифы, отзывы учеников", icon: "🎓",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Научитесь программировать за 3 месяца", description: "Практический курс с наставником и сертификатом", buttonText: "Начать обучение →" }), s("stats"), s("cards"), s("testimonials"), s("pricing"), s("footer")] },
      { title: "Программа", slug: "program", sections: [s("navbar"), c("text", "Программа", { title: "Программа курса", body: "12 модулей от основ до продвинутых тем" }), s("timeline"), s("footer")] },
      { title: "FAQ", slug: "faq", sections: [s("navbar"), s("faq"), s("footer")] },
    ] },

  // ── 11. Мероприятие / Конференция ──
  { id: "event", name: "Мероприятие", description: "Конференция, хакатон, митап", icon: "🎤",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "TechConf 2026", description: "3 дня докладов, воркшопов и нетворкинга", buttonText: "Купить билет →" }), s("stats"), s("cards"), s("logos"), s("footer")] },
      { title: "Спикеры", slug: "speakers", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Расписание", slug: "schedule", sections: [s("navbar"), s("timeline"), s("footer")] },
      { title: "Билеты", slug: "tickets", sections: [s("navbar"), s("pricing"), s("footer")] },
    ] },

  // ── 12. Недвижимость ──
  { id: "realestate", name: "Недвижимость", description: "Каталог объектов, агенты, контакты", icon: "🏠",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Найдите дом своей мечты", description: "Более 500 объектов в базе. Подберём идеальный вариант.", buttonText: "Смотреть объекты →" }), s("stats"), s("cards"), s("testimonials"), s("footer")] },
      { title: "Объекты", slug: "properties", sections: [s("navbar"), s("gallery"), s("footer")] },
      { title: "Агенты", slug: "agents", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 13. Юридическая фирма ──
  { id: "law", name: "Юридическая фирма", description: "Практики, команда, консультация", icon: "⚖️",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Защитим ваши права", description: "Профессиональная юридическая помощь с 2005 года", buttonText: "Консультация →" }), s("cards"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Практики", slug: "practice", sections: [s("navbar"), c("text", "Практики", { title: "Области практики", body: "Корпоративное право, налоги, споры, IP" }), s("cards"), s("footer")] },
      { title: "Команда", slug: "team", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 14. Креативное агентство ──
  { id: "agency", name: "Креативное агентство", description: "Портфолио, услуги, процесс работы", icon: "✨",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Мы создаём бренды", description: "Дизайн, маркетинг и разработка для амбициозных компаний", buttonText: "Обсудить проект →" }), s("logos"), s("gallery"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Услуги", slug: "services", sections: [s("navbar"), s("cards"), s("pricing"), s("footer")] },
      { title: "Кейсы", slug: "cases", sections: [s("navbar"), s("gallery"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 15. Стартап / SaaS ──
  { id: "saas", name: "SaaS-продукт", description: "Фичи, интеграции, тарифы, документация", icon: "⚡",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Автоматизируйте рутину", description: "Платформа для управления проектами и коммуникации в команде", buttonText: "Попробовать бесплатно →" }), s("logos"), s("cards"), s("stats"), s("testimonials"), s("pricing"), s("cta"), s("footer")] },
      { title: "Функции", slug: "features", sections: [s("navbar"), c("text", "Функции", { title: "Возможности платформы", body: "Всё что нужно для эффективной работы" }), s("cards"), s("footer")] },
      { title: "Интеграции", slug: "integrations", sections: [s("navbar"), s("logos"), s("cards"), s("footer")] },
      { title: "Тарифы", slug: "pricing", sections: [s("navbar"), s("pricing"), s("faq"), s("footer")] },
    ] },

  // ── 16. Свадьба ──
  { id: "wedding", name: "Свадебный сайт", description: "Приглашение, RSVP, программа", icon: "💍",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Анна & Михаил", description: "15 августа 2026 — приглашаем вас разделить наш день", buttonText: "Подтвердить присутствие →" }), s("timeline"), s("gallery"), s("footer")] },
      { title: "RSVP", slug: "rsvp", sections: [s("navbar"), c("text", "RSVP", { title: "Подтвердите присутствие", body: "Пожалуйста, заполните форму до 1 июля" }), s("form"), s("footer")] },
      { title: "Детали", slug: "details", sections: [s("navbar"), c("text", "Детали", { title: "Место и время", body: "Ресторан «Chateau», Санкт-Петербург\nВенчание: 14:00 | Банкет: 16:00" }), s("faq"), s("footer")] },
    ] },

  // ── 17. Резюме / CV ──
  { id: "resume", name: "Резюме / CV", description: "Онлайн-визитка с опытом и навыками", icon: "📋",
    pages: [
      { title: "Главная", slug: "index", sections: [
        s("navbar"),
        c("hero", "Герой", { title: "Иван Петров", description: "Senior Frontend Developer · 7 лет опыта", buttonText: "Связаться →" }),
        s("stats"), s("timeline"), s("cards"),
        c("text", "Навыки", { title: "Технический стек", body: "React, TypeScript, Node.js, PostgreSQL, AWS, Docker" }),
        s("footer"),
      ]}
    ] },

  // ── 18. Фотограф ──
  { id: "photographer", name: "Фотограф", description: "Галерея работ, услуги, бронирование", icon: "📸",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Ваша история в кадре", description: "Свадебная, портретная и предметная фотография", buttonText: "Посмотреть работы →" }), s("gallery"), s("testimonials"), s("footer")] },
      { title: "Услуги", slug: "services", sections: [s("navbar"), s("pricing"), s("faq"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 19. Музыкант / Группа ──
  { id: "musician", name: "Музыкант", description: "Треки, видео, расписание концертов", icon: "🎵",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "NOVA BAND", description: "Инди-рок из Москвы. Новый альбом уже доступен.", buttonText: "Слушать →" }), s("video"), s("gallery"), s("footer")] },
      { title: "Концерты", slug: "gigs", sections: [s("navbar"), s("timeline"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 20. Подкаст ──
  { id: "podcast", name: "Подкаст", description: "Эпизоды, ведущие, подписка", icon: "🎙️",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Без Фильтров", description: "Честные разговоры о технологиях, бизнесе и жизни. Каждую среду.", buttonText: "Слушать последний эпизод →" }), s("cards"), s("stats"), s("footer")] },
      { title: "Ведущие", slug: "hosts", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Подписка", slug: "subscribe", sections: [s("navbar"), s("cta"), s("footer")] },
    ] },

  // ── 21. Коворкинг ──
  { id: "coworking", name: "Коворкинг", description: "Пространства, тарифы, бронирование", icon: "🏢",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Пространство для идей", description: "Коворкинг в центре города. Гибкие тарифы от 500 ₽/день.", buttonText: "Забронировать →" }), s("gallery"), s("cards"), s("stats"), s("pricing"), s("footer")] },
      { title: "Тарифы", slug: "pricing", sections: [s("navbar"), s("pricing"), s("faq"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 22. Некоммерческая организация ──
  { id: "nonprofit", name: "НКО / Фонд", description: "Миссия, проекты, донаты", icon: "🤝",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Помогаем тем, кто нуждается", description: "Благотворительный фонд «Надежда». Помощь детям-сиротам с 2010 года.", buttonText: "Поддержать →" }), s("stats"), s("cards"), s("testimonials"), s("footer")] },
      { title: "Проекты", slug: "projects", sections: [s("navbar"), s("cards"), s("footer")] },
      { title: "О нас", slug: "about", sections: [s("navbar"), c("text", "О нас", { title: "Наша миссия", body: "Мы верим, что каждый ребёнок заслуживает шанс на счастливое будущее." }), s("team"), s("timeline"), s("footer")] },
    ] },

  // ── 23. Туризм / Путешествия ──
  { id: "travel", name: "Тур-агентство", description: "Направления, туры, бронирование", icon: "✈️",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Откройте мир с нами", description: "Индивидуальные туры и групповые поездки от 30 000 ₽", buttonText: "Выбрать тур →" }), s("cards"), s("gallery"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Направления", slug: "destinations", sections: [s("navbar"), s("gallery"), s("cards"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 24. Салон красоты ──
  { id: "beauty", name: "Салон красоты", description: "Услуги, мастера, запись онлайн", icon: "💅",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Красота начинается здесь", description: "Стрижки, окрашивание, маникюр, уходовые процедуры", buttonText: "Записаться →" }), s("gallery"), s("pricing"), s("testimonials"), s("footer")] },
      { title: "Мастера", slug: "masters", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Запись", slug: "booking", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 25. Автосервис ──
  { id: "autoservice", name: "Автосервис", description: "Услуги, цены, запись на ТО", icon: "🚗",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Ваш автомобиль в надёжных руках", description: "Ремонт, ТО, диагностика. Гарантия на все работы.", buttonText: "Записаться →" }), s("cards"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Услуги и цены", slug: "services", sections: [s("navbar"), s("pricing"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 26. Архитектурное бюро ──
  { id: "architecture", name: "Архитектурное бюро", description: "Проекты, подход, команда", icon: "🏗️",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Пространство, которое вдохновляет", description: "Проектируем жилые и коммерческие объекты с 2012 года", buttonText: "Смотреть проекты →" }), s("gallery"), s("stats"), s("footer")] },
      { title: "Проекты", slug: "projects", sections: [s("navbar"), s("gallery"), s("footer")] },
      { title: "О нас", slug: "about", sections: [s("navbar"), c("text", "О бюро", { title: "Наш подход", body: "Каждый проект — диалог между функцией, эстетикой и средой." }), s("team"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 27. IT-стартап ──
  { id: "startup", name: "IT-стартап", description: "MVP-лендинг для технологического продукта", icon: "🦄",
    pages: [
      { title: "Главная", slug: "index", sections: [
        s("navbar"),
        c("hero", "Герой", { title: "AI, который понимает ваш бизнес", description: "Умные решения для автоматизации процессов. Экономьте 40+ часов в месяц.", buttonText: "Запросить демо →" }),
        s("logos"), s("cards"), s("video"), s("stats"), s("testimonials"), s("pricing"), s("faq"), s("cta"), s("footer"),
      ]} ],
  },

  // ── 28. Доставка еды ──
  { id: "delivery", name: "Доставка еды", description: "Меню, зоны доставки, заказ", icon: "🍕",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Вкусно и быстро до двери", description: "Доставка за 30 минут или пицца бесплатно", buttonText: "Заказать →" }), s("cards"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Меню", slug: "menu", sections: [s("navbar"), s("cards"), s("footer")] },
      { title: "Доставка", slug: "delivery", sections: [s("navbar"), c("text", "Доставка", { title: "Зоны и условия", body: "Доставляем по городу бесплатно от 1 000 ₽" }), s("faq"), s("footer")] },
    ] },

  // ── 29. Персональный тренер ──
  { id: "coach", name: "Персональный коуч", description: "Программы, отзывы, запись", icon: "🧠",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Раскройте свой потенциал", description: "Бизнес-коучинг и личностное развитие. 1000+ клиентов.", buttonText: "Записаться на сессию →" }), s("stats"), s("testimonials"), s("pricing"), s("footer")] },
      { title: "Обо мне", slug: "about", sections: [s("navbar"), c("text", "Обо мне", { title: "Мой путь", body: "15 лет в бизнесе, сертифицированный ICF коуч" }), s("timeline"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },

  // ── 30. Ветеринарная клиника ──
  { id: "vet", name: "Ветеринарная клиника", description: "Врачи, услуги, запись", icon: "🐾",
    pages: [
      { title: "Главная", slug: "index", sections: [s("navbar"), c("hero", "Герой", { title: "Здоровье вашего питомца — наш приоритет", description: "Современная ветклиника. Приём 24/7.", buttonText: "Записать на приём →" }), s("cards"), s("stats"), s("testimonials"), s("footer")] },
      { title: "Врачи", slug: "doctors", sections: [s("navbar"), s("team"), s("footer")] },
      { title: "Услуги", slug: "services", sections: [s("navbar"), s("pricing"), s("footer")] },
      { title: "Контакты", slug: "contact", sections: [s("navbar"), s("form"), s("footer")] },
    ] },
];
