export interface ShapePreset {
  id: string;
  name: string;
  category: "geometric" | "organic" | "decorative" | "divider" | "badge" | "frame";
  svg: string;
  viewBox: string;
}

export const shapePresets: ShapePreset[] = [
  // Geometric
  { id: "s1", name: "Круг", category: "geometric", viewBox: "0 0 200 200", svg: '<circle cx="100" cy="100" r="90" fill="currentColor"/>' },
  { id: "s2", name: "Квадрат", category: "geometric", viewBox: "0 0 200 200", svg: '<rect x="10" y="10" width="180" height="180" fill="currentColor"/>' },
  { id: "s3", name: "Ромб", category: "geometric", viewBox: "0 0 200 200", svg: '<polygon points="100,10 190,100 100,190 10,100" fill="currentColor"/>' },
  { id: "s4", name: "Треугольник", category: "geometric", viewBox: "0 0 200 200", svg: '<polygon points="100,10 190,190 10,190" fill="currentColor"/>' },
  { id: "s5", name: "Шестиугольник", category: "geometric", viewBox: "0 0 200 200", svg: '<polygon points="50,10 150,10 190,100 150,190 50,190 10,100" fill="currentColor"/>' },
  { id: "s6", name: "Восьмиугольник", category: "geometric", viewBox: "0 0 200 200", svg: '<polygon points="60,10 140,10 190,60 190,140 140,190 60,190 10,140 10,60" fill="currentColor"/>' },
  { id: "s7", name: "Звезда 4", category: "geometric", viewBox: "0 0 200 200", svg: '<polygon points="100,10 120,80 190,80 135,120 155,190 100,145 45,190 65,120 10,80 80,80" fill="currentColor"/>' },
  { id: "s8", name: "Крест", category: "geometric", viewBox: "0 0 200 200", svg: '<path d="M70 10h60v60h60v60h-60v60h-60v-60h-60v-60h60z" fill="currentColor"/>' },
  { id: "s9", name: "Стрелка", category: "geometric", viewBox: "0 0 200 200", svg: '<polygon points="100,10 190,100 140,100 140,190 60,190 60,100 10,100" fill="currentColor"/>' },
  { id: "s10", name: "Параллелограмм", category: "geometric", viewBox: "0 0 200 100", svg: '<polygon points="30,10 190,10 170,90 10,90" fill="currentColor"/>' },

  // Organic
  { id: "s11", name: "Капля", category: "organic", viewBox: "0 0 200 200", svg: '<path d="M100 10C100 10 40 80 40 130C40 165 66 190 100 190C134 190 160 165 160 130C160 80 100 10 100 10Z" fill="currentColor"/>' },
  { id: "s12", name: "Лист", category: "organic", viewBox: "0 0 200 200", svg: '<path d="M100 10C40 50 10 100 10 150C10 175 30 190 60 190C80 190 95 180 100 160C105 180 120 190 140 190C170 190 190 175 190 150C190 100 160 50 100 10Z" fill="currentColor"/>' },
  { id: "s13", name: "Облако", category: "organic", viewBox: "0 0 300 180", svg: '<path d="M250 120C250 80 220 60 190 60C180 30 150 10 115 10C80 10 55 35 50 65C25 70 10 90 10 115C10 145 35 170 65 170H235C245 170 250 150 250 120Z" fill="currentColor"/>' },
  { id: "s14", name: "Волна", category: "organic", viewBox: "0 0 300 100", svg: '<path d="M0 50C50 20 100 80 150 50C200 20 250 80 300 50V100H0Z" fill="currentColor"/>' },
  { id: "s15", name: "Блоб 1", category: "organic", viewBox: "0 0 200 200", svg: '<path d="M140 20C170 35 195 60 195 95C195 130 175 155 150 170C125 185 90 190 65 175C40 160 20 130 15 100C10 70 25 40 50 25C75 10 110 5 140 20Z" fill="currentColor"/>' },

  // Decorative
  { id: "s16", name: "Сердце", category: "decorative", viewBox: "0 0 200 200", svg: '<path d="M100 180C70 150 10 110 10 65C10 30 35 10 65 10C80 10 95 20 100 30C105 20 120 10 135 10C165 10 190 30 190 65C190 110 130 150 100 180Z" fill="currentColor"/>' },
  { id: "s17", name: "Молния", category: "decorative", viewBox: "0 0 120 200", svg: '<polygon points="70,0 30,90 60,90 20,200 100,100 65,100 110,0" fill="currentColor"/>' },
  { id: "s18", name: "Щит", category: "decorative", viewBox: "0 0 200 220", svg: '<path d="M100 10L180 50V120C180 170 140 200 100 215C60 200 20 170 20 120V50L100 10Z" fill="currentColor"/>' },
  { id: "s19", name: "Лента", category: "decorative", viewBox: "0 0 300 80", svg: '<path d="M0 20L30 40L0 60H80V80L50 60H250L220 80V60H300L270 40L300 20H220V0L250 20H50L80 0V20H0Z" fill="currentColor"/>' },
  { id: "s20", name: "Корона", category: "decorative", viewBox: "0 0 200 150", svg: '<polygon points="10,130 10,50 50,80 100,20 150,80 190,50 190,130" fill="currentColor"/>' },

  // Dividers
  { id: "s21", name: "Волна-раздел", category: "divider", viewBox: "0 0 400 60", svg: '<path d="M0 30C100 0 200 60 300 30C350 15 380 20 400 30V60H0Z" fill="currentColor"/>' },
  { id: "s22", name: "Зигзаг", category: "divider", viewBox: "0 0 400 60", svg: '<path d="M0 30L50 0L100 30L150 0L200 30L250 0L300 30L350 0L400 30V60H0Z" fill="currentColor"/>' },
  { id: "s23", name: "Угол", category: "divider", viewBox: "0 0 400 60", svg: '<polygon points="0,60 200,0 400,60" fill="currentColor"/>' },
  { id: "s24", name: "Кривая", category: "divider", viewBox: "0 0 400 60", svg: '<path d="M0 60C100 20 200 20 300 40C350 50 380 55 400 60V60H0Z" fill="currentColor"/>' },
  { id: "s25", name: "Ступени", category: "divider", viewBox: "0 0 400 60", svg: '<path d="M0 60V40H100V20H200V0H300V20H400V60H0Z" fill="currentColor"/>' },

  // Badges
  { id: "s26", name: "Бейдж круг", category: "badge", viewBox: "0 0 200 200", svg: '<circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" stroke-width="2"/>' },
  { id: "s27", name: "Бейдж звезда", category: "badge", viewBox: "0 0 200 200", svg: '<path d="M100 5L120 75L195 75L135 115L155 185L100 145L45 185L65 115L5 75L80 75Z" fill="none" stroke="currentColor" stroke-width="4"/>' },
  { id: "s28", name: "Печать", category: "badge", viewBox: "0 0 200 200", svg: '<circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="8 4"/>' },

  // Frames
  { id: "s29", name: "Рамка", category: "frame", viewBox: "0 0 200 200", svg: '<rect x="10" y="10" width="180" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="4"/><rect x="20" y="20" width="160" height="160" rx="4" fill="none" stroke="currentColor" stroke-width="1"/>' },
  { id: "s30", name: "Скобки", category: "frame", viewBox: "0 0 200 200", svg: '<path d="M50 10H20C14 10 10 14 10 20V50M150 10H180C186 10 190 14 190 20V50M50 190H20C14 190 10 186 10 180V150M150 190H180C186 190 190 186 190 180V150" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' },
];
