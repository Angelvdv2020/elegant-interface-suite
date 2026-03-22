import type {
  Section, HeroContent, CardsContent, TextContent, GalleryContent, FormContent,
  SeparatorContent, CTAContent, NavbarContent, FooterContent, PricingContent,
  TestimonialsContent, FAQContent, VideoContent, StatsContent, TeamContent,
  ColumnsContent, HTMLContent, LogosContent, TimelineContent, BannerContent,
} from "@/components/editor/types";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderNavbar(c: NavbarContent) {
  const links = c.links.map(l => `<a href="${esc(l.url)}" style="color:#6b7280;text-decoration:none;font-size:.875rem">${esc(l.label)}</a>`).join("\n    ");
  return `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #e5e7eb">
  <span style="font-weight:700;font-size:1.1rem">${esc(c.logo)}</span>
  <div style="display:flex;gap:24px;align-items:center">
    ${links}
    <a href="#" style="padding:8px 16px;background:#2563eb;color:#fff;border-radius:6px;font-size:.875rem;font-weight:600;text-decoration:none">${esc(c.buttonText)}</a>
  </div>
</nav>`;
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
  return `<section style="padding:32px 24px"><div style="display:flex;gap:16px;flex-wrap:wrap">${cards}</div></section>`;
}

function renderText(c: TextContent) {
  return `<section style="padding:32px 24px">
  <h2 style="font-size:1.25rem;font-weight:600;margin:0 0 12px">${esc(c.title)}</h2>
  <p style="font-size:.9rem;color:#6b7280;line-height:1.7;margin:0">${esc(c.body)}</p>
</section>`;
}

function renderColumns(c: ColumnsContent) {
  const cols = c.columns.map(col => `<div style="flex:1;min-width:200px">
    <h3 style="font-size:1rem;font-weight:600;margin:0 0 8px">${esc(col.title)}</h3>
    <p style="font-size:.875rem;color:#6b7280;line-height:1.6;margin:0">${esc(col.body)}</p>
  </div>`).join("\n  ");
  return `<section style="padding:32px 24px"><div style="display:flex;gap:24px;flex-wrap:wrap">${cols}</div></section>`;
}

function renderGallery(c: GalleryContent) {
  if (!c.images.length) return `<section style="padding:32px 24px;text-align:center;color:#9ca3af">Галерея пуста</section>`;
  const imgs = c.images.map(img => `<img src="${esc(img.url)}" alt="${esc(img.alt)}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px">`).join("\n  ");
  return `<section style="padding:32px 24px"><div style="display:grid;grid-template-columns:repeat(${c.columns},1fr);gap:12px">${imgs}</div></section>`;
}

function renderVideo(c: VideoContent) {
  return `<section style="padding:32px 24px">
  <h2 style="font-size:1.25rem;font-weight:600;margin:0 0 8px">${esc(c.title)}</h2>
  <p style="font-size:.875rem;color:#6b7280;margin:0 0 16px">${esc(c.description)}</p>
  <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px">
    <iframe src="${esc(c.url)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allowfullscreen></iframe>
  </div>
</section>`;
}

function renderStats(c: StatsContent) {
  const items = c.items.map(item => `<div style="text-align:center;flex:1;min-width:120px;padding:16px">
    <div style="font-size:2rem;font-weight:700;margin-bottom:4px">${esc(item.value)}</div>
    <div style="font-size:.8rem;color:#6b7280">${esc(item.label)}</div>
  </div>`).join("\n  ");
  return `<section style="padding:32px 24px"><div style="display:flex;flex-wrap:wrap;gap:16px">${items}</div></section>`;
}

function renderPricing(c: PricingContent) {
  const plans = c.plans.map(plan => {
    const features = plan.features.map(f => `<li style="font-size:.8rem;color:#6b7280;margin-bottom:6px">✓ ${esc(f)}</li>`).join("\n      ");
    const bg = plan.highlighted ? "background:#eff6ff;border-color:#2563eb" : "border-color:#e5e7eb";
    const btnStyle = plan.highlighted ? "background:#2563eb;color:#fff" : "background:#f3f4f6;color:#1f2937";
    return `<div style="flex:1;min-width:220px;padding:28px;border:2px solid;border-radius:16px;${bg}">
      <h3 style="font-size:1rem;font-weight:600;margin:0 0 8px">${esc(plan.name)}</h3>
      <div style="font-size:1.75rem;font-weight:700;margin-bottom:16px">${esc(plan.price)}<span style="font-size:.8rem;color:#6b7280">${esc(plan.period)}</span></div>
      <ul style="list-style:none;padding:0;margin:0 0 20px">${features}</ul>
      <a href="#" style="display:block;text-align:center;padding:10px;${btnStyle};border-radius:8px;font-size:.875rem;font-weight:600;text-decoration:none">${esc(plan.buttonText)}</a>
    </div>`;
  }).join("\n  ");
  return `<section style="padding:48px 24px;text-align:center">
  <h2 style="font-size:1.5rem;font-weight:700;margin:0 0 8px">${esc(c.title)}</h2>
  <p style="font-size:.9rem;color:#6b7280;margin:0 0 32px">${esc(c.description)}</p>
  <div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center">${plans}</div>
</section>`;
}

function renderTestimonials(c: TestimonialsContent) {
  const items = c.items.map(item => `<div style="flex:1;min-width:260px;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
    <p style="font-size:.9rem;font-style:italic;color:#1f2937;line-height:1.6;margin:0 0 16px">"${esc(item.quote)}"</p>
    <div style="font-size:.8rem;font-weight:600">${esc(item.author)}</div>
    <div style="font-size:.75rem;color:#6b7280">${esc(item.role)}</div>
  </div>`).join("\n  ");
  return `<section style="padding:48px 24px;text-align:center">
  <h2 style="font-size:1.5rem;font-weight:700;margin:0 0 24px">${esc(c.title)}</h2>
  <div style="display:flex;gap:20px;flex-wrap:wrap">${items}</div>
</section>`;
}

function renderTeam(c: TeamContent) {
  const members = c.members.map(m => `<div style="text-align:center;min-width:140px;flex:1">
    <div style="width:64px;height:64px;border-radius:50%;background:#dbeafe;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem;font-weight:700;color:#2563eb">${esc(m.name.charAt(0))}</div>
    <div style="font-size:.9rem;font-weight:600">${esc(m.name)}</div>
    <div style="font-size:.8rem;color:#6b7280">${esc(m.role)}</div>
  </div>`).join("\n  ");
  return `<section style="padding:48px 24px;text-align:center">
  <h2 style="font-size:1.5rem;font-weight:700;margin:0 0 24px">${esc(c.title)}</h2>
  <div style="display:flex;gap:32px;flex-wrap:wrap;justify-content:center">${members}</div>
</section>`;
}

function renderFAQ(c: FAQContent) {
  const items = c.items.map(item => `<details style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:8px">
    <summary style="font-size:.9rem;font-weight:600;cursor:pointer">${esc(item.question)}</summary>
    <p style="font-size:.85rem;color:#6b7280;line-height:1.6;margin:12px 0 0">${esc(item.answer)}</p>
  </details>`).join("\n  ");
  return `<section style="padding:48px 24px;max-width:640px">
  <h2 style="font-size:1.5rem;font-weight:700;margin:0 0 20px">${esc(c.title)}</h2>
  ${items}
</section>`;
}

function renderLogos(c: LogosContent) {
  if (!c.logos.length) return `<section style="padding:32px 24px;text-align:center;color:#9ca3af">${esc(c.title)}</section>`;
  const imgs = c.logos.map(l => `<img src="${esc(l.url)}" alt="${esc(l.alt)}" style="height:32px;object-fit:contain;opacity:.5;filter:grayscale(1)">`).join("\n    ");
  return `<section style="padding:32px 24px;text-align:center">
  <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px">${esc(c.title)}</p>
  <div style="display:flex;gap:32px;justify-content:center;align-items:center;flex-wrap:wrap">${imgs}</div>
</section>`;
}

function renderTimeline(c: TimelineContent) {
  const items = c.items.map(item => `<div style="position:relative;padding-left:24px;margin-bottom:24px">
    <div style="position:absolute;left:0;top:4px;width:12px;height:12px;border-radius:50%;border:2px solid #2563eb;background:#fff"></div>
    <div style="font-size:.75rem;color:#2563eb;font-weight:600;margin-bottom:2px">${esc(item.date)}</div>
    <div style="font-size:.9rem;font-weight:600;margin-bottom:4px">${esc(item.title)}</div>
    <div style="font-size:.8rem;color:#6b7280;line-height:1.5">${esc(item.description)}</div>
  </div>`).join("\n  ");
  return `<section style="padding:48px 24px">
  <h2 style="font-size:1.5rem;font-weight:700;margin:0 0 24px">${esc(c.title)}</h2>
  <div style="position:relative;padding-left:6px;border-left:2px solid #e5e7eb">${items}</div>
</section>`;
}

function renderBanner(c: BannerContent) {
  return `<div style="padding:12px 24px;background:#fffbeb;display:flex;align-items:center;justify-content:space-between;border-radius:8px;margin:12px 24px">
  <span style="font-size:.875rem;font-weight:500">${esc(c.text)}</span>
  <a href="#" style="padding:6px 16px;background:#1f2937;color:#fff;border-radius:6px;font-size:.8rem;font-weight:600;text-decoration:none">${esc(c.buttonText)}</a>
</div>`;
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

function renderHTMLBlock(c: HTMLContent) {
  return c.code;
}

function renderFooter(c: FooterContent) {
  const cols = c.columns.map(col => {
    const links = col.links.map(l => `<a href="${esc(l.url)}" style="display:block;font-size:.8rem;color:#6b7280;text-decoration:none;margin-bottom:6px">${esc(l.label)}</a>`).join("\n      ");
    return `<div style="min-width:140px">
      <h4 style="font-size:.85rem;font-weight:600;margin:0 0 12px">${esc(col.title)}</h4>
      ${links}
    </div>`;
  }).join("\n    ");
  return `<footer style="padding:32px 24px;background:#f9fafb;border-top:1px solid #e5e7eb">
  <div style="display:flex;gap:48px;flex-wrap:wrap;margin-bottom:24px">
    <div><span style="font-weight:700;font-size:1rem">${esc(c.logo)}</span></div>
    ${cols}
  </div>
  <div style="border-top:1px solid #e5e7eb;padding-top:16px;font-size:.75rem;color:#9ca3af">${esc(c.copyright)}</div>
</footer>`;
}

const renderers: Record<string, (c: any) => string> = {
  navbar: renderNavbar, hero: renderHero, cards: renderCards, text: renderText,
  columns: renderColumns, gallery: renderGallery, video: renderVideo, stats: renderStats,
  pricing: renderPricing, testimonials: renderTestimonials, team: renderTeam, faq: renderFAQ,
  logos: renderLogos, timeline: renderTimeline, banner: renderBanner,
  form: renderForm, separator: renderSeparator, cta: renderCTA, html: renderHTMLBlock, footer: renderFooter,
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
