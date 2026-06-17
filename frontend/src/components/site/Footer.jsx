import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-[#0A1128] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6">
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">Office</div>
            <div className="flex items-start gap-3 text-white/80 mb-3">
              <MapPin size={16} className="mt-1 shrink-0" />
              <span>
                AGR Trust Bhavan, 14 Gandhi Road,
                <br />
                Madurai 625001, Tamil Nadu, India
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Mail size={16} />
              <a href="mailto:hello@kumaran.in" className="hover:text-[#EA580C] transition-colors">
                hello@kumaran.in
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">Explore</div>
            <ul className="space-y-2 text-white/80">
              {[
                ["#journey", "Journey"],
                ["#vision", "Vision"],
                ["#agr", "AGR Trust"],
                ["#events", "Events"],
                ["#involved", "Get Involved"],
              ].map(([href, l]) => (
                <li key={href}>
                  <a href={href} className="hover:text-[#EA580C] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display uppercase tracking-[0.2em] text-xs text-[#EA580C] mb-4">Follow</div>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "facebook" },
                { icon: Twitter, label: "twitter" },
                { icon: Instagram, label: "instagram" },
                { icon: Youtube, label: "youtube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  data-testid={`social-${label}`}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#EA580C] hover:border-[#EA580C] transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Massive name */}
        <div className="border-t border-white/10 pt-10">
          <div
            data-testid="footer-name-lockup"
            className="font-display font-black tracking-tighter leading-none text-[20vw] lg:text-[14vw] text-white/95 select-none"
          >
            KUMARAN<span className="text-[#EA580C]">.</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between gap-4 text-xs uppercase tracking-[0.2em] text-white/50">
          <span>© {new Date().getFullYear()} Kumaran · AGR Trust. All rights reserved.</span>
          <span>Designed for the people · Built with conviction</span>
        </div>
      </div>
    </footer>
  );
};
