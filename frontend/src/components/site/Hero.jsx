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
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
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
            <span className="font-display uppercase tracking-[0.25em] text-[11px] font-black text-[#EA580C]">
              AKR SOCIAL WELFARE TRUST
            </span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[#0A1128]/25" />
            <span className="font-display uppercase tracking-[0.2em] text-xs font-semibold text-[#0A1128]/80">
              {site.brand.tagline}
            </span>
          </div>

          <h1 className="font-display font-black tracking-tighter text-[#0A1128] text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95]">
            {h.headlineLine1}
            <br />
            {h.headlineLine2Prefix}{" "}
            <span className="font-serif-quote italic font-medium text-[#EA580C]">
              {h.headlineItalic}
            </span>
            <br />
            {h.headlineLine3}
          </h1>

          <p className="mt-8 max-w-xl text-[#4B5563] text-base sm:text-lg leading-relaxed">
            {h.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={h.primaryCta.href}
              data-testid="hero-cta-volunteer"
              className="group inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-7 py-3.5 font-semibold transition-all"
            >
              {h.primaryCta.label}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={h.secondaryCta.href}
              data-testid="hero-cta-journey"
              className="inline-flex items-center gap-2 border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white px-7 py-3.5 font-semibold transition-all"
            >
              {h.secondaryCta.label}
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg border-t border-[#0A1128]/10 pt-6">
            {h.stats.map((s, i) => {
              const m = String(s.value).match(/^(.*?)([+]?)$/);
              const num = m ? m[1] : s.value;
              const suf = m ? m[2] : "";
              return (
                <div key={i}>
                  <div className="font-display font-black text-3xl text-[#0A1128]">
                    {num}
                    {suf && <span className="text-[#EA580C]">{suf}</span>}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#4B5563] mt-1">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - portrait */}
        <div className="lg:col-span-5 fade-up order-1 lg:order-2" style={{ animationDelay: "120ms" }}>
          <div className="relative" style={{ overflow: "visible" }}>
            <div
              aria-hidden
              className="hidden md:block absolute pointer-events-none border border-[#0A1128]/70"
              style={{ top: "16px", left: "16px", right: "-16px", bottom: "-16px", zIndex: 0 }}
            />
            <div
              className="relative w-full h-[460px] sm:h-[560px] lg:h-[640px] overflow-hidden"
              style={{
                zIndex: 1,
                background:
                  "linear-gradient(180deg, #FDFBF7 0%, #F5E9D6 55%, #EA580C 100%)",
              }}
            >
              <img
                src={h.image}
                alt="Kumaran M.A., Founder of AKR Social Welfare Trust"
                data-testid="hero-portrait"
                loading="eager"
                fetchPriority="high"
                width="640"
                height="640"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/30 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 bg-[#0A1128] text-white p-5 lg:p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C] mb-2">{h.manifestoLabel}</div>
                <p className="font-serif-quote italic text-lg lg:text-xl leading-snug">
                  &ldquo;{h.manifestoQuote}&rdquo;
                </p>
              </div>
            </div>

            {/* Bold Founder & Chairman Badge */}
            <div
              className="relative z-10 mt-3 sm:mt-4 bg-[#0A1128] border-2 border-[#EA580C] px-5 py-4 shadow-xl flex items-center justify-between gap-4 transition-all duration-300 hover:border-[#EA580C]/80 group"
              style={{ zIndex: 2 }}
            >
              <div>
                <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-tight uppercase group-hover:text-[#EA580C] transition-colors">
                  {isTa ? "குமரன் M.A." : "KUMARAN M.A."}
                </h3>
                <p className="font-display font-bold text-[#EA580C] text-xs sm:text-sm uppercase tracking-[0.15em] mt-1">
                  {isTa ? "ஏ.கே.ஆர் அறக்கட்டளை நிறுவனர் & தலைவர்" : "FOUNDER & CHAIRMAN OF AKR TRUST"}
                </p>
              </div>
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#EA580C]/15 border border-[#EA580C]/40 text-[#EA580C] font-black text-sm shrink-0">
                ★
              </div>
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
