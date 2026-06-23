import { useEffect } from "react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";

export const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | AKR Trust";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1128]">
      <Navbar />
      <main className="pt-32 lg:pt-40 pb-20 px-6 lg:px-10 max-w-4xl mx-auto">
        <h1 className="font-display font-black text-4xl lg:text-5xl mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-lg text-[#4B5563] space-y-6">
          <p>
            Welcome to the official website of Madhavaram Kumaran and the AKR Social Welfare Trust. 
            By accessing or using our website, you agree to be bound by these Terms and Conditions.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">1. Acceptance of Terms</h2>
          <p>
            By using this website, you confirm that you have read, understood, and agreed to these terms. 
            If you do not agree with any part of these terms, you must not use our website.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">2. Use of the Site</h2>
          <p>
            You agree to use this site only for lawful purposes, and in a manner that does not infringe the rights of, 
            or restrict or inhibit the use and enjoyment of this site by any third party.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">3. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, images, and software, 
            is the property of AKR Social Welfare Trust or its content suppliers and is protected by applicable copyright and trademark laws.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">4. Limitation of Liability</h2>
          <p>
            AKR Social Welfare Trust and Madhavaram Kumaran shall not be liable for any direct, indirect, incidental, 
            consequential, or punitive damages arising out of your access to, or use of, the site.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1128] mt-10">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Any changes will be posted on this page, 
            and your continued use of the website constitutes acceptance of the modified terms.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
