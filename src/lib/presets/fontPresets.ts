export interface FontPreset {
  id: string;
  name: string;
  heading: string;
  body: string;
  category: "sans" | "serif" | "mixed" | "display";
}

export const fontPresets: FontPreset[] = [
  // Sans-serif pairs
  { id: "f1", name: "Классика", heading: "Inter", body: "Inter", category: "sans" },
  { id: "f2", name: "Геометрия", heading: "DM Sans", body: "DM Sans", category: "sans" },
  { id: "f3", name: "Чистота", heading: "Plus Jakarta Sans", body: "Plus Jakarta Sans", category: "sans" },
  { id: "f4", name: "Минимал", heading: "Manrope", body: "Manrope", category: "sans" },
  { id: "f5", name: "Техно", heading: "Space Grotesk", body: "Inter", category: "sans" },
  { id: "f6", name: "Нео", heading: "Outfit", body: "Outfit", category: "sans" },
  { id: "f7", name: "Бруталь", heading: "Unbounded", body: "Inter", category: "sans" },
  { id: "f8", name: "Софт", heading: "Nunito", body: "Nunito", category: "sans" },
  { id: "f9", name: "Округлый", heading: "Comfortaa", body: "Inter", category: "sans" },
  { id: "f10", name: "Строгий", heading: "Work Sans", body: "Work Sans", category: "sans" },

  // Serif pairs
  { id: "f11", name: "Элегант", heading: "Playfair Display", body: "Lora", category: "serif" },
  { id: "f12", name: "Книжный", heading: "Merriweather", body: "Merriweather", category: "serif" },
  { id: "f13", name: "Издание", heading: "Libre Baskerville", body: "Libre Baskerville", category: "serif" },
  { id: "f14", name: "Ретро", heading: "Cormorant Garamond", body: "EB Garamond", category: "serif" },
  { id: "f15", name: "Премиум", heading: "DM Serif Display", body: "DM Sans", category: "serif" },
  { id: "f16", name: "Роскошь", heading: "Playfair Display", body: "Source Serif 4", category: "serif" },
  { id: "f17", name: "Газета", heading: "Lora", body: "Source Serif 4", category: "serif" },
  { id: "f18", name: "Антиква", heading: "Noto Serif", body: "Noto Serif", category: "serif" },
  { id: "f19", name: "Литера", heading: "Crimson Text", body: "Crimson Text", category: "serif" },
  { id: "f20", name: "Классицизм", heading: "EB Garamond", body: "EB Garamond", category: "serif" },

  // Mixed pairs
  { id: "f21", name: "Контраст", heading: "Playfair Display", body: "Inter", category: "mixed" },
  { id: "f22", name: "Стиль", heading: "DM Serif Display", body: "Plus Jakarta Sans", category: "mixed" },
  { id: "f23", name: "Модерн", heading: "Cormorant Garamond", body: "Manrope", category: "mixed" },
  { id: "f24", name: "Арт-деко", heading: "Playfair Display", body: "Outfit", category: "mixed" },
  { id: "f25", name: "Журнал", heading: "Lora", body: "DM Sans", category: "mixed" },
  { id: "f26", name: "Эдиториал", heading: "Merriweather", body: "Work Sans", category: "mixed" },
  { id: "f27", name: "Баланс", heading: "Libre Baskerville", body: "Nunito", category: "mixed" },
  { id: "f28", name: "Гармония", heading: "Noto Serif", body: "Inter", category: "mixed" },

  // Display
  { id: "f29", name: "Экспрессия", heading: "Unbounded", body: "DM Sans", category: "display" },
  { id: "f30", name: "Динамика", heading: "Space Grotesk", body: "Plus Jakarta Sans", category: "display" },
];
