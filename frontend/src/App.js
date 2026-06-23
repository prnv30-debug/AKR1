import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "./content/site.config";
import { Navbar } from "./components/site/Navbar";
import { Hero } from "./components/site/Hero";
import { Journey } from "./components/site/Journey";
import { Connect } from "./pages/Connect";
import React, { Suspense } from "react";

const Feature = React.lazy(() => import("./components/site/Feature").then(m => ({ default: m.Feature })));
const Vision = React.lazy(() => import("./components/site/Vision").then(m => ({ default: m.Vision })));
const AGR = React.lazy(() => import("./components/site/AGR").then(m => ({ default: m.AGR })));
const Events = React.lazy(() => import("./components/site/Events").then(m => ({ default: m.Events })));
const Involved = React.lazy(() => import("./components/site/Involved").then(m => ({ default: m.Involved })));
const Footer = React.lazy(() => import("./components/site/Footer").then(m => ({ default: m.Footer })));

const Loader = () => <div className="h-48 flex items-center justify-center bg-[#FAFAFA]"><div className="w-8 h-8 border-4 border-[#EA580C] border-t-transparent rounded-full animate-spin"></div></div>;

const Home = () => (
  <div data-testid="home-page" className="min-h-screen bg-[#FAFAFA] text-[#0A1128]">
    <Navbar />
    <main>
      <Hero />
      <Journey />
      <Suspense fallback={<Loader />}>
        <Feature />
        <Vision />
        <AGR />
        <Events />
        <Involved />
      </Suspense>
    </main>
    <Suspense fallback={<Loader />}>
      <Footer />
    </Suspense>
  </div>
);

function App() {
  return (
    <div className="App">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/connect" element={<Connect />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-right" richColors />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
