import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";

export const SocialLinks = () => {
  const cards = [
    {
      platform: "X (Twitter)",
      handle: "@kumaran__bjp",
      desc: "Latest news, political updates and announcements in real time.",
      url: "https://x.com/kumaran__bjp",
      btn: "Follow on X",
      icon: Twitter,
    },
    {
      platform: "Instagram",
      handle: "@madhavaram_kumaran_ma",
      desc: "Photos, reels and highlights from events and community work.",
      url: "https://www.instagram.com/madhavaram_kumaran_ma/?hl=en",
      btn: "Follow on Instagram",
      icon: Instagram,
    },
    {
      platform: "Facebook",
      handle: "AKR Trust Official",
      desc: "Detailed posts, event coverage and community discussions.",
      url: "https://www.facebook.com/profile.php?id=61584917536840",
      btn: "Follow on Facebook",
      icon: Facebook,
    },
    {
      platform: "YouTube",
      handle: "@akrtrust3129",
      desc: "Speeches, interviews, trust activities and event recordings.",
      url: "https://www.youtube.com/@akrtrust3129",
      btn: "Subscribe on YouTube",
      icon: Youtube,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className="border border-[#0A1128]/10 bg-white p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FDFBF7] text-[#EA580C] rounded-full group-hover:scale-110 transition-transform">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#0A1128]">{c.platform}</h3>
                <p className="text-sm font-semibold text-[#EA580C] tracking-wide">{c.handle}</p>
              </div>
            </div>
            <p className="text-[#4B5563] mb-8 leading-relaxed flex-1">{c.desc}</p>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center w-full bg-[#0A1128] hover:bg-[#EA580C] text-white py-3.5 font-semibold transition-all">
              {c.btn}
            </a>
          </div>
        );
      })}
    </div>
  );
};
