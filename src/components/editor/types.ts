export type SectionType = "hero" | "cards" | "text";

export interface Section {
  id: string;
  type: SectionType;
  label: string;
  content: SectionContent;
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

export type SectionContent = HeroContent | CardsContent | TextContent;
