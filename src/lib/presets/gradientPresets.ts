export interface GradientPreset {
  id: string;
  name: string;
  css: string;
  category: "soft" | "vibrant" | "dark" | "nature" | "sunset" | "ocean";
}

export const gradientPresets: GradientPreset[] = [
  // Soft
  { id: "g1", name: "Утренний туман", css: "linear-gradient(135deg, hsl(220 20% 97%), hsl(200 30% 92%))", category: "soft" },
  { id: "g2", name: "Шёлк", css: "linear-gradient(135deg, hsl(280 15% 96%), hsl(320 20% 94%))", category: "soft" },
  { id: "g3", name: "Облачно", css: "linear-gradient(180deg, hsl(0 0% 100%), hsl(220 15% 96%))", category: "soft" },
  { id: "g4", name: "Пудра", css: "linear-gradient(135deg, hsl(340 25% 96%), hsl(20 30% 95%))", category: "soft" },
  { id: "g5", name: "Лунный свет", css: "linear-gradient(135deg, hsl(230 20% 95%), hsl(260 15% 92%))", category: "soft" },

  // Vibrant
  { id: "g6", name: "Неон", css: "linear-gradient(135deg, hsl(280 80% 55%), hsl(320 85% 55%))", category: "vibrant" },
  { id: "g7", name: "Электрик", css: "linear-gradient(135deg, hsl(200 90% 50%), hsl(260 85% 55%))", category: "vibrant" },
  { id: "g8", name: "Пламя", css: "linear-gradient(135deg, hsl(350 85% 55%), hsl(30 90% 55%))", category: "vibrant" },
  { id: "g9", name: "Кислота", css: "linear-gradient(135deg, hsl(120 70% 45%), hsl(180 80% 45%))", category: "vibrant" },
  { id: "g10", name: "Гиперспэйс", css: "linear-gradient(135deg, hsl(260 85% 60%), hsl(200 90% 55%))", category: "vibrant" },

  // Dark
  { id: "g11", name: "Космос", css: "linear-gradient(135deg, hsl(240 20% 8%), hsl(260 25% 15%))", category: "dark" },
  { id: "g12", name: "Уголь", css: "linear-gradient(135deg, hsl(0 0% 5%), hsl(220 15% 12%))", category: "dark" },
  { id: "g13", name: "Ночной город", css: "linear-gradient(135deg, hsl(240 15% 10%), hsl(280 30% 18%))", category: "dark" },
  { id: "g14", name: "Глубина", css: "linear-gradient(180deg, hsl(220 25% 6%), hsl(200 35% 12%))", category: "dark" },
  { id: "g15", name: "Обсидиан", css: "linear-gradient(135deg, hsl(0 0% 3%), hsl(0 0% 10%))", category: "dark" },

  // Nature
  { id: "g16", name: "Лес", css: "linear-gradient(135deg, hsl(140 35% 35%), hsl(160 40% 45%))", category: "nature" },
  { id: "g17", name: "Мох", css: "linear-gradient(135deg, hsl(90 25% 40%), hsl(130 30% 50%))", category: "nature" },
  { id: "g18", name: "Весна", css: "linear-gradient(135deg, hsl(100 40% 85%), hsl(160 45% 80%))", category: "nature" },
  { id: "g19", name: "Земля", css: "linear-gradient(135deg, hsl(30 30% 35%), hsl(20 25% 25%))", category: "nature" },
  { id: "g20", name: "Лаванда", css: "linear-gradient(135deg, hsl(270 35% 80%), hsl(300 30% 85%))", category: "nature" },

  // Sunset
  { id: "g21", name: "Рассвет", css: "linear-gradient(135deg, hsl(35 85% 55%), hsl(350 70% 55%))", category: "sunset" },
  { id: "g22", name: "Золотой час", css: "linear-gradient(135deg, hsl(40 90% 60%), hsl(25 85% 50%))", category: "sunset" },
  { id: "g23", name: "Сумерки", css: "linear-gradient(135deg, hsl(260 40% 35%), hsl(330 50% 45%))", category: "sunset" },
  { id: "g24", name: "Пурпурный вечер", css: "linear-gradient(135deg, hsl(280 50% 40%), hsl(350 60% 50%))", category: "sunset" },
  { id: "g25", name: "Манго", css: "linear-gradient(135deg, hsl(45 90% 55%), hsl(15 80% 50%))", category: "sunset" },

  // Ocean
  { id: "g26", name: "Тихий океан", css: "linear-gradient(135deg, hsl(200 60% 40%), hsl(180 50% 50%))", category: "ocean" },
  { id: "g27", name: "Айсберг", css: "linear-gradient(135deg, hsl(190 40% 85%), hsl(210 50% 75%))", category: "ocean" },
  { id: "g28", name: "Коралл", css: "linear-gradient(135deg, hsl(195 55% 45%), hsl(170 60% 55%))", category: "ocean" },
  { id: "g29", name: "Глубоководный", css: "linear-gradient(180deg, hsl(210 50% 25%), hsl(230 40% 15%))", category: "ocean" },
  { id: "g30", name: "Бриз", css: "linear-gradient(135deg, hsl(185 45% 70%), hsl(210 55% 60%))", category: "ocean" },

  // Pastel
  { id: "g31", name: "Зефир", css: "linear-gradient(135deg, hsl(300 40% 92%), hsl(200 50% 90%))", category: "soft" },
  { id: "g32", name: "Персик", css: "linear-gradient(135deg, hsl(20 60% 90%), hsl(40 50% 88%))", category: "soft" },
  { id: "g33", name: "Мятный крем", css: "linear-gradient(135deg, hsl(160 40% 90%), hsl(140 35% 85%))", category: "soft" },
  { id: "g34", name: "Сирень", css: "linear-gradient(135deg, hsl(270 30% 90%), hsl(290 25% 85%))", category: "soft" },
  { id: "g35", name: "Жемчуг", css: "linear-gradient(135deg, hsl(0 0% 98%), hsl(40 20% 94%))", category: "soft" },

  // Neon
  { id: "g36", name: "Токио", css: "linear-gradient(135deg, hsl(330 90% 50%), hsl(270 80% 55%))", category: "vibrant" },
  { id: "g37", name: "Лазер", css: "linear-gradient(135deg, hsl(160 90% 45%), hsl(200 95% 50%))", category: "vibrant" },
  { id: "g38", name: "Плазма", css: "linear-gradient(135deg, hsl(300 85% 50%), hsl(30 90% 50%))", category: "vibrant" },
  { id: "g39", name: "Аврора", css: "linear-gradient(135deg, hsl(120 60% 50%), hsl(260 70% 55%))", category: "vibrant" },
  { id: "g40", name: "Спектр", css: "linear-gradient(135deg, hsl(0 80% 55%), hsl(60 85% 50%), hsl(200 90% 50%))", category: "vibrant" },

  // Monochrome dark
  { id: "g41", name: "Графит", css: "linear-gradient(180deg, hsl(0 0% 15%), hsl(0 0% 8%))", category: "dark" },
  { id: "g42", name: "Антрацит", css: "linear-gradient(135deg, hsl(210 10% 12%), hsl(210 15% 6%))", category: "dark" },
  { id: "g43", name: "Вулкан", css: "linear-gradient(135deg, hsl(0 20% 12%), hsl(20 15% 6%))", category: "dark" },
  { id: "g44", name: "Бездна", css: "linear-gradient(180deg, hsl(250 30% 10%), hsl(220 20% 4%))", category: "dark" },
  { id: "g45", name: "Сталь", css: "linear-gradient(135deg, hsl(210 15% 20%), hsl(210 10% 12%))", category: "dark" },

  // Earth tones
  { id: "g46", name: "Терракота", css: "linear-gradient(135deg, hsl(15 45% 45%), hsl(25 35% 35%))", category: "nature" },
  { id: "g47", name: "Бамбук", css: "linear-gradient(135deg, hsl(80 30% 50%), hsl(60 25% 40%))", category: "nature" },
  { id: "g48", name: "Пустыня", css: "linear-gradient(135deg, hsl(35 40% 70%), hsl(25 30% 50%))", category: "nature" },
  { id: "g49", name: "Хвоя", css: "linear-gradient(135deg, hsl(150 30% 30%), hsl(170 25% 22%))", category: "nature" },
  { id: "g50", name: "Янтарь", css: "linear-gradient(135deg, hsl(40 70% 50%), hsl(30 60% 40%))", category: "nature" },
];
