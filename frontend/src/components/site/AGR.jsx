import { useEffect, useState } from "react";
import { Heart, ArrowUpRight } from "lucide-react";

const IMG_1 = "https://images.unsplash.com/photo-1497486751825-1233686d5d80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwyfHxpbmRpYSUyMGNoYXJpdHklMjBuZ28lMjBzb2NpYWwlMjB3b3JrfGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85";
const IMG_2 = "https://images.unsplash.com/photo-1692609659165-1ec4d8108c0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwzfHxpbmRpYSUyMGNoYXJpdHklMjBuZ28lMjBzb2NpYWwlMjB3b3JrfGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85";
const IMG_3 = "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGNoYXJpdHklMjBuZ28lMjBzb2NpYWwlMjB3b3JrfGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85";

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
  return (
    <section id="agr" data-testid="agr-section" className="py-24 lg:py-32 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                03 — AGR NGO Trust
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              Transforming lives,{" "}
              <span className="font-serif-quote italic font-medium text-[#EA580C]">one village</span> at a time.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Founded in 2009, AGR Trust is a non-political grassroots
              organisation dedicated to education, healthcare and women
              empowerment. Powered by 2,400+ volunteers — funded entirely by
              individual donors.
            </p>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Stat value={52000} suffix="+" label="Lives impacted" testId="stat-lives" />
          <Stat value={184} label="Villages reached" testId="stat-villages" />
          <Stat value={36} label="Schools supported" testId="stat-schools" />
          <Stat value={2400} suffix="+" label="Active volunteers" testId="stat-volunteers" />
        </div>

        {/* Bento gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          <div className="md:col-span-7 relative overflow-hidden group">
            <img src={IMG_1} alt="Children at AGR programme" data-testid="agr-img-1" className="w-full h-[300px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C]">Education</div>
              <div className="font-display text-xl font-semibold mt-1">Sponsoring 12,400 students across 36 schools</div>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-4 lg:gap-6">
            <div className="relative overflow-hidden group">
              <img src={IMG_2} alt="AGR community work" data-testid="agr-img-2" className="w-full h-[230px] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C]">Women</div>
                <div className="font-display text-sm font-semibold mt-1">1,800+ women in self-help groups</div>
              </div>
            </div>
            <div className="relative overflow-hidden group">
              <img src={IMG_3} alt="AGR community event" data-testid="agr-img-3" className="w-full h-[230px] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#EA580C]">Healthcare</div>
                <div className="font-display text-sm font-semibold mt-1">112 free medical camps last year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
