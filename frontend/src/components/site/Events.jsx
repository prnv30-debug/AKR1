import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { useSite } from "../../content/site.config";

export const Events = () => {
  const site = useSite();
  const e = site.events;
  return (
    <section id="events" data-testid="events-section" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                {e.eyebrow}
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              {e.title}
            </h2>
          </div>
          <a
            href={e.ctaHref}
            data-testid="events-cta"
            className="self-start inline-flex items-center gap-2 border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white px-6 py-3 font-semibold transition-all"
          >
            {e.ctaLabel}
            <ArrowUpRight size={16} />
          </a>
        </div>

        {!e.items || e.items.length === 0 ? (
          <div className="py-12 text-center border border-[#0A1128]/10 bg-[#FDFBF7]">
            <p className="text-[#4B5563] text-lg">No upcoming events at this time. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {e.items.map((ev, idx) => (
              <article
                key={idx}
                data-testid={`event-card-${idx}`}
                className="border border-[#0A1128]/10 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute top-4 left-4 bg-white text-[#0A1128] text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5">
                    {ev.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-4 text-xs text-[#4B5563] uppercase tracking-[0.15em] mb-4">
                    <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {ev.date}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {ev.location}</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-[#0A1128] mb-3 leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed flex-1">{ev.desc}</p>
                  <a href="https://wa.me/918925847185" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#EA580C] hover:gap-2 transition-all">
                    RSVP <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
