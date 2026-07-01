const XBrandIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 shrink-0 fill-[#000000]">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const YoutubeBrandIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 shrink-0">
    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"></path>
    <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
  </svg>
);

const InstaBrandIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 shrink-0">
    <defs>
      <linearGradient id="socialInstaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#socialInstaGrad)" />
    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#fff" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="#fff" strokeWidth="1.8" />
  </svg>
);

const FbBrandIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 shrink-0">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path fill="#FFFFFF" d="M15.117 12.001l.432-2.818h-2.705V7.351c0-.773.376-1.526 1.591-1.526h1.231V3.429C14.593 3.287 13.626 3.2 12.551 3.2c-3.176 0-5.26 1.921-5.26 5.419v3.382H4.808v2.818h2.483v6.809c.895.141 1.81.215 2.744.215.882 0 1.748-.069 2.595-.198v-6.826h2.487z" />
  </svg>
);

export const SocialLinks = () => {
  const cards = [
    {
      platform: "X (Twitter)",
      handle: "@kumaran__bjp",
      desc: "Latest news, political updates and announcements in real time.",
      url: "https://x.com/kumaran__bjp",
      btn: "Follow on X",
      icon: XBrandIcon,
    },
    {
      platform: "Instagram",
      handle: "@madhavaram_kumaran_ma",
      desc: "Photos, reels and highlights from events and community work.",
      url: "https://www.instagram.com/madhavaram_kumaran_ma/?hl=en",
      btn: "Follow on Instagram",
      icon: InstaBrandIcon,
    },
    {
      platform: "Facebook",
      handle: "AKR Trust Official",
      desc: "Detailed posts, event coverage and community discussions.",
      url: "https://www.facebook.com/profile.php?id=61584917536840",
      btn: "Follow on Facebook",
      icon: FbBrandIcon,
    },
    {
      platform: "YouTube",
      handle: "@akrtrust3129",
      desc: "Speeches, interviews, trust activities and event recordings.",
      url: "https://www.youtube.com/@akrtrust3129",
      btn: "Subscribe on YouTube",
      icon: YoutubeBrandIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className="border border-[#0A1128]/10 bg-white p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FDFBF7] rounded-full group-hover:scale-110 transition-transform shadow-sm border border-[#0A1128]/5">
                <Icon />
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
