export interface SiteSettings {
  fonts: {
    heading: string;
    body: string;
    presetId?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    presetId?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    favicon: string;
    language: string;
    author: string;
    robots: string;
  };
  spacing: {
    borderRadius: number;
    sectionGap: number;
    containerWidth: number;
  };
  effects: {
    shadow: "none" | "sm" | "md" | "lg";
    animation: "none" | "subtle" | "moderate" | "energetic";
    hoverScale: boolean;
  };
}

export const defaultSiteSettings: SiteSettings = {
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  colors: {
    primary: "220 14% 28%",
    secondary: "220 10% 95%",
    accent: "220 14% 45%",
    background: "0 0% 100%",
    foreground: "220 14% 10%",
    muted: "220 10% 60%",
  },
  seo: {
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
    favicon: "",
    language: "ru",
    author: "",
    robots: "index, follow",
  },
  spacing: {
    borderRadius: 8,
    sectionGap: 0,
    containerWidth: 1200,
  },
  effects: {
    shadow: "md",
    animation: "subtle",
    hoverScale: true,
  },
};
