/**
 * Language Context — Tamil / English toggle
 * -----------------------------------------------------------
 * Use `useSite()` in components to access the current locale's
 * site config. Use `useLang()` to read/change the language.
 * Preference is persisted in localStorage.
 * -----------------------------------------------------------
 */

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { site as siteEn } from "./site.en";
import { site as siteTa } from "./site.ta";

const LANGS = { en: siteEn, ta: siteTa };
const STORAGE_KEY = "kumaran-lang";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  site: siteEn,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANGS[stored]) setLangState(stored);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const setLang = (next) => {
    if (!LANGS[next]) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next === "ta" ? "ta" : "en";
    } catch (e) {
      /* ignore */
    }
  };

  const value = useMemo(
    () => ({ lang, setLang, site: LANGS[lang] || siteEn }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const { lang, setLang } = useContext(LanguageContext);
  return { lang, setLang };
};

export const useSite = () => useContext(LanguageContext).site;

// Backwards-compat: default English site for any module that still
// imports directly. Components SHOULD use useSite() instead.
export const site = siteEn;
export default siteEn;
