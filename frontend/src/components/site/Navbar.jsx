import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#journey", label: "Journey" },
  { href: "#vision", label: "Vision" },
  { href: "#agr", label: "AGR Trust" },
  { href: "#events", label: "Events" },
  { href: "#involved", label: "Get Involved" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#0A1128]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-display font-black tracking-tighter text-xl text-[#0A1128]"
        >
          KUMARAN<span className="text-[#EA580C]">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-[#0A1128]/80 hover:text-[#EA580C] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#donate"
            data-testid="nav-donate-btn"
            className="px-5 py-2 text-sm font-semibold border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white transition-all"
          >
            Donate
          </a>
          <a
            href="#volunteer"
            data-testid="nav-volunteer-btn"
            className="px-5 py-2 text-sm font-semibold bg-[#EA580C] text-white hover:bg-[#C2410C] transition-all"
          >
            Volunteer
          </a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#0A1128]"
          aria-label="menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#0A1128]/10" data-testid="nav-mobile-menu">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#0A1128]"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="#donate" onClick={() => setOpen(false)} className="flex-1 text-center py-2 border border-[#0A1128] text-sm font-semibold">
                Donate
              </a>
              <a href="#volunteer" onClick={() => setOpen(false)} className="flex-1 text-center py-2 bg-[#EA580C] text-white text-sm font-semibold">
                Volunteer
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
