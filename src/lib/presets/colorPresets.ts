export interface ColorPreset {
  id: string;
  name: string;
  category: "neutral" | "warm" | "cool" | "bold" | "pastel" | "dark";
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
}

export const colorPresets: ColorPreset[] = [
  // Neutral
  { id: "c1", name: "Графит", category: "neutral", primary: "220 14% 28%", secondary: "220 10% 95%", accent: "220 14% 45%", background: "0 0% 100%", foreground: "220 14% 10%", muted: "220 10% 60%" },
  { id: "c2", name: "Уголь", category: "neutral", primary: "0 0% 15%", secondary: "0 0% 96%", accent: "0 0% 35%", background: "0 0% 100%", foreground: "0 0% 8%", muted: "0 0% 55%" },
  { id: "c3", name: "Слоновая кость", category: "neutral", primary: "35 15% 30%", secondary: "40 20% 96%", accent: "35 20% 50%", background: "40 25% 99%", foreground: "35 15% 12%", muted: "35 10% 55%" },
  { id: "c4", name: "Сталь", category: "neutral", primary: "215 20% 35%", secondary: "215 15% 95%", accent: "215 20% 50%", background: "0 0% 100%", foreground: "215 20% 10%", muted: "215 12% 55%" },
  { id: "c5", name: "Камень", category: "neutral", primary: "30 8% 35%", secondary: "30 8% 95%", accent: "30 12% 50%", background: "30 10% 99%", foreground: "30 8% 12%", muted: "30 6% 55%" },

  // Warm
  { id: "c6", name: "Закат", category: "warm", primary: "15 85% 55%", secondary: "25 80% 96%", accent: "35 90% 55%", background: "30 30% 99%", foreground: "15 30% 12%", muted: "20 25% 55%" },
  { id: "c7", name: "Терракота", category: "warm", primary: "12 60% 48%", secondary: "15 40% 95%", accent: "25 65% 55%", background: "20 15% 99%", foreground: "12 35% 15%", muted: "15 20% 55%" },
  { id: "c8", name: "Золото", category: "warm", primary: "42 75% 48%", secondary: "45 50% 95%", accent: "38 80% 55%", background: "45 20% 99%", foreground: "42 30% 15%", muted: "42 20% 55%" },
  { id: "c9", name: "Корица", category: "warm", primary: "20 50% 40%", secondary: "22 30% 95%", accent: "15 55% 50%", background: "25 15% 99%", foreground: "20 35% 12%", muted: "20 20% 55%" },
  { id: "c10", name: "Янтарь", category: "warm", primary: "35 85% 50%", secondary: "38 60% 95%", accent: "30 90% 55%", background: "40 20% 99%", foreground: "35 40% 12%", muted: "35 25% 55%" },

  // Cool
  { id: "c11", name: "Океан", category: "cool", primary: "200 75% 45%", secondary: "200 50% 96%", accent: "185 70% 45%", background: "200 20% 99%", foreground: "200 30% 12%", muted: "200 20% 55%" },
  { id: "c12", name: "Сапфир", category: "cool", primary: "225 70% 50%", secondary: "225 50% 96%", accent: "215 65% 55%", background: "225 15% 99%", foreground: "225 35% 12%", muted: "225 20% 55%" },
  { id: "c13", name: "Бирюза", category: "cool", primary: "175 65% 42%", secondary: "175 40% 96%", accent: "165 60% 48%", background: "175 15% 99%", foreground: "175 30% 12%", muted: "175 20% 55%" },
  { id: "c14", name: "Арктика", category: "cool", primary: "210 55% 55%", secondary: "210 35% 96%", accent: "195 50% 52%", background: "210 15% 99%", foreground: "210 25% 12%", muted: "210 15% 58%" },
  { id: "c15", name: "Индиго", category: "cool", primary: "240 55% 52%", secondary: "240 35% 96%", accent: "230 50% 55%", background: "240 10% 99%", foreground: "240 30% 12%", muted: "240 15% 55%" },

  // Bold
  { id: "c16", name: "Рубин", category: "bold", primary: "350 80% 50%", secondary: "350 50% 96%", accent: "340 75% 55%", background: "0 0% 100%", foreground: "350 30% 12%", muted: "350 20% 55%" },
  { id: "c17", name: "Изумруд", category: "bold", primary: "155 70% 38%", secondary: "155 40% 96%", accent: "145 65% 45%", background: "155 10% 99%", foreground: "155 35% 12%", muted: "155 20% 55%" },
  { id: "c18", name: "Электро", category: "bold", primary: "265 75% 55%", secondary: "265 45% 96%", accent: "280 70% 58%", background: "265 10% 99%", foreground: "265 30% 12%", muted: "265 18% 55%" },
  { id: "c19", name: "Фуксия", category: "bold", primary: "325 75% 52%", secondary: "325 45% 96%", accent: "315 70% 55%", background: "325 10% 99%", foreground: "325 30% 12%", muted: "325 18% 55%" },
  { id: "c20", name: "Мандарин", category: "bold", primary: "25 90% 52%", secondary: "25 60% 96%", accent: "15 85% 55%", background: "25 15% 99%", foreground: "25 35% 12%", muted: "25 25% 55%" },

  // Pastel
  { id: "c21", name: "Лаванда", category: "pastel", primary: "270 45% 65%", secondary: "270 30% 96%", accent: "280 40% 70%", background: "270 15% 99%", foreground: "270 25% 18%", muted: "270 15% 60%" },
  { id: "c22", name: "Мята", category: "pastel", primary: "160 40% 55%", secondary: "160 25% 96%", accent: "150 35% 60%", background: "160 12% 99%", foreground: "160 25% 18%", muted: "160 15% 60%" },
  { id: "c23", name: "Персик", category: "pastel", primary: "20 60% 65%", secondary: "20 40% 96%", accent: "15 55% 68%", background: "20 20% 99%", foreground: "20 30% 18%", muted: "20 18% 60%" },
  { id: "c24", name: "Роза", category: "pastel", primary: "340 45% 65%", secondary: "340 30% 96%", accent: "335 40% 70%", background: "340 15% 99%", foreground: "340 25% 18%", muted: "340 15% 60%" },
  { id: "c25", name: "Небо", category: "pastel", primary: "200 50% 62%", secondary: "200 30% 96%", accent: "190 45% 65%", background: "200 15% 99%", foreground: "200 25% 18%", muted: "200 15% 60%" },

  // Dark themes
  { id: "c26", name: "Полночь", category: "dark", primary: "220 60% 55%", secondary: "220 20% 18%", accent: "210 55% 60%", background: "220 15% 8%", foreground: "220 15% 92%", muted: "220 12% 45%" },
  { id: "c27", name: "Космос", category: "dark", primary: "265 60% 60%", secondary: "265 15% 18%", accent: "275 55% 65%", background: "265 15% 6%", foreground: "265 10% 92%", muted: "265 10% 45%" },
  { id: "c28", name: "Обсидиан", category: "dark", primary: "35 70% 55%", secondary: "35 10% 16%", accent: "30 65% 58%", background: "0 0% 7%", foreground: "0 0% 92%", muted: "0 0% 45%" },
  { id: "c29", name: "Хакер", category: "dark", primary: "145 65% 48%", secondary: "145 10% 15%", accent: "140 60% 52%", background: "145 12% 6%", foreground: "145 8% 90%", muted: "145 8% 42%" },
  { id: "c30", name: "Нуар", category: "dark", primary: "0 0% 70%", secondary: "0 0% 15%", accent: "0 65% 55%", background: "0 0% 5%", foreground: "0 0% 90%", muted: "0 0% 42%" },
];
