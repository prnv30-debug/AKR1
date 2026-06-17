const ABOUT_IMG =
  "https://images.unsplash.com/photo-1618306842557-a2515acf2112?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMGxlYWRlcnxlbnwwfHx8fDE3ODE3MDk0MTV8MA&ixlib=rb-4.1.0&q=85";

const milestones = [
  {
    year: "1978",
    title: "Born in a small farming village",
    body: "Growing up in a household of teachers and farmers, Kumaran learned the meaning of community and shared sacrifice early on.",
  },
  {
    year: "2001",
    title: "First grassroots campaign",
    body: "Organised a clean-water initiative across 14 villages, mobilising youth volunteers and local administration to deliver lasting infrastructure.",
  },
  {
    year: "2009",
    title: "Founded the AGR Trust",
    body: "A non-political NGO focused on education, women empowerment and rural healthcare — now active across 184 villages.",
  },
  {
    year: "2014",
    title: "Elected representative",
    body: "Won a landslide constituency mandate. Championed legislation on rural schooling, MSME credit access and women safety.",
  },
  {
    year: "2020",
    title: "Pandemic response",
    body: "Coordinated relief for over 200,000 families, delivering rations, oxygen and emergency medical aid through the AGR network.",
  },
  {
    year: "Today",
    title: "Building a brighter tomorrow",
    body: "Leading a renewed campaign focused on jobs, education and dignity — written and shaped by the people themselves.",
  },
];

export const Journey = () => {
  return (
    <section id="journey" data-testid="journey-section" className="py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EA580C]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs font-medium text-[#EA580C]">
                01 — The Journey
              </span>
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-[#0A1128] leading-[1.05]">
              From a farming village to the people&apos;s benches.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Four decades of public service — built quietly, brick by brick — across
              classrooms, panchayats, hospitals and parliament floors.
            </p>
            <img
              src={ABOUT_IMG}
              alt="Kumaran in conversation"
              data-testid="about-portrait"
              className="mt-8 w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="border-t border-[#0A1128]/10">
          {milestones.map((m, idx) => (
            <div
              key={m.year}
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
