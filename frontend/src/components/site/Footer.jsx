import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin } from "lucide-react";
import { useSite } from "../../content/site.config";

const ICONS = { Facebook, Twitter, Instagram, Youtube, Linkedin };

export const Footer = () => {
  const site = useSite();
  const f = site.footer;
  return (
    <footer data-testid="site-footer" className="bg-[#0A1128] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full overflow-hidden p-0.5 border border-white/20 shadow-sm">
                <img
                  src="/akr_logo.jpg"
                  alt="AKR Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <div className="font-display font-black tracking-wider text-white text-base">
                  AKR SOCIAL WELFARE TRUST
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Registered Trust
                </div>
              </div>
            </div>
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">{f.officeLabel || "Office"}</div>
            <div className="flex items-start gap-3 text-white/80 mb-3">
              <MapPin size={16} className="mt-1 shrink-0" />
              <span>
                {f.address.map((l, i) => (
                  <span key={i}>
                    {l}
                    {i < f.address.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Mail size={16} />
              <a href={`mailto:${f.email}`} className="hover:text-[#EA580C] transition-colors">
                {f.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">{f.exploreLabel || "Explore"}</div>
            <ul className="space-y-2 text-white/80">
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
                const Icon = ICONS[s.icon] || Facebook;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`social-${s.label}`}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#EA580C] hover:border-[#EA580C] transition-all"
                    aria-label={s.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Massive name */}
        <div className="border-t border-white/10 pt-10">
          <div
            data-testid="footer-name-lockup"
            className="font-display font-black tracking-tighter leading-none text-[20vw] lg:text-[14vw] text-white/95 select-none"
          >
            {site.brand.name.toUpperCase()}<span className="text-[#EA580C]">{site.brand.accent}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between gap-4 text-xs uppercase tracking-[0.2em] text-white/50">
          <span>© {new Date().getFullYear()} {site.brand.name} · {site.brand.trustName}. {f.rights}</span>
          <span>{f.designedBy}</span>
        </div>
      </div>
    </footer>
  );
};
