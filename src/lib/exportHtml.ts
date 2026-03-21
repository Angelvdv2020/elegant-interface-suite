import type { Section, HeroContent, CardsContent, TextContent, GalleryContent, FormContent, SeparatorContent, CTAContent } from "@/components/editor/types";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderHero(c: HeroContent) {
  return `<section style="padding:48px 24px;text-align:center;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border-radius:12px;margin-bottom:24px">
  <h1 style="font-size:2rem;font-weight:700;margin:0 0 12px">${esc(c.title)}</h1>
  <p style="font-size:1rem;opacity:.85;margin:0 0 24px">${esc(c.description)}</p>
  <a href="#" style="display:inline-block;padding:12px 28px;background:#fff;color:#2563eb;border-radius:8px;font-weight:600;text-decoration:none">${esc(c.buttonText)}</a>
</section>`;
}

function renderCards(c: CardsContent) {
  const cards = c.cards.map(card => `<div style="flex:1;min-width:200px;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
    <div style="width:32px;height:32px;border-radius:8px;background:#dbeafe;margin-bottom:16px"></div>
    <h3 style="font-size:1rem;font-weight:600;margin:0 0 8px">${esc(card.label)}</h3>
    <p style="font-size:.875rem;color:#6b7280;margin:0">${esc(card.description)}</p>
  </div>`).join("\n  ");
  return `<section style="padding:32px 24px">
  <div style="display:flex;gap:16px;flex-wrap:wrap">${cards}</div>
</section>`;
}

function renderText(c: TextContent) {
  return `<section style="padding:32px 24px">
  <h2 style="font-size:1.25rem;font-weight:600;margin:0 0 12px">${esc(c.title)}</h2>
  <p style="font-size:.9rem;color:#6b7280;line-height:1.7;margin:0">${esc(c.body)}</p>
</section>`;
}

function renderGallery(c: GalleryContent) {
  if (!c.images.length) return `<section style="padding:32px 24px;text-align:center;color:#9ca3af">Галерея пуста</section>`;
  const imgs = c.images.map(img => `<img src="${esc(img.url)}" alt="${esc(img.alt)}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px">`).join("\n  ");
  return `<section style="padding:32px 24px">
  <div style="display:grid;grid-template-columns:repeat(${c.columns},1fr);gap:12px">${imgs}</div>
</section>`;
}

function renderForm(c: FormContent) {
  const fields = c.fields.map(f => {
    const label = `<label style="display:block;font-size:.8rem;font-weight:500;margin-bottom:4px">${esc(f.label)}${f.required ? ' <span style="color:#ef4444">*</span>' : ""}</label>`;
    const input = f.type === "textarea"
      ? `<textarea placeholder="${esc(f.placeholder)}" style="width:100%;height:80px;padding:8px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:.875rem;box-sizing:border-box"></textarea>`
      : `<input type="${esc(f.type)}" placeholder="${esc(f.placeholder)}" style="width:100%;height:40px;padding:0 12px;border:1px solid #d1d5db;border-radius:8px;font-size:.875rem;box-sizing:border-box">`;
    return `<div style="margin-bottom:16px">${label}${input}</div>`;
  }).join("\n  ");
  return `<section style="padding:32px 24px;max-width:480px">
  <h2 style="font-size:1.25rem;font-weight:600;margin:0 0 20px">${esc(c.title)}</h2>
  <form onsubmit="return false">${fields}
    <button type="submit" style="padding:10px 24px;background:#2563eb;color:#fff;border:none;border-radius:8px;font-size:.875rem;font-weight:600;cursor:pointer">${esc(c.buttonText)}</button>
  </form>
</section>`;
}

function renderSeparator(c: SeparatorContent) {
  if (c.style === "dots") return `<div style="padding:16px 0;text-align:center;letter-spacing:8px;color:#d1d5db">• • •</div>`;
  if (c.style === "line") return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:${c.height / 2}px 24px">`;
  return `<div style="height:${c.height}px"></div>`;
}

function renderCTA(c: CTAContent) {
  return `<section style="padding:48px 24px;text-align:center;background:#2563eb;border-radius:12px;margin:24px;color:#fff">
  <h2 style="font-size:1.5rem;font-weight:700;margin:0 0 8px">${esc(c.title)}</h2>
  <p style="font-size:.9rem;opacity:.85;margin:0 0 24px">${esc(c.description)}</p>
  <a href="#" style="display:inline-block;padding:12px 28px;background:#fff;color:#2563eb;border-radius:8px;font-weight:600;text-decoration:none">${esc(c.buttonText)}</a>
</section>`;
}

const renderers: Record<string, (c: any) => string> = {
  hero: renderHero, cards: renderCards, text: renderText,
  gallery: renderGallery, form: renderForm, separator: renderSeparator, cta: renderCTA,
};

export function exportSectionsToHtml(sections: Section[], title = "Exported Page"): string {
  const body = sections.map(s => renderers[s.type]?.(s.content) ?? "").join("\n\n");
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#1f2937;background:#fff;max-width:960px;margin:0 auto;padding:24px}</style>
</head>
<body>
${body}
</body>
</html>`;
}

export function downloadHtml(sections: Section[], title?: string) {
  const html = exportSectionsToHtml(sections, title);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(title ?? "page").replace(/\s+/g, "-").toLowerCase()}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
