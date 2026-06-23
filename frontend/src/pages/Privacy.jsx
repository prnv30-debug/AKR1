import { useEffect } from "react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";

export const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | AKR Trust";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1128]">
      <Navbar />
      <main className="pt-32 lg:pt-40 pb-20 px-6 lg:px-10 max-w-4xl mx-auto">
        <h1 className="font-display font-black text-4xl lg:text-5xl mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg text-[#4B5563] space-y-6">
          <p>
            At AKR Social Welfare Trust and Madhavaram Kumaran's official site, we respect your privacy 
            and are committed to protecting the personal information you share with us.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and location 
            when you voluntarily provide it to us through forms, newsletter signups, or donation processing.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">2. How We Use Your Information</h2>
          <p>
            Your information is used to communicate with you about our initiatives, events, and campaigns. 
            We do not sell or rent your personal information to third parties.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">3. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, 
            alteration, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">4. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites. We are not responsible for the privacy practices 
            or the content of such external websites.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">5. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact us at our 
            official communication channels provided on this website.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
