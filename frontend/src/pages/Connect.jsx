import { useEffect } from "react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { MessageCircle } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
);

const WhatsappIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`w-4 h-4 fill-current ${className}`}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.177-.298-.018-.46.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
);

const Pill = ({ icon: Icon, label, iconColor, href }) => (
  <a href={href || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg text-[13px] font-semibold text-gray-600 transition-colors shadow-sm">
    <Icon className={iconColor || "text-gray-600"} />
    {label}
  </a>
);

export const Connect = () => {
  useEffect(() => {
    document.title = "Anna's Voice | Updates & Connect";
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1128]">
      <Navbar />
      <main className="pt-32 lg:pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          
          <h1 className="font-bold text-3xl text-gray-900 mb-2">Anna's Voice</h1>
          <p className="text-gray-500 text-sm mb-6">Updates from Anna — newest first, across all his channels.</p>

          <div className="bg-[#F3F4F6] rounded-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-sm font-semibold text-gray-500 w-24">Follow Anna:</span>
              <div className="flex flex-wrap gap-2">
                <Pill icon={XIcon} label="X" href="https://x.com/kumaran__bjp" />
                <Pill icon={YoutubeIcon} label="YouTube" href="https://www.youtube.com/@akrtrust3129" />
                <Pill icon={InstagramIcon} label="Instagram" href="https://www.instagram.com/madhavaram_kumaran_ma/?hl=en" />
                <Pill icon={FacebookIcon} label="Facebook" href="https://www.facebook.com/profile.php?id=61584917536840" />
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#174B8B] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-lg text-white gap-6">
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle size={32} fill="currentColor" className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl lg:text-2xl mb-1">வாட்ஸ்அப்பில் அண்ணாவின் குழுவுடன் இணையுங்கள்</h3>
                <p className="text-sm text-blue-100">Get updates, your welcome kit, and connect with volunteers near you</p>
              </div>
            </div>
            <a href="https://wa.me/918925847185" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-[#009E8F] hover:bg-[#008A7C] text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-md">
              Message us &rarr;
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};
