import { GraduationCap, HeartPulse, Briefcase, Sprout, Users, Building2 } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "Education for every child",
    body: "Modern classrooms, English-medium options, and scholarships for every deserving student across rural India.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare at the doorstep",
    body: "Mobile clinics, free diagnostics, and dignified maternal care delivered to every village.",
  },
  {
    icon: Briefcase,
    title: "Jobs & livelihoods",
    body: "Skill centres, MSME credit access, and entrepreneurship grants for youth and women.",
  },
  {
    icon: Sprout,
    title: "Sustainable farming",
    body: "Fair prices, water security and modern techniques to make agriculture profitable again.",
  },
  {
    icon: Users,
    title: "Women & safety",
    body: "Stronger laws, self-defence training, and microfinance circles to put power in women&apos;s hands.",
  },
  {
    icon: Building2,
    title: "Infrastructure that lasts",
    body: "All-weather roads, clean drinking water, and digital connectivity for every panchayat.",
  },
];

export const Vision = () => {
  return (
    <section id="vision" data-testid="vision-section" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                02 — Vision & Manifesto
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              Six promises.
              <br />
              Written with the people, for the people.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <blockquote className="font-serif-quote italic text-2xl lg:text-3xl text-[#0A1128] leading-snug border-l-2 border-[#EA580C] pl-6">
              &ldquo;A manifesto is not a list. It is a contract — signed in trust,
              redeemed in action.&rdquo;
              <footer className="not-italic font-body text-sm uppercase tracking-[0.2em] text-[#4B5563] mt-4">
                — Kumaran
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A1128]/10 border border-[#0A1128]/10">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-testid={`vision-pillar-${idx}`}
                className="bg-white p-8 lg:p-10 group hover:bg-[#FDFBF7] transition-colors"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 bg-[#0A1128] text-white flex items-center justify-center group-hover:bg-[#EA580C] transition-colors">
                    <Icon size={22} />
                  </div>
                  <span className="font-display text-xs uppercase tracking-[0.2em] text-[#4B5563]">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl text-[#0A1128] mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
