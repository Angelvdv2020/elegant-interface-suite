import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const categories = [
  { name: "Общие вопросы", faqs: [
    { q: "Что такое VLESS и чем он отличается от других протоколов?", a: "VLESS — это лёгкий протокол передачи данных без встроенного шифрования, разработанный как замена VMess. В связке с Reality он маскирует трафик под обычный HTTPS, что делает его практически незаметным для DPI-систем." },
    { q: "Что такое XTLS-Reality?", a: "Reality — технология маскировки, при которой ваш VPN-трафик выглядит как соединение с реальным легальным сайтом (например, microsoft.com). Это позволяет обходить даже самые современные системы блокировок." },
    { q: "Законно ли использовать VPN?", a: "В большинстве стран использование VPN легально для защиты личных данных и приватности. Мы не несём ответственности за нарушение законодательства той или иной страны. Уточняйте правила в вашем регионе." },
  ]},
  { name: "Оплата и подписки", faqs: [
    { q: "Как работает система баланса?", a: "Баланс пополняется при оплате и автоматически списывается за подписку. Реферальные бонусы также зачисляются на баланс и могут использоваться для оплаты тарифа." },
    { q: "Можно ли получить возврат?", a: "Да, в течение 7 дней с момента оплаты вы можете запросить полный возврат средств. Напишите в поддержку — рассмотрим без лишних вопросов." },
    { q: "Как работает реферальная программа?", a: "Вы получаете 5% с платежей приглашённых вами пользователей (уровень 1), 3% с их рефералов (уровень 2) и 1% с третьего уровня. Бонусы начисляются автоматически." },
  ]},
  { name: "Настройка", faqs: [
    { q: "Какие приложения подходят для VLESS?", a: "На Android — v2rayNG, Hiddify. На iOS — Streisand, Shadowrocket. На Windows/macOS — v2rayN, Hiddify Desktop. На роутерах — OpenWrt с Xray-core или sing-box." },
    { q: "Как импортировать ключ?", a: "В личном кабинете нажмите «Мои подписки», скопируйте ссылку или отсканируйте QR-код в приложении. Для роутера — скопируйте конфиг VLESS и вставьте в Xray-core вручную." },
    { q: "Можно ли заморозить подписку?", a: "Да, функция заморозки доступна на тарифах PRO и выше. Подписка приостанавливается, дни не списываются. Максимальный срок заморозки — 30 дней за период." },
  ]},
  { name: "Роутеры", faqs: [
    { q: "Какой роутер купить для OpenWrt?", a: "Рекомендуем Xiaomi AX3000T или Redmi AX6000 — оба хорошо поддерживаются OpenWrt и показывают скорость 300–700 Мбит/с в режиме tproxy с Xray-core. Читайте подробный обзор в блоге." },
    { q: "Можно ли настроить VPN на Keenetic?", a: "Да, на Keenetic работает VLESS через Entware с Xray-core, но требует USB-накопитель для хранения пакетов. Гайд по настройке есть в разделе документации." },
    { q: "Какая скорость VLESS на роутере?", a: "На Xiaomi AX3000T в режиме tproxy — до 400 Мбит/с. На Redmi AX6000 — до 700 Мбит/с. На роутерах с чипсетом MT7987A (Wi-Fi 7) — более 700 Мбит/с." },
    { q: "tun или tproxy?", a: "tproxy работает быстрее и эффективнее на роутерах — рекомендуем его. tun проще в настройке, но создаёт дополнительный оверхед. Для Keenetic без OpenWrt — только tun." },
    { q: "Нужен ли USB для Keenetic?", a: "Да, для установки Entware (и Xray-core) на Keenetic нужен USB-накопитель от 1 ГБ. Без него установка сторонних пакетов невозможна." },
  ]},
  { name: "Проблемы", faqs: [
    { q: "VPN подключается, но сайты не открываются", a: "Проверьте настройки DNS — часто проблема в этом. Укажите в приложении DNS 1.1.1.1 или 8.8.8.8. Также убедитесь, что в приложении выбран режим «Глобальный» или «Прокси»." },
    { q: "Низкая скорость", a: "Попробуйте сменить локацию сервера или протокол. Hysteria 2 даёт лучшую скорость при нестабильном соединении (UDP). Также проверьте, не ограничивает ли провайдер UDP-трафик." },
    { q: "Ключ не импортируется", a: "Убедитесь, что приложение поддерживает VLESS + Reality (v2rayNG 1.8+, Hiddify, Streisand). Старые версии приложений могут не поддерживать Reality. Обновите приложение." },
    { q: "DNS не работает через VPN", a: "Включите опцию «DNS через VPN» в настройках приложения. Или вручную укажите DNS-сервер 1.1.1.1 в системных сетевых настройках устройства." },
    { q: "Как проверить что VPN работает?", a: "Зайдите на 2ip.ru или whoer.net и проверьте IP-адрес. Если он отличается от вашего реального — VPN работает. Также можно проверить через ipleak.net на утечки DNS." },
    { q: "Что делать если скорость упала?", a: <>Смените сервер или протокол. Если используете Hysteria 2 — попробуйте VLESS, и наоборот. При проблемах на роутере — перезагрузите Xray-core командой <code className="font-mono text-[11px] text-[#00ff88]">/etc/init.d/xray restart</code>.</> },
  ]},
];


const faqChevronTriggerClass = [
  "text-left text-[13px] font-medium hover:no-underline py-[15px] text-[#e8f0e8] data-[state=open]:text-white",
  // Style the SVG chevron to match the HTML design: 22x22 box with rounded corners, bg, border
  "[&>svg]:w-[22px] [&>svg]:h-[22px] [&>svg]:p-[5px] [&>svg]:rounded-[6px] [&>svg]:shrink-0",
  "[&>svg]:bg-white/[0.05] [&>svg]:border [&>svg]:border-white/[0.15]",
  "[&>svg]:text-[#e8f0e8]/45 [&>svg]:transition-all [&>svg]:duration-[250ms]",
  // On open: green bg, green border, green color, rotate
  "[&[data-state=open]>svg]:bg-[#00ff88]/[0.12] [&[data-state=open]>svg]:border-[#00ff88]/20",
  "[&[data-state=open]>svg]:text-[#00ff88]",
].join(" ");

const FAQPage = () => {
  const left = categories.slice(0, 3);
  const right = categories.slice(3);

  return (
    <PageLayout>
      {/* ── BREADCRUMB ── */}
      <div className="flex items-center gap-2 px-6 md:px-12 pt-[18px] text-xs text-white/25 relative z-[1]">
        <Link to="/" className="text-[#00ff88] font-medium hover:underline">Главная</Link>
        <span>/</span>
        <span className="text-white/45">FAQ</span>
      </div>

      {/* ── FAQ CONTENT ── */}
      <section className="relative z-[1] px-6 md:px-12 pt-10 pb-20">
        <div className="max-w-[1400px] mx-auto grid gap-10 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-7">
            {left.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="font-mono text-[10px] font-bold text-white/45 tracking-[2.5px] uppercase whitespace-nowrap">{cat.name}</span>
                  <span className="flex-1 h-px bg-white/[0.07]" />
                </div>
                <Accordion type="single" collapsible className="space-y-2">
                  {cat.faqs.map((faq, fi) => (
                    <AccordionItem key={fi} value={`${cat.name}-${fi}`}
                      className="rounded-xl border border-white/[0.15] bg-[rgba(0,0,0,0.3)] shadow-glow px-[18px] data-[state=open]:border-[#00ff88]/20 transition-colors">
                      <AccordionTrigger className={faqChevronTriggerClass}>{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-xs text-[#e8f0e8]/70 leading-[1.75] font-light pb-4">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          {/* Right column */}
          <div className="space-y-7">
            {right.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="font-mono text-[10px] font-bold text-white/45 tracking-[2.5px] uppercase whitespace-nowrap">{cat.name}</span>
                  <span className="flex-1 h-px bg-white/[0.07]" />
                </div>
                <Accordion type="single" collapsible className="space-y-2">
                  {cat.faqs.map((faq, fi) => (
                    <AccordionItem key={fi} value={`${cat.name}-${fi}`}
                      className="rounded-xl border border-white/[0.15] bg-[rgba(0,0,0,0.3)] shadow-glow px-[18px] data-[state=open]:border-[#00ff88]/20 transition-colors">
                      <AccordionTrigger className={faqChevronTriggerClass}>{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-xs text-[#e8f0e8]/70 leading-[1.75] font-light pb-4">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQPage;
