import { useState, useEffect, useMemo, useCallback } from "react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { useLang } from "../content/site.config";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const UI_TEXT = {
  en: {
    title: "Photo Gallery",
    subtitle: "Visual records of three decades of public service and grassroots leadership in Madhavaram.",
    all: "All",
    political: "Political",
    akrEvents: "AKR Trust Events",
    social: "Social Activities",
    media: "Media Coverage",
    showing: "Showing",
    of: "of",
    photos: "photos",
    trustName: "AKR Social Welfare Trust",
    location: "Madhavaram, Chennai"
  },
  ta: {
    title: "புகைப்படங்கள்",
    subtitle: "மாதவரத்தில் முப்பது ஆண்டுகால மக்கள் சேவை மற்றும் களப் பணிகளின் சான்றுகள்.",
    all: "அனைத்தும்",
    political: "அரசியல்",
    akrEvents: "ஏ.கே.ஆர் அறக்கட்டளை நிகழ்வுகள்",
    social: "சமூக நலப் பணிகள்",
    media: "ஊடக செய்திகள்",
    showing: "காண்பிக்கப்படுவது",
    of: "மொத்தம்",
    photos: "புகைப்படங்கள்",
    trustName: "ஏ.கே.ஆர் சமூக நல அறக்கட்டளை",
    location: "மாதவரம், சென்னை"
  }
};

const CATEGORIES = ["All", "Social Activities", "Political", "AKR Trust Events", "Media Coverage"];

// 100% Unique non-duplicated image list with full Tamil & English translations
const GALLERY_ITEMS = [
  // Political
  {
    id: 1,
    src: "/kumaran_profile_images/slide21_img58.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Meeting Hon'ble Union Minister Amit Shah Ji",
    titleTa: "மாண்புமிகு மத்திய உள்துறை அமைச்சர் அமித் ஷா சந்திப்பு",
    descEn: "Strategic discussions on constituency development and public welfare roadmaps for Chennai West.",
    descTa: "மேற்கு சென்னை மற்றும் மாதவரம் பகுதி மேம்பாடு குறித்த முக்கிய ஆலோசனைகள்."
  },
  {
    id: 2,
    src: "/kumaran_profile_images/slide16_img46.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Official Induction at BJP State Headquarters",
    titleTa: "பாஜக மாநில தலைமையகத்தில் அதிகாரப்பூர்வ இணைப்பு",
    descEn: "Formal entry into active national politics in the presence of senior state leadership.",
    descTa: "மாநில மூத்த தலைவர்கள் முன்னிலையில் பாஜகவில் இணைந்த வரலாற்று தருணம்."
  },
  {
    id: 3,
    src: "/kumaran_profile_images/slide18_img50.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "District Patha Sanchalan & Unity Procession",
    titleTa: "மாவட்ட பத்த சஞ்சலன் மற்றும் ஒற்றுமை பேரணி",
    descEn: "Leading disciplined cadre and volunteers through major thoroughfares in Chennai West.",
    descTa: "மேற்கு சென்னை முழுவதும் தொண்டர்கள் மற்றும் பொதுமக்களுடன் மாபெரும் பேரணி."
  },
  {
    id: 4,
    src: "/kumaran_profile_images/slide19_img54.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Public Address on Civic Infrastructure",
    titleTa: "அடிப்படை கட்டமைப்பு வசதிகள் குறித்த பொதுக்கூட்டம்",
    descEn: "Addressing public gatherings to demand better drainage and road facilities for North Chennai.",
    descTa: "வட சென்னை மக்களின் அடிப்படை வசதிகளுக்காக குரல் கொடுத்த மாபெரும் பொதுக்கூட்டம்."
  },
  {
    id: 5,
    src: "/kumaran_profile_images/slide20_img56.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "District Executive Committee Meeting",
    titleTa: "மாவட்ட செயற்குழு மற்றும் நிர்வாக ஆலோசனைக் கூட்டம்",
    descEn: "Coordinating ward-level welfare programs to ensure schemes reach the grassroots.",
    descTa: "அரசு நலத்திட்டங்கள் சாமானிய மக்களை சென்றடைவதை உறுதி செய்யும் ஆலோசனைக் கூட்டம்."
  },
  {
    id: 6,
    src: "/kumaran_profile_images/slide17_img48.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Public Agitation for Municipal Rights",
    titleTa: "மாநகராட்சி அடிப்படை உரிமைகளுக்கான ஆர்ப்பாட்டம்",
    descEn: "Leading peaceful demonstrations holding authorities accountable for clean drinking water and sanitation.",
    descTa: "சுத்தமான குடிநீர் மற்றும் சுகாதாரத்திற்காக அதிகாரிகளை வலியுறுத்தி ஜனநாயக ரீதியிலான ஆர்ப்பாட்டம்."
  },

  // AKR Trust Events
  {
    id: 7,
    src: "/kumaran_profile_images/slide22_img60.png",
    fallbackSrc: "/9th_day_celebration.jpg",
    category: "AKR Trust Events",
    titleEn: "State President K. Annamalai Gracing AKR Event",
    titleTa: "பாஜக மாநில தலைவர் கே. அண்ணாமலை பங்கேற்பு",
    descEn: "Commending 106 consecutive months of self-funded public welfare in Madhavaram.",
    descTa: "மாதவரத்தில் தொடர்ந்து 106 மாதங்களாக நடைபெறும் மக்கள் சேவையை பாராட்டிய தருணம்."
  },
  {
    id: 8,
    src: "/kumaran_profile_images/slide23_img62.png",
    fallbackSrc: "/9th_day_celebration.jpg",
    category: "AKR Trust Events",
    titleEn: "9th Foundation Day Grand Assembly",
    titleTa: "9-வது ஆண்டு துவக்க விழா மாபெரும் மாநாடு",
    descEn: "Thousands of beneficiaries and elders uniting to celebrate continuous community service.",
    descTa: "ஆயிரக்கணக்கான பயனாளிகள் மற்றும் பெரியவர்கள் பங்கேற்ற மாபெரும் ஆண்டு விழா."
  },
  {
    id: 9,
    src: "/kumaran_profile_images/slide23_img61.png",
    fallbackSrc: "/9th_day_celebration.jpg",
    category: "AKR Trust Events",
    titleEn: "Welfare Aid Distribution Ceremony",
    titleTa: "நலத்திட்ட உதவிகள் வழங்கும் விழா",
    descEn: "Direct handover of financial assistance and household staples to marginalized families.",
    descTa: "ஏழை எளிய குடும்பங்களுக்கு நிதி உதவி மற்றும் அத்தியாவசிய பொருட்கள் வழங்கிய நிகழ்வு."
  },
  {
    id: 10,
    src: "/kumaran_profile_images/slide14_img41.png",
    fallbackSrc: "/event_livelihood.jpg",
    category: "AKR Trust Events",
    titleEn: "Livelihood Sewing Machine Handover",
    titleTa: "வாழ்வாதார தையல் இயந்திரங்கள் வழங்குதல்",
    descEn: "Equipping underprivileged women with tailoring machines for independent home-based income.",
    descTa: "பெண்களின் சுயதொழில் மற்றும் பொருளாதார சுதந்திரத்திற்காக இலவச தையல் இயந்திரங்கள் வழங்கல்."
  },
  {
    id: 11,
    src: "/kumaran_profile_images/slide14_img42.png",
    fallbackSrc: "/event_livelihood.jpg",
    category: "AKR Trust Events",
    titleEn: "Tricycle Aid for Differently-Abled",
    titleTa: "மாற்றுத்திறனாளிகளுக்கு மூன்று சக்கர வாகனங்கள்",
    descEn: "Providing specialized mobility tricycles to ensure self-reliance and dignified daily livelihoods.",
    descTa: "மாற்றுத்திறனாளிகளின் வாழ்வாதாரத்தை மேம்படுத்த சிறப்பு வாகனங்கள் வழங்கிய நிகழ்வு."
  },

  // Social Activities
  {
    id: 12,
    src: "/kumaran_profile_images/slide07_img21.png",
    fallbackSrc: "/event_pension.jpg",
    category: "Social Activities",
    titleEn: "Monthly Senior Citizen Pension Drive Crowd",
    titleTa: "மாதாந்திர முதியோர் ஓய்வூதியத் திட்டம்",
    descEn: "₹500 assistance and 5kg rice distributed on the 5th of every month to over 2,000 elders.",
    descTa: "ஒவ்வொரு மாதமும் 5-ஆம் தேதி 2,000-க்கும் மேற்பட்ட முதியோர்களுக்கு ரூ.500 மற்றும் 5கிலோ அரிசி வழங்கல்."
  },
  {
    id: 13,
    src: "/kumaran_profile_images/slide07_img20.png",
    fallbackSrc: "/event_pension.jpg",
    category: "Social Activities",
    titleEn: "Personal Care & Blessings from Elders",
    titleTa: "முதியோர்களின் அன்பும் ஆசீர்வாதமும்",
    descEn: "Personally attending to elderly mothers and fathers during monthly distribution drives.",
    descTa: "முதியோர்களை நேரில் சந்தித்து குறைகளைக் கேட்டு ஆசி பெற்ற நெகிழ்ச்சியான தருணம்."
  },
  {
    id: 14,
    src: "/kumaran_profile_images/slide11_img34.png",
    fallbackSrc: "/agr_small1.jpg",
    category: "Social Activities",
    titleEn: "Community Valaikappu (Baby Shower)",
    titleTa: "சமுதாய வளைகாப்பு மற்றும் தாய்மை கொண்டாட்டம்",
    descEn: "Honoring expectant mothers with traditional bangles, sarees, feast, and nutrition kits.",
    descTa: "கர்ப்பிணித் தாய்மார்களுக்கு சீர்வரிசை, வளையல் மற்றும் சத்தான உணவு வழங்கி சிறப்பித்த நிகழ்வு."
  },
  {
    id: 15,
    src: "/kumaran_profile_images/slide03_img07.png",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Daily 20L Pure Drinking Water Supply",
    titleTa: "தினசரி 20 லிட்டர் சுத்தமான குடிநீர் விநியோகம்",
    descEn: "Deploying dedicated transport vehicles to deliver RO water cans directly to doorsteps.",
    descTa: "மாதவரம் முழுவதும் குடிநீர் தட்டுப்பாட்டை போக்க வீடுகளுக்கே சென்று குடிநீர் கேன்கள் விநியோகம்."
  },
  {
    id: 16,
    src: "/kumaran_profile_images/slide03_img08.png",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Door-to-Door Water Can Delivery",
    titleTa: "இல்லங்கள் தோறும் குடிநீர் சேவை",
    descEn: "Volunteers lifting and delivering heavy water cans inside homes of elderly residents.",
    descTa: "முதியோர்கள் மற்றும் உழைக்கும் குடும்பங்களின் வீடுகளுக்கே சென்று குடிநீர் வழங்கும் தொண்டர்கள்."
  },
  {
    id: 17,
    src: "/kumaran_profile_images/slide10_img29.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Free Medical & Eye Testing Camp",
    titleTa: "இலவச மருத்துவ மற்றும் கண் பரிசோதனை முகாம்",
    descEn: "Conducting diagnostic screenings, free spectacles distribution, and surgical referrals.",
    descTa: "ஏழை எளிய மக்களுக்கு இலவச கண் பரிசோதனை, மூக்குக்கண்ணாடி மற்றும் அறுவை சிகிச்சை உதவி."
  },
  {
    id: 18,
    src: "/kumaran_profile_images/slide12_img36.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Grand Pongal Provision Distribution",
    titleTa: "மாபெரும் பொங்கல் திருநாள் தொகுப்பு வழங்குதல்",
    descEn: "Distributing raw rice, jaggery, and sugarcane so every household celebrates with joy.",
    descTa: "அனைவரும் மகிழ்ச்சியாக பண்டிகையை கொண்டாட பல்லாயிரக்கணக்கான குடும்பங்களுக்கு பொங்கல் தொகுப்பு."
  },
  {
    id: 19,
    src: "/kumaran_profile_images/slide05_img13.jpg",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Educational Scholarship & Notebook Distribution",
    titleTa: "மாணவர்களுக்கு கல்வி உதவித்தொகை மற்றும் நோட்டுப் புத்தகங்கள்",
    descEn: "Providing school supplies and fee support to meritorious students from low-income families.",
    descTa: "ஏழை மாணவர்களின் கல்வி கனவை நனவாக்க நோட்டுப் புத்தகங்கள் மற்றும் கல்வி உதவித்தொகை வழங்கல்."
  },

  // Media Coverage
  {
    id: 20,
    src: "/kumaran_profile_images/slide24_img63.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Media Coverage",
    titleEn: "Press Feature: Flood Rescue Operations",
    titleTa: "பத்திரிகை செய்தி: வெள்ள மீட்புப் பணிகள்",
    descEn: "Leading daily newspapers highlighting AKR Trust's boat rescue and food distribution during floods.",
    descTa: "சென்னை பெருவெள்ளத்தின் போது படகுகள் மூலம் மீட்டு உணவு வழங்கிய சேவையைப் பாராட்டிய நாளிதழ்கள்."
  },
  {
    id: 21,
    src: "/kumaran_profile_images/slide24_img64.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Media Coverage",
    titleEn: "Press Report: 100th Monthly Pension Milestone",
    titleTa: "பத்திரிகை செய்தி: 100-வது மாத முதியோர் ஓய்வூதியம்",
    descEn: "Journalists documenting the historic milestone of 8+ years of unbroken elderly pension drives.",
    descTa: "தொடர்ந்து 100 மாதங்களைக் கடந்து முதியோர்களுக்கு ஓய்வூதியம் வழங்கும் சாதனையைப் போற்றிய ஊடகங்கள்."
  },
  {
    id: 22,
    src: "/kumaran_profile_images/slide25_img67.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Media Coverage",
    titleEn: "State Television Debate on North Chennai",
    titleTa: "தொலைக்காட்சி விவாதம்: வட சென்னை மேம்பாடு",
    descEn: "Representing Madhavaram on news channels demanding better municipal amenities.",
    descTa: "வட சென்னை மக்களின் உள்கட்டமைப்பு உரிமைகளுக்காக தொலைக்காட்சிகளில் குரல் கொடுத்த தருணம்."
  },
  {
    id: 23,
    src: "/kumaran_profile_images/slide25_img68.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Media Coverage",
    titleEn: "News Interview on Livelihood Schemes",
    titleTa: "செய்தித் தொலைக்காட்சி நேர்காணல்: வாழ்வாதாரத் திட்டங்கள்",
    descEn: "Explaining the framework of AKR Trust's women empowerment programs on state broadcasts.",
    descTa: "பெண்கள் மற்றும் ஆட்டோ ஓட்டுநர்களுக்கான சுயதொழில் திட்டங்கள் குறித்து விவரித்த நேர்காணல்."
  },
  {
    id: 24,
    src: "/kumaran_profile_images/slide25_img70.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Media Coverage",
    titleEn: "Press Conference Addressing Ward Development",
    titleTa: "பத்திரிகையாளர் சந்திப்பு: தொகுதி வளர்ச்சி பணிகள்",
    descEn: "Briefing print and electronic media on upcoming grassroots welfare roadmaps.",
    descTa: "எதிர்கால மக்கள் நலத்திட்டங்கள் மற்றும் தொகுதி மேம்பாடு குறித்து ஊடகங்களுக்கு அளித்த பேட்டி."
  }
];

export const Gallery = () => {
  const { lang } = useLang();
  const isTa = lang === "ta";
  const t = UI_TEXT[lang] || UI_TEXT.en;

  const [activeTab, setActiveTab] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    document.title = isTa ? "குமரன் M.A. | புகைப்படங்கள்" : "Kumaran M.A. | Photo Gallery";
    window.scrollTo(0, 0);
  }, [isTa]);

  // Translate tab category name for display
  const getCategoryLabel = (cat) => {
    if (cat === "All") return t.all;
    if (cat === "Political") return t.political;
    if (cat === "AKR Trust Events") return t.akrEvents;
    if (cat === "Social Activities") return t.social;
    if (cat === "Media Coverage") return t.media;
    return cat;
  };

  const filteredItems = useMemo(() => {
    if (activeTab === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeTab);
  }, [activeTab]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === null) return;
    if (e.key === "Escape") setSelectedIndex(null);
    if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [selectedIndex, filteredItems.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1128] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="pt-32 lg:pt-40 pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">

            {/* Clean Minimalistic Header */}
            <div className="mb-10 border-b border-gray-200 pb-6">
              <h1 className="font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight mb-2">
                {t.title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
                {t.subtitle}
              </p>
            </div>

            {/* Clean Minimalistic Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {CATEGORIES.map(category => {
                const isActive = activeTab === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#0A1128] text-white shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {getCategoryLabel(category)}
                  </button>
                );
              })}
            </div>

            {/* Item count counter */}
            <div className="text-xs text-gray-400 font-medium mb-6">
              {t.showing} {filteredItems.length} {t.photos}
            </div>

            {/* Minimalistic Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => {
                const title = isTa ? item.titleTa : item.titleEn;
                const desc = isTa ? item.descTa : item.descEn;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIndex(index)}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={item.src}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          if (e.target.src !== window.location.origin + item.fallbackSrc) {
                            e.target.src = item.fallbackSrc;
                          } else {
                            e.target.src = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
                          }
                        }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-base text-gray-900 group-hover:text-[#EA580C] transition-colors line-clamp-1">
                          {title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </main>
      </div>

      {/* Clean Lightbox Modal */}
      {currentItem && (
        <div 
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8 animate-fade-in select-none"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
            }}
            className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
            }}
            className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#0A1128] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
          >
            <div className="bg-black flex items-center justify-center min-h-[300px] max-h-[70vh] p-4 relative">
              <img
                src={currentItem.src}
                alt={isTa ? currentItem.titleTa : currentItem.titleEn}
                className="max-h-[65vh] w-auto object-contain rounded"
                onError={(e) => {
                  if (e.target.src !== window.location.origin + currentItem.fallbackSrc) {
                    e.target.src = currentItem.fallbackSrc;
                  } else {
                    e.target.src = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
                  }
                }}
              />
            </div>
            <div className="p-5 sm:p-6 text-white bg-[#0A1128]">
              <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider block mb-1">
                {getCategoryLabel(currentItem.category)}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                {isTa ? currentItem.titleTa : currentItem.titleEn}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {isTa ? currentItem.descTa : currentItem.descEn}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
