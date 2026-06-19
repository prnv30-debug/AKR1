import {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Sprout,
  Users,
  Building2,
  Leaf,
  Shield,
  Home,
  BookOpen,
} from "lucide-react";
import { site } from "../../content/site.config";

const ICONS = {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Sprout,
  Users,
  Building2,
  Leaf,
  Shield,
  Home,
  BookOpen,
};

export const Vision = () => {
  const v = site.vision;
  return (
    <section id="vision" data-testid="vision-section" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                {v.eyebrow}
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              {v.title[0]}
              <br />
              {v.title[1]}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <blockquote className="font-serif-quote italic text-2xl lg:text-3xl text-[#0A1128] leading-snug border-l-2 border-[#EA580C] pl-6">
              &ldquo;{v.quote}&rdquo;
              <footer className="not-italic font-body text-sm uppercase tracking-[0.2em] text-[#4B5563] mt-4">
                — {v.quoteAuthor}
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A1128]/10 border border-[#0A1128]/10">
          {v.pillars.map((p, idx) => {
            const Icon = ICONS[p.icon] || GraduationCap;
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
                    {String(idx + 1).padStart(2, "0")}
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
