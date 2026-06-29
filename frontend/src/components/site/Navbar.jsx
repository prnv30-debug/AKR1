import { useEffect, useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { useSite, useLang } from "../../content/site.config";

export const Navbar = () => {
  const site = useSite();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang(lang === "en" ? "ta" : "en");
  const links = site.nav.links;

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#0A1128]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Added shrink-0 to prevent collapsing */}
        <a
          href="/#top"
          data-testid="nav-logo"
          className="flex items-center font-display font-black tracking-tighter text-xl text-[#0A1128] shrink-0"
        >
          <img
            src="/akr_logo.jpg"
            alt="AKR Logo"
            className="h-9 w-9 object-contain mr-2.5 rounded-full border border-[#0A1128]/10 bg-white p-0.5 shadow-sm"
          />
          <span>
            {site.brand.name.toUpperCase()}<span className="text-[#EA580C]">{site.brand.accent}</span>
          </span>
        </a>

        {/* Links - Upgraded breakpoint from md:flex to lg:flex, and reduced gap to prevent overcrowding */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {links.map((l, i) => (
            <a
              key={`${l.href}-${i}`}
              href={l.href}
              data-testid={`nav-link-${i}`}
              className="text-xs xl:text-sm font-semibold text-[#0A1128]/80 hover:text-[#EA580C] transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons - Upgraded breakpoint from md:flex to lg:flex */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <button
            onClick={toggleLang}
            data-testid="nav-lang-toggle"
            aria-label="Toggle language"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold border border-[#0A1128]/30 text-[#0A1128] hover:bg-[#0A1128] hover:text-white transition-all whitespace-nowrap"
          >
            <Languages size={14} />
            <span className="tracking-widest">{lang === "en" ? "தமிழ்" : "EN"}</span>
          </button>
          <a
            href="/gallery"
            data-testid="nav-donate-btn"
            className="px-3 xl:px-5 py-2 text-xs xl:text-sm font-semibold border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white transition-all whitespace-nowrap"
          >
            {site.nav.donate}
          </a>
          <a
            href="/#volunteer"
            data-testid="nav-volunteer-btn"
            className="px-3 xl:px-5 py-2 text-xs xl:text-sm font-semibold bg-[#EA580C] text-white hover:bg-[#C2410C] transition-all whitespace-nowrap"
          >
            {site.nav.volunteer}
          </a>
        </div>

        {/* Mobile menu trigger - Visible on screens smaller than lg */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            data-testid="nav-lang-toggle-mobile"
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-semibold border border-[#0A1128]/30 text-[#0A1128]"
          >
            <Languages size={12} />
            <span className="tracking-widest">{lang === "en" ? "தமிழ்" : "EN"}</span>
          </button>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#0A1128]"
            aria-label="menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#0A1128]/10" data-testid="nav-mobile-menu">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l, i) => (
              <a
                key={`${l.href}-${i}`}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#0A1128]"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="/gallery" onClick={() => setOpen(false)} className="flex-1 text-center py-2 border border-[#0A1128] text-sm font-semibold">
                {site.nav.donate}
              </a>
              <a href="/#volunteer" onClick={() => setOpen(false)} className="flex-1 text-center py-2 bg-[#EA580C] text-white text-sm font-semibold">
                {site.nav.volunteer}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
