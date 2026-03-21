import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Что такое VLESS и почему это лучше WireGuard?", a: "VLESS + XTLS-Reality маскирует трафик под HTTPS. DPI не может его отличить. WireGuard и OpenVPN легко блокируются." },
  { q: "Как быстро получу ключ после оплаты?", a: "Автоматически, от 30 секунд. Ключ в ЛК с QR-кодом для импорта." },
  { q: "Можно настроить на роутер?", a: "Да. Поддерживаем OpenWrt и Keenetic. Все устройства в доме — через VPN без приложений." },
  { q: "Какие приложения нужны?", a: "Windows: Hiddify/v2rayN. macOS: Hiddify/V2Box. iOS: Hiddify/Streisand. Android: Hiddify/V2rayNG. Бесплатно." },
  { q: "Какие способы оплаты?", a: "СБП, ЮKassa, YooMoney, Robokassa, CryptoBot, Telegram Stars и ещё 5 способов." },
  { q: "Ведёте логи?", a: "Нет. Zero-log: не записываем IP, сайты, трафик, время сессий. Данных нет на серверах." },
];

const FAQSection = () => (
  <section id="faq" className="section-light py-10 lg:py-14">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">FAQ</span>
        <h2>Частые вопросы</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.slice(0, 3).map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}
              className="rounded-xl border border-border bg-card shadow-glow px-5 data-[state=open]:border-primary/30">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.slice(3).map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i + 3}`}
              className="rounded-xl border border-border bg-card shadow-glow px-5 data-[state=open]:border-primary/30">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <p className="mt-8 text-sm text-muted-foreground text-center">
        <Link to="/faq" className="text-primary hover:underline">Все вопросы →</Link>
        {" · "}
        <Link to="/contacts" className="text-primary hover:underline">Чат поддержки</Link>
      </p>
    </div>
  </section>
);

export default FAQSection;
