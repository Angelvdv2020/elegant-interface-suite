import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";


const ReferralPage = () => {
  const { user } = useAuth();

  return (
    <PageLayout>
      {/* ── BREADCRUMB ── */}
      <div className="flex items-center gap-2 px-6 md:px-12 pt-[18px] text-xs text-white/25 relative z-[1]">
        <Link to="/" className="text-[#00ff88] font-medium hover:underline">Главная</Link>
        <span>/</span>
        <span className="text-[#e8f0e8]/72">Реферальная программа</span>
      </div>

      {/* ── PAGE CONTENT ── */}
      <section className="relative z-[1] px-6 md:px-12 pt-10 pb-20">
        <div className="max-w-[1400px]">

          {/* ── STATS ROW ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] py-[22px] px-5 text-center transition-all hover:border-[#00ff88]/20">
              <div className="text-[30px] font-black text-[#ffaa00] mb-1.5" style={{ fontFamily: "'Unbounded', sans-serif" }}>5%</div>
              <div className="text-[11px] text-white/45 tracking-[0.5px]">С каждого платежа 1-го уровня</div>
            </div>
            <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] py-[22px] px-5 text-center transition-all hover:border-[#00ff88]/20">
              <div className="text-[30px] font-black text-white mb-1.5" style={{ fontFamily: "'Unbounded', sans-serif" }}>Авто</div>
              <div className="text-[11px] text-white/45 tracking-[0.5px]">Начисление без заявок</div>
            </div>
            <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] py-[22px] px-5 text-center transition-all hover:border-[#00ff88]/20">
              <div className="text-[30px] font-black text-[#00ff88] mb-1.5" style={{ fontFamily: "'Unbounded', sans-serif" }}>&infin;</div>
              <div className="text-[11px] text-white/45 tracking-[0.5px]">Без лимита на приглашения</div>
            </div>
          </div>

          {/* ── TWO-COL LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT: How it works */}
            <div>
              <div className="font-mono text-[10px] font-bold text-white/45 tracking-[2px] uppercase mb-4">КАК ЭТО РАБОТАЕТ</div>

              {/* Step 1 */}
              <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] p-5 flex items-start gap-4 mb-3 transition-all hover:border-[#00ff88]/20 hover:translate-x-[3px]">
                <div className="w-10 h-10 rounded-[10px] shrink-0 bg-[#00ff88]/[0.08] border border-[#00ff88]/[0.18] flex items-center justify-center text-lg">
                  <span role="img" aria-label="people">👥</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">Пригласите друга</div>
                  <div className="text-xs text-[#e8f0e8]/70 leading-[1.6] font-light">Поделитесь своей реферальной ссылкой из личного кабинета.</div>
                </div>
              </div>

              {/* Connector */}
              <div className="w-px h-3 ml-[39px]" style={{ background: 'linear-gradient(to bottom, rgba(0,255,136,0.2), transparent)' }} />

              {/* Step 2 */}
              <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] p-5 flex items-start gap-4 mb-3 transition-all hover:border-[#00ff88]/20 hover:translate-x-[3px]">
                <div className="w-10 h-10 rounded-[10px] shrink-0 bg-[#ffaa00]/[0.08] border border-[#ffaa00]/20 flex items-center justify-center text-lg">
                  <span role="img" aria-label="gift">🎁</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">Друг регистрируется и платит</div>
                  <div className="text-xs text-[#e8f0e8]/70 leading-[1.6] font-light">Когда приглашённый оплачивает подписку — вы получаете бонус.</div>
                </div>
              </div>

              {/* Connector */}
              <div className="w-px h-3 ml-[39px]" style={{ background: 'linear-gradient(to bottom, rgba(0,255,136,0.2), transparent)' }} />

              {/* Step 3 */}
              <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] p-5 flex items-start gap-4 transition-all hover:border-[#00ff88]/20 hover:translate-x-[3px]">
                <div className="w-10 h-10 rounded-[10px] shrink-0 bg-[#ffaa00]/[0.08] border border-[#ffaa00]/20 flex items-center justify-center text-lg font-bold text-[#ffaa00]">
                  &rarr;
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">Получите бонус на баланс</div>
                  <div className="text-xs text-[#e8f0e8]/70 leading-[1.6] font-light">Бонусы начисляются автоматически после каждого платежа.</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Conditions */}
            <div>
              <div className="font-mono text-[10px] font-bold text-white/45 tracking-[2px] uppercase mb-4">УСЛОВИЯ</div>

              {/* Level 1 */}
              <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] py-[18px] px-[22px] flex items-center gap-[18px] mb-3 transition-all hover:border-[#00ff88]/35">
                <div className="text-[22px] font-black text-[#00ff88] min-w-[52px] text-center shrink-0" style={{ fontFamily: "'Unbounded', sans-serif" }}>5%</div>
                <div className="w-px h-8 bg-white/[0.07] shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-white mb-[3px]">Уровень 1</div>
                  <div className="text-[11px] text-white/45 font-light">от платежей тех, кого пригласили вы</div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] py-[18px] px-[22px] flex items-center gap-[18px] mb-3 transition-all hover:border-[#00cfff]/35">
                <div className="text-[22px] font-black text-[#00cfff] min-w-[52px] text-center shrink-0" style={{ fontFamily: "'Unbounded', sans-serif" }}>3%</div>
                <div className="w-px h-8 bg-white/[0.07] shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-white mb-[3px]">Уровень 2</div>
                  <div className="text-[11px] text-white/45 font-light">от платежей приглашённых 2-го уровня</div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] py-[18px] px-[22px] flex items-center gap-[18px] mb-5 transition-all hover:border-white/12">
                <div className="text-[22px] font-black text-[#e8f0e8]/70 min-w-[52px] text-center shrink-0" style={{ fontFamily: "'Unbounded', sans-serif" }}>1%</div>
                <div className="w-px h-8 bg-white/[0.07] shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-white mb-[3px]">Уровень 3</div>
                  <div className="text-[11px] text-white/45 font-light">от платежей приглашённых 3-го уровня</div>
                </div>
              </div>

              {/* CTA Button */}
              {user ? (
                <Link
                  to="/dashboard"
                  className="block w-full text-center py-3.5 rounded-[11px] text-sm font-bold transition-all bg-[#ffaa00] text-[#1a0e00] hover:bg-[#ffc333] hover:-translate-y-px min-h-[48px] leading-[48px]"
                  style={{ boxShadow: '0 0 24px rgba(255,170,0,0.3)' }}
                >
                  Получить реферальную ссылку
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center py-3.5 rounded-[11px] text-sm font-bold transition-all bg-[#ffaa00] text-[#1a0e00] hover:bg-[#ffc333] hover:-translate-y-px min-h-[48px] leading-[48px]"
                  style={{ boxShadow: '0 0 24px rgba(255,170,0,0.3)' }}
                >
                  Войти, чтобы участвовать
                </Link>
              )}
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ReferralPage;
