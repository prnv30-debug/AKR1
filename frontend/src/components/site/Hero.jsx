import { ArrowRight, ArrowUpRight } from "lucide-react";

const HERO_IMG =
  "https://customer-assets.emergentagent.com/job_impact-voice/artifacts/htnjn8mo_hero.jpeg";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        {/* Left */}
        <div className="lg:col-span-7 fade-up">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[#0A1128]" />
            <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#0A1128]">
              People&apos;s Leader · Public Servant
            </span>
          </div>

          <h1 className="font-display font-black tracking-tighter text-[#0A1128] text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95]">
            A vision for
            <br />
            tomorrow.{" "}
            <span className="font-serif-quote italic font-medium text-[#EA580C]">
              Rooted
            </span>
            <br />
            in the people.
          </h1>

          <p className="mt-8 max-w-xl text-[#4B5563] text-base sm:text-lg leading-relaxed">
            Kumaran — a tireless voice for the under-served, founder of the AGR
            Trust, and a leader committed to dignity, opportunity and progress
            for every household.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#volunteer"
              data-testid="hero-cta-volunteer"
              className="group inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-7 py-3.5 font-semibold transition-all"
            >
              Join the Movement
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#journey"
              data-testid="hero-cta-journey"
              className="inline-flex items-center gap-2 border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white px-7 py-3.5 font-semibold transition-all"
            >
              Read the Journey
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg border-t border-[#0A1128]/10 pt-6">
            <div>
              <div className="font-display font-black text-3xl text-[#0A1128]">22<span className="text-[#EA580C]">+</span></div>
              <div className="text-xs uppercase tracking-widest text-[#4B5563] mt-1">Years of service</div>
            </div>
            <div>
              <div className="font-display font-black text-3xl text-[#0A1128]">184</div>
              <div className="text-xs uppercase tracking-widest text-[#4B5563] mt-1">Villages reached</div>
            </div>
            <div>
              <div className="font-display font-black text-3xl text-[#0A1128]">52K<span className="text-[#EA580C]">+</span></div>
              <div className="text-xs uppercase tracking-widest text-[#4B5563] mt-1">Lives impacted</div>
            </div>
          </div>
        </div>

        {/* Right - portrait */}
        <div className="lg:col-span-5 fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative">
            <div className="absolute -top-4 -left-4 right-8 bottom-8 border border-[#0A1128] -z-0" />
            <div
              className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, #FDFBF7 0%, #F5E9D6 60%, #EA580C 100%)",
              }}
            >
              <img
                src={HERO_IMG}
                alt="Kumaran portrait"
                data-testid="hero-portrait"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/55 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 lg:right-12 bg-[#0A1128] text-white p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C] mb-2">Manifesto, 2026</div>
              <p className="font-serif-quote italic text-lg lg:text-xl leading-snug">
                &ldquo;Service is not a season. It is a way of life.&rdquo;
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
              {[
                "Education for every child",
                "Healthcare at the doorstep",
                "Skills · Jobs · Dignity",
                "Clean water for every village",
                "Empowering women entrepreneurs",
                "Sustainable agriculture",
              ].map((t, i) => (
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
