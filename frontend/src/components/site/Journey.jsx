import { useSite } from "../../content/site.config";

export const Journey = () => {
  const site = useSite();
  const j = site.journey;
  return (
    <section id="journey" data-testid="journey-section" className="py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                {j.eyebrow}
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              {j.title}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">{j.description}</p>
            <img
              src={j.image}
              alt={`${site.brand.name} in conversation`}
              data-testid="about-portrait"
              className="mt-8 w-full rounded-xl shadow-md object-contain"
              style={{ display: "block", maxHeight: "600px", objectPosition: "center top" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="border-t border-[#0A1128]/10">
          {(j.milestones || []).map((m, idx) => (
            <div
              key={`${m.year}-${idx}`}
              data-testid={`timeline-item-${idx}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-[#0A1128]/10 group hover:bg-white transition-colors"
            >
              <div className="md:col-span-2">
                <div className="font-display font-black text-3xl text-[#0A1128] group-hover:text-[#EA580C] transition-colors">
                  {m.year}
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display font-semibold text-xl text-[#0A1128] leading-snug">
                  {m.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-[#4B5563] leading-relaxed">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
