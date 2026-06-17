import { Calendar, MapPin, ArrowUpRight } from "lucide-react";

const IMG_R1 = "https://images.unsplash.com/photo-1715351151262-6b1e1cee2318?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBjcm93ZCUyMHB1YmxpYyUyMHJhbGx5fGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85";
const IMG_R2 = "https://images.unsplash.com/photo-1713001075225-8c490e800e29?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8NjA2MjJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcm93ZCUyMHB1YmxpYyUyMHJhbGx5fGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85";

const events = [
  {
    img: IMG_R1,
    date: "Dec 22, 2025",
    location: "Madurai Town Hall",
    title: "Youth & Jobs — Open Town Hall",
    desc: "An open dialogue with first-time voters, entrepreneurs and college students on skills, startups and the road ahead.",
    tag: "Town Hall",
  },
  {
    img: IMG_R2,
    date: "Jan 08, 2026",
    location: "Trichy District Ground",
    title: "Vision 2030 — Public Address",
    desc: "Launching the 10-year roadmap for education, agriculture and women-led entrepreneurship in the region.",
    tag: "Rally",
  },
  {
    img: IMG_R1,
    date: "Jan 26, 2026",
    location: "Pondicherry Beach Promenade",
    title: "Republic Day Yatra",
    desc: "A coastal march for unity, dignity and the dreams of a new India — joined by AGR Trust volunteers and youth groups.",
    tag: "Yatra",
  },
];

export const Events = () => {
  return (
    <section id="events" data-testid="events-section" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                04 — Events & Campaign
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              On the road. Meet us next.
            </h2>
          </div>
          <a
            href="#involved"
            data-testid="events-cta"
            className="self-start inline-flex items-center gap-2 border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white px-6 py-3 font-semibold transition-all"
          >
            Host us in your town
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((e, idx) => (
            <article
              key={idx}
              data-testid={`event-card-${idx}`}
              className="border border-[#0A1128]/10 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={e.img} alt={e.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-white text-[#0A1128] text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5">
                  {e.tag}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-4 text-xs text-[#4B5563] uppercase tracking-[0.15em] mb-4">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {e.date}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {e.location}</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-[#0A1128] mb-3 leading-snug">
                  {e.title}
                </h3>
                <p className="text-[#4B5563] text-sm leading-relaxed flex-1">{e.desc}</p>
                <a href="#involved" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#EA580C] hover:gap-2 transition-all">
                  RSVP <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
