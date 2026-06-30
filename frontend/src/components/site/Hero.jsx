import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSite, useLang } from "../../content/site.config";

export const Hero = () => {
  const site = useSite();
  const { lang } = useLang();
  const isTa = lang === "ta";
  const h = site.hero;
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
        {/* Left */}
        <div className="lg:col-span-7 fade-up order-2 lg:order-1">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full shadow-sm border border-[#0A1128]/5 p-0.5">
              <img
                src="/akr_logo.jpg"
                alt="AKR Social Welfare Trust Logo - Chennai Tamil Nadu"
                width="48"
                height="48"
                loading="eager"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="h-px w-8 bg-[#EA580C]/30" />
            <span className="font-display uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-black text-[#EA580C]">
              AKR SOCIAL WELFARE TRUST
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="h-px w-10 bg-[#0A1128]/25" />
            <span className="font-display uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold text-[#0A1128]/80 break-words">
              {site.brand.tagline}
            </span>
          </div>

          <h1 className="font-display font-black tracking-tighter text-[#0A1128] text-3xl xs:text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.08] sm:leading-[0.95] break-words">
            {h.headlineLine1}
            <br />
            {h.headlineLine2Prefix}{" "}
            <span className="font-serif-quote italic font-medium text-[#EA580C]">
              {h.headlineItalic}
            </span>
            <br />
            {h.headlineLine3}
          </h1>

          <p className="mt-6 sm:mt-8 max-w-xl text-[#4B5563] text-sm sm:text-lg leading-relaxed break-words">
            {h.description}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={h.primaryCta.href}
              data-testid="hero-cta-volunteer"
              className="group inline-flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition-all w-full xs:w-auto"
            >
              {h.primaryCta.label}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
            <a
              href={h.secondaryCta.href}
              data-testid="hero-cta-journey"
              className="inline-flex items-center justify-center gap-2 border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition-all w-full xs:w-auto"
            >
              {h.secondaryCta.label}
              <ArrowUpRight size={18} className="shrink-0" />
            </a>
          </div>

          <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg border-t border-[#0A1128]/10 pt-6">
            {h.stats.map((s, i) => {
              const m = String(s.value).match(/^(.*?)([+]?)$/);
              const num = m ? m[1] : s.value;
              const suf = m ? m[2] : "";
              return (
                <div key={i}>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#0A1128]">
                    {num}
                    {suf && <span className="text-[#EA580C]">{suf}</span>}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#4B5563] mt-1 break-words">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - portrait & badge */}
        <div className="lg:col-span-5 fade-up order-1 lg:order-2" style={{ animationDelay: "120ms" }}>
          {/* Main Portrait Frame */}
          <div className="relative w-full h-[380px] xs:h-[440px] sm:h-[540px] lg:h-[600px] max-h-[78vh] sm:max-h-none rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(10,17,40,0.18)] border border-[#0A1128]/10 bg-[#FDFBF7]">
            <img
              src={h.image}
              alt="Kumaran M.A., Founder of AKR Social Welfare Trust"
              data-testid="hero-portrait"
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center top" }}
            />

            {/* Subtle bottom gradient just behind the glass card */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/30 to-transparent pointer-events-none" />

            {/* Floating Glassmorphism Founder Card */}
            <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6 bg-[#0A1128]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EA580C] shrink-0" />
                    <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#EA580C] truncate">
                      {isTa ? "நிறுவனர் & தலைவர்" : "FOUNDER & CHAIRMAN"}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-white text-xl xs:text-2xl sm:text-3xl tracking-tight uppercase leading-none truncate">
                    {isTa ? "குமரன் M.A." : "KUMARAN M.A."}
                  </h3>
                  <p className="font-display text-[10px] sm:text-xs text-white/75 tracking-wider uppercase mt-1 truncate">
                    {site.brand.trustName}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-center shrink-0 border-l border-white/15 pl-3 sm:pl-5">
                  <span className="text-xs sm:text-xl font-black text-[#EA580C] font-display uppercase tracking-wider">Est.</span>
                  <span className="text-lg sm:text-2xl font-black text-white font-display leading-none">2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Organized Manifesto Quote Card */}
          <div className="mt-4 sm:mt-6 bg-white rounded-2xl p-5 sm:p-7 border border-[#0A1128]/10 shadow-sm flex items-start gap-3 sm:gap-5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#EA580C]/10 flex items-center justify-center text-[#EA580C] font-serif font-bold text-xl sm:text-2xl shrink-0 mt-0.5">
              &ldquo;
            </div>
            <div>
              <div className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#EA580C] mb-1 sm:mb-1.5">
                {h.manifestoLabel}
              </div>
              <p className="font-serif-quote italic text-base sm:text-xl text-[#0A1128]/95 leading-snug">
                {h.manifestoQuote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-20 border-y border-[#0A1128]/10 overflow-hidden bg-white">
        <div className="flex whitespace-nowrap animate-ticker py-4">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center">
              {h.ticker.map((t, i) => (
                <span key={`${k}-${i}`} className="font-display uppercase tracking-[0.25em] text-sm text-[#0A1128] px-10 flex items-center gap-10">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-[#EA580C] inline-block" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
