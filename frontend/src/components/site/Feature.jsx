import { Quote } from "lucide-react";
import { useSite } from "../../content/site.config";

export const Feature = () => {
  const site = useSite();
  const img = site.feature?.image ||
    "https://customer-assets.emergentagent.com/job_impact-voice/artifacts/qtiemh4n_main.jpeg";
  const f = site.feature || {};
  return (
    <section
      data-testid="feature-section"
      className="relative bg-[#0A1128] text-white overflow-hidden"
    >
      <div className="absolute inset-0 grain opacity-25 pointer-events-none" />

      {/* Decorative giant background type */}
      <div
        aria-hidden
        className="absolute -top-6 left-0 right-0 font-display font-black tracking-tighter leading-none text-[18vw] lg:text-[14vw] text-white/[0.04] select-none whitespace-nowrap pointer-events-none"
      >
        {site.brand.name.toUpperCase()} · {site.brand.name.toUpperCase()}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-stretch">
        {/* Left — copy */}
        <div className="lg:col-span-6 py-20 lg:py-32 lg:pr-16 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#EA580C]" />
            <span className="font-display uppercase tracking-[0.25em] text-xs font-medium text-[#EA580C]">
              {f.eyebrow || "Vanakkam · A salute to every voter"}
            </span>
          </div>

          <Quote size={48} className="text-[#EA580C] mb-4" strokeWidth={1.5} />

          <blockquote className="font-serif-quote italic text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-white">
            {f.quote ||
              "I do not stand above the people. I stand with them, beside them, and for them — every single day."}
          </blockquote>

          <div className="mt-10 flex items-center gap-5">
            <div className="h-px w-12 bg-white/40" />
            <div>
              <div className="font-display font-bold text-lg">
                {f.author || site.brand.name}
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60 mt-1">
                {f.role || `Founder · ${site.brand.trustName}`}
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {(f.badges || [
              { value: "100%", label: "For the people" },
              { value: "0", label: "Hidden agenda" },
              { value: "24/7", label: "On the ground" },
            ]).map((b, i) => (
              <div key={i} className="border-l border-white/15 pl-4">
                <div className="font-display font-black text-2xl text-[#EA580C]">{b.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-1">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — full body portrait */}
        <div className="lg:col-span-6 relative min-h-[480px] lg:min-h-[760px]">
          {/* Warm cream + orange gradient slab behind cutout */}
          <div
            className="absolute inset-0 lg:-mr-10"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 30%, #FDFBF7 0%, #F5E9D6 40%, #EA580C 90%, #C2410C 100%)",
            }}
          />
          {/* Subtle diagonal stripes overlay */}
          <div
            aria-hidden
            className="absolute inset-0 lg:-mr-10 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #0A1128 0 2px, transparent 2px 18px)",
            }}
          />
          {/* The portrait */}
          <img
            src={img}
            alt="Kumaran M.A., Founder of AKR Social Welfare Trust & Former BJP Chennai West District General Secretary"
            data-testid="feature-portrait"
            loading="lazy"
            width="600"
            height="700"
            className="absolute inset-0 w-full h-full object-cover object-bottom lg:-mr-10"
            style={{ objectPosition: "center 30%" }}
          />
          {/* Bottom navy fade so figure grounds into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1128] to-transparent lg:-mr-10" />

          {/* Signature corner card */}
          <div className="absolute top-6 right-6 lg:right-16 bg-[#0A1128] border border-[#EA580C]/40 px-5 py-4 max-w-[200px]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C] mb-1">Est. 2009</div>
            <div className="font-display font-bold text-sm text-white leading-tight">
              {site.brand.trustName}
              <br />
              <span className="text-white/60 font-normal">A movement for the people.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
