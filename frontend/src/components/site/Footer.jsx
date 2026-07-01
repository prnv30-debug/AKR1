import { Mail, MapPin, Phone } from "lucide-react";
import { useSite } from "../../content/site.config";

const XFooterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 shrink-0 fill-white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const YoutubeFooterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 shrink-0">
    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"></path>
    <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
  </svg>
);

const InstaFooterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 shrink-0">
    <defs>
      <linearGradient id="footerInstaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#footerInstaGrad)" />
    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#fff" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="#fff" strokeWidth="1.8" />
  </svg>
);

const FbFooterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 shrink-0">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path fill="#FFFFFF" d="M15.117 12.001l.432-2.818h-2.705V7.351c0-.773.376-1.526 1.591-1.526h1.231V3.429C14.593 3.287 13.626 3.2 12.551 3.2c-3.176 0-5.26 1.921-5.26 5.419v3.382H4.808v2.818h2.483v6.809c.895.141 1.81.215 2.744.215.882 0 1.748-.069 2.595-.198v-6.826h2.487z" />
  </svg>
);

const ICONS = { Facebook: FbFooterIcon, Twitter: XFooterIcon, Instagram: InstaFooterIcon, Youtube: YoutubeFooterIcon };

export const Footer = () => {
  const site = useSite();
  const f = site.footer;
  return (
    <footer data-testid="site-footer" className="bg-[#0A1128] text-white overflow-hidden relative w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-10 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mb-12 sm:mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full overflow-hidden p-0.5 border border-white/20 shadow-sm shrink-0">
                <img
                  src="/akr_logo.jpg"
                  alt="AKR Social Welfare Trust Logo - Chennai Tamil Nadu"
                  width="48"
                  height="48"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="min-w-0">
                <div className="font-display font-black tracking-wider text-white text-sm sm:text-base break-words">
                  AKR SOCIAL WELFARE TRUST
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Registered Trust
                </div>
              </div>
            </div>
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">{f.officeLabel || "Office"}</div>
            <div className="flex items-start gap-3 text-white/80 mb-3 text-sm sm:text-base">
              <MapPin size={16} className="mt-1 shrink-0" />
              <span className="break-words">
                {f.address.map((l, i) => (
                  <span key={i}>
                    {l}
                    {i < f.address.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/80 text-sm sm:text-base">
              <Mail size={16} className="shrink-0" />
              <a href={`mailto:${f.email}`} className="hover:text-[#EA580C] transition-colors break-all">
                {f.email}
              </a>
            </div>
            {f.phone && (
              <div className="flex items-center gap-3 text-white/80 mt-3 text-sm sm:text-base">
                <Phone size={16} className="shrink-0" />
                <a href={`tel:${f.phone}`} className="hover:text-[#EA580C] transition-colors">
                  {f.phone}
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">{f.exploreLabel || "Explore"}</div>
            <ul className="space-y-2 text-white/80 text-sm sm:text-base">
              {site.nav.links.map((l, i) => (
                <li key={`${l.href}-${i}`}>
                  <a href={l.href} className="hover:text-[#EA580C] transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">{f.followLabel || "Follow"}</div>
            <div className="flex gap-3 flex-wrap">
              {f.social.map((s) => {
                const Icon = ICONS[s.icon] || ICONS.Facebook;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`social-${s.label}`}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#EA580C] hover:border-[#EA580C] transition-all rounded-lg shrink-0"
                    aria-label={s.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Massive name */}
        <div className="border-t border-white/10 pt-8 sm:pt-10 w-full overflow-hidden">
          <div
            data-testid="footer-name-lockup"
            className="font-display font-black tracking-tight sm:tracking-tighter leading-none text-[12.5vw] sm:text-[13vw] lg:text-[12vw] text-white/95 select-none w-full break-words text-center sm:text-left"
          >
            {site.brand.name.toUpperCase()}<span className="text-[#EA580C]">{site.brand.accent}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between gap-4 text-xs uppercase tracking-[0.2em] text-white/50">
          <div className="flex flex-wrap gap-4 items-center">
            <span>© {new Date().getFullYear()} {site.brand.name} · {site.brand.trustName}. {f.rights}</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <span>{f.designedBy}</span>
        </div>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AKR Social Welfare Trust",
            "image": "https://akrtrust.org/og-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "457, 1st Main Road, MMDA, Manali Mathur",
              "addressLocality": "Chennai",
              "addressRegion": "TN",
              "postalCode": "600068",
              "addressCountry": "IN"
            },
            "telephone": f.phone || "+91 94440 12345",
            "email": f.email || "akrsocialwelfaretrust@gmail.com",
            "url": "https://akrtrust.org",
            "openingHours": "Mo-Sa 09:00-18:00"
          })}
        </script>
      </div>
    </footer>
  );
};
