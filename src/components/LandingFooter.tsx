import { Link } from "react-router-dom";

const LandingFooter = () => (
  <footer className="border-t border-border bg-secondary/30">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-[10px] font-bold text-brand-light">V</div>
            <span className="text-sm font-semibold">Visually</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Визуальный редактор страниц, который встраивается в любой сайт через один тег.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Продукт</div>
          <div className="space-y-2">
            <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground">Возможности</a>
            <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-foreground">Тарифы</Link>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground">Документация</a>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Интеграции</div>
          <div className="space-y-2">
            <span className="block text-sm text-muted-foreground">WordPress</span>
            <span className="block text-sm text-muted-foreground">Next.js</span>
            <span className="block text-sm text-muted-foreground">Webflow</span>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Компания</div>
          <div className="space-y-2">
            <span className="block text-sm text-muted-foreground">Блог</span>
            <span className="block text-sm text-muted-foreground">Поддержка</span>
            <span className="block text-sm text-muted-foreground">Политика конфиденциальности</span>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
        © {new Date().getFullYear()} Visually. Все права защищены.
      </div>
    </div>
  </footer>
);

export default LandingFooter;
