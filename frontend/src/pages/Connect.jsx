import { useEffect } from "react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { SocialLinks } from "../components/SocialLinks";
import { MessageCircle } from "lucide-react";

export const Connect = () => {
  useEffect(() => {
    document.title = "Connect with Madhavaram Kumaran | AKR Trust";
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1128]">
      <Navbar />
      <main className="pt-32 lg:pt-40 pb-20">

        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center mb-16">
          <div className="w-24 h-24 mx-auto bg-[#EA580C] text-white flex items-center justify-center rounded-full text-3xl font-display font-black tracking-tighter mb-6 shadow-lg">
            MK
          </div>
          <h1 className="font-display font-black tracking-tighter text-4xl lg:text-6xl text-[#0A1128] mb-4">
            Madhavaram Kumaran
          </h1>
          <div className="font-display uppercase tracking-[0.2em] text-xs font-semibold text-[#EA580C] mb-6">
            BJP · Madhavaram Constituency · AKR Trust
          </div>
          <p className="text-[#4B5563] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Stay connected and follow the latest updates, initiatives, and announcements across all platforms.
          </p>
        </div>


        <div className="max-w-5xl mx-auto px-6 lg:px-10 mb-16">
          <SocialLinks />
        </div>


        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="bg-[#25D366] text-white p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <MessageCircle size={40} className="shrink-0" />
              <div>
                <h3 className="font-display font-black text-2xl lg:text-3xl mb-1">WhatsApp Us</h3>
                <div className="text-white/90 font-medium text-lg lg:text-xl flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="https://wa.me/918925847185" target="_blank" rel="noopener noreferrer" className="hover:underline">+91 89258 47185</a>
                  <span className="hidden sm:inline">|</span>
                  <a href="https://wa.me/919444389777" target="_blank" rel="noopener noreferrer" className="hover:underline">+91 94443 89777</a>
                </div>
              </div>
            </div>
            <a href="https://wa.me/918925847185" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-white text-[#25D366] hover:bg-[#0A1128] hover:text-white px-8 py-4 font-semibold text-lg transition-all rounded-full shadow-md">
              Message us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
