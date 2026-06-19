import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "./content/site.config";
import { Navbar } from "./components/site/Navbar";
import { Hero } from "./components/site/Hero";
import { Journey } from "./components/site/Journey";
import { Feature } from "./components/site/Feature";
import { Vision } from "./components/site/Vision";
import { AGR } from "./components/site/AGR";
import { Events } from "./components/site/Events";
import { Involved } from "./components/site/Involved";
import { Footer } from "./components/site/Footer";

const Home = () => (
  <div data-testid="home-page" className="min-h-screen bg-[#FAFAFA] text-[#0A1128]">
    <Navbar />
    <main>
      <Hero />
      <Journey />
      <Feature />
      <Vision />
      <AGR />
      <Events />
      <Involved />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </LanguageProvider>
    </div>
  );
}

export default App;
