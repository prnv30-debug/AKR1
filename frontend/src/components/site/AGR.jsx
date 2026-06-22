import { useEffect, useState } from "react";
import { Heart, ArrowUpRight, Mail, BadgeCheck } from "lucide-react";
import { useSite } from "../../content/site.config";

const useCounter = (target, duration = 1500) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
};

const Stat = ({ value, suffix = "", label, testId }) => {
  const n = useCounter(value);
  return (
    <div data-testid={testId} className="border-t border-[#0A1128]/15 pt-5">
      <div className="font-display font-black tracking-tighter text-5xl lg:text-6xl text-[#0A1128]">
        {n.toLocaleString()}
        <span className="text-[#EA580C]">{suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.25em] text-[#4B5563]">{label}</div>
    </div>
  );
};

export const AGR = () => {
  const site = useSite();
  const a = site.agr;
  return (
    <section id="agr" data-testid="agr-section" className="py-24 lg:py-32 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                {a.eyebrow}
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              {a.titleLine1}{" "}
              <span className="font-serif-quote italic font-medium text-[#EA580C]">{a.titleItalic}</span> {a.titleLine2}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[#4B5563] text-lg leading-relaxed">{a.description}</p>
            <a
              href="#donate"
              data-testid="agr-donate-btn"
              className="mt-8 inline-flex items-center gap-2 bg-[#0A1128] hover:bg-[#EA580C] text-white px-7 py-3.5 font-semibold transition-all group"
            >
              <Heart size={18} />
              Support the Trust
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {a.stats.map((s, i) => (
            <Stat key={i} value={s.value} suffix={s.suffix} label={s.label} testId={`agr-stat-${i}`} />
          ))}
        </div>

        {/* Beneficiary Badge + mailto */}
        {a.beneficiaries && (
          <a
            href="https://wa.me/919444389777"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="agr-beneficiary-mail"
            className="group relative block mb-20 bg-[#0A1128] text-white overflow-hidden hover:bg-[#0A1128]/95 transition-colors"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, #ffffff 0 2px, transparent 2px 18px)",
              }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 p-7 lg:p-10 items-center">
              <div className="md:col-span-1 flex md:justify-center">
                <div className="w-12 h-12 bg-[#EA580C] text-white flex items-center justify-center">
                  <BadgeCheck size={24} />
                </div>
              </div>
              <div className="md:col-span-7">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C] mb-2">
                  {a.beneficiaries.label}
                </div>
                <div className="font-display font-black tracking-tighter text-2xl lg:text-3xl">
                  {a.beneficiaries.range}
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Verified, registered beneficiaries across education, healthcare &amp; livelihood programmes.
                </div>
              </div>
              <div className="md:col-span-4 md:text-right">
                <span className="inline-flex items-center gap-2 bg-white text-[#0A1128] group-hover:bg-[#EA580C] group-hover:text-white px-5 py-3 font-semibold transition-all">
                  <Mail size={16} />
                  {a.beneficiaries.ctaLabel}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <div className="mt-2 text-[11px] text-white/50 tracking-wider">
                  {a.beneficiaries.email}
                </div>
              </div>
            </div>
          </a>
        )}

        {/* Bento gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          <div className="md:col-span-7 relative overflow-hidden group">
            <img src={a.gallery.large.image} alt={a.gallery.large.label} data-testid="agr-img-1" className="w-full h-[300px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C]">{a.gallery.large.label}</div>
              <div className="font-display text-xl font-semibold mt-1">{a.gallery.large.caption}</div>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-4 lg:gap-6">
            {[a.gallery.small1, a.gallery.small2].map((g, i) => (
              <div key={i} className="relative overflow-hidden group">
                <img src={g.image} alt={g.label} data-testid={`agr-img-${i + 2}`} className="w-full h-[230px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C]">{g.label}</div>
                  <div className="font-display text-sm font-semibold mt-1">{g.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
