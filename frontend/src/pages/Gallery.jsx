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

// Sourced from gallery_output slide deck — one primary photo per event
const GALLERY_ITEMS = [
  // Top Priority Leadership
  {
    id: 1001,
    src: "/gallery/modiji.jpeg",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "With Hon’ble Prime Minister Shri Narendra Modi Ji",
    titleTa: "மாண்புமிகு பாரதப் பிரதமர் திரு. நரேந்திர மோடி ஜி அவர்களுடன்",
    descEn: "Inspired by the visionary leadership and service-first governance of Hon'ble Prime Minister Narendra Modi Ji.",
    descTa: "மாண்புமிகு பாரதப் பிரதமர் நரேந்திர மோடி ஜி அவர்களின் தொலைநோக்குத் தலைமை மற்றும் மக்கள் சேவையால் ஈர்க்கப்பட்டு."
  },
  {
    id: 1002,
    src: "/gallery/amitshah ji.jpeg",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Welcoming Hon’ble Union Home Minister Amit Shah Ji",
    titleTa: "மாண்புமிகு மத்திய உள்துறை அமைச்சர் அமித் ஷா ஜி வரவேற்பு",
    descEn: "Receiving and welcoming Union Home Minister Amit Shah Ji during his visit to Chennai.",
    descTa: "சென்னை வருகையின் போது மாண்புமிகு மத்திய உள்துறை அமைச்சர் அமித் ஷா ஜி அவர்களை வரவேற்ற தருணம்."
  },

  // Post Office Insurance Card for Students
  {
    id: 1003,
    src: "/gallery/post1.jpeg",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Post Office Accidental Insurance Cards for Students (Part 1)",
    titleTa: "மாணவர்களுக்கு அஞ்சலக விபத்து காப்பீடு அட்டை (பகுதி 1)",
    descEn: "Distributing Post Office Accidental Insurance cards to secure the financial future of school and college students.",
    descTa: "பள்ளி மற்றும் கல்லூரி மாணவர்களின் எதிர்காலத்தைப் பாதுகாக்கும் வகையில் அஞ்சலக விபத்து காப்பீட்டு அட்டைகள் வழங்கிய நிகழ்வு."
  },
  {
    id: 1004,
    src: "/gallery/post2.jpeg",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Post Office Accidental Insurance Cards for Students (Part 2)",
    titleTa: "மாணவர்களுக்கு அஞ்சலக விபத்து காப்பீடு அட்டை (பகுதி 2)",
    descEn: "Organising registration and distribution drives for student accidental insurance coverage across Madhavaram.",
    descTa: "மாதவரம் முழுவதும் உள்ள மாணவர்களுக்காக அஞ்சலக விபத்து காப்பீட்டு பதிவு மற்றும் விநியோக முகாம்."
  },
  {
    id: 1005,
    src: "/gallery/post3.jpeg",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Post Office Accidental Insurance Cards for Students (Part 3)",
    titleTa: "மாணவர்களுக்கு அஞ்சலக விபத்து காப்பீடு அட்டை (பகுதி 3)",
    descEn: "Empowering youth and supporting families with accessible post office social security schemes.",
    descTa: "இளைஞர்களை மேம்படுத்தி குடும்பங்களுக்கு உதவும் அஞ்சலக சமூக பாதுகாப்புத் திட்டம்."
  },

  // Social Activities
  {
    id: 1,
    src: "/gallery/slide03_Water-Supply-Scarcity-Madhavaram/img03.png",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Fighting Water Scarcity in Madhavaram",
    titleTa: "மாதவரம் குடிநீர் தட்டுப்பாட்டுக்கு எதிரான போராட்டம்",
    descEn: "Rallying residents and raising awareness when Madhavaram faced severe drinking-water shortages.",
    descTa: "குடிநீர் பற்றாக்குறை காலத்தில் மாதவரம் மக்களை ஒன்றிணைத்து விழிப்புணர்வு ஏற்படுத்திய போராட்டம்."
  },
  {
    id: 2,
    src: "/gallery/slide04_Water-For-Animals/img01.png",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Clean Water for Cattle & Street Animals",
    titleTa: "கால்நடைகள் மற்றும் தெரு விலங்குகளுக்கு குடிநீர்",
    descEn: "Setting up water points so cattle and neighbourhood animals are not left thirsty in summer.",
    descTa: "வறுக்கும் காலத்தில் கால்நடைகளும் தெரு விலங்குகளும் தவிக்காமல் குடிநீர் வழங்கிய சேவை."
  },
  {
    id: 3,
    src: "/gallery/slide05_Food-CorporationWorkers-Covid/img01.jpeg",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "COVID Relief for Food Corporation Workers",
    titleTa: "உணவுக் கழக ஊழியர்களுக்கு கொரோனா நேர உதவி",
    descEn: "Supporting Food Corporation of India staff with essentials during the pandemic lockdowns.",
    descTa: "கொரோனா ஊரடங்கு காலத்தில் உணவுக் கழக ஊழியர்களுக்கு அத்தியாவசிய உதவிகள் வழங்கிய நிகழ்வு."
  },
  {
    id: 4,
    src: "/gallery/slide06_Aravanaikum-Karangal-Orphanage/img01.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Visit to Aravanaikum Karangal Orphanage",
    titleTa: "அனாதை இல்லம் — குழந்தைகளுடன் சந்திப்பு",
    descEn: "Spending time with children at the orphanage and extending food, supplies and encouragement.",
    descTa: "அனாதை இல்லக் குழந்தைகளுடன் நேரம் செலவிட்டு உணவு மற்றும் தேவையான உதவிகள் வழங்கிய தருணம்."
  },
  {
    id: 5,
    src: "/gallery/slide07_Rice-Pension-Elders/img04.png",
    fallbackSrc: "/event_pension.jpg",
    category: "Social Activities",
    titleEn: "Monthly Rice & Pension for Elders",
    titleTa: "மாதாந்திர அரிசி மற்றும் ஓய்வூதியம் — முதியோர்",
    descEn: "Personally handing ₹500 assistance and 5 kg rice to registered senior citizens each month.",
    descTa: "ஒவ்வொரு மாதமும் பதிவு செய்த முதியோர்களுக்கு ரூ.500 உதவியும் 5 கிலோ அரிசியும் நேரில் வழங்கல்."
  },
  {
    id: 6,
    src: "/gallery/slide08_Free-WaterCan-Members/img01.png",
    fallbackSrc: "/agr_small2.jpg",
    category: "Social Activities",
    titleEn: "Free 20L Water Cans for Members",
    titleTa: "உறுப்பினர்களுக்கு இலவச 20 லிட்டர் குடிநீர் கேன்கள்",
    descEn: "Distributing RO water cans to registered families on alternate days across Madhavaram.",
    descTa: "மாதவரம் முழுவதும் பதிவு செய்த குடும்பங்களுக்கு மாற்று நாட்களில் சுத்தமான குடிநீர் கேன்கள் வழங்கல்."
  },
  {
    id: 7,
    src: "/gallery/slide09_Medical-Help-Handicapped/img03.png",
    fallbackSrc: "/event_livelihood.jpg",
    category: "Social Activities",
    titleEn: "Medical Aid for Differently-Abled Citizens",
    titleTa: "மாற்றுத்திறனாளிகளுக்கு மருத்துவ உதவி",
    descEn: "Arranging treatment support, mobility aids and follow-up care for persons with disabilities.",
    descTa: "மாற்றுத்திறனாளிகளுக்கு மருத்துவ சிகிச்சை, இயக்க உதவிகள் மற்றும் தொடர் பராமரிப்பு வழங்கல்."
  },
  {
    id: 8,
    src: "/gallery/slide10_Eye-Checkup-Camp/img02.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Free Eye Check-up Camp",
    titleTa: "இலவச கண் பரிசோதனை முகாம்",
    descEn: "Screening vision, distributing spectacles and referring patients for cataract surgery.",
    descTa: "கண் பார்வை பரிசோதனை, மூக்குக்கண்ணாடி வழங்கல் மற்றும் அறுவை சிகிச்சை பரிந்துரை — இலவச முகாம்."
  },
  {
    id: 9,
    src: "/gallery/slide11_Valaikappu-Babyshower/img01.png",
    fallbackSrc: "/agr_small1.jpg",
    category: "Social Activities",
    titleEn: "Community Valaikappu (Baby Shower)",
    titleTa: "சமூக வளைகாப்பு — தாய்மை கொண்டாட்டம்",
    descEn: "Honouring expectant mothers with bangles, sarees, nutrition kits and a community feast.",
    descTa: "கர்ப்பிணி தாய்மார்களுக்கு வளையல், சீர்வரிசை, சத்தான உணவு மற்றும் சமூக விருந்து வழங்கிய நிகழ்வு."
  },
  {
    id: 10,
    src: "/gallery/slide13_Tree-Sapling-Planting-Mathur/img01.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Tree Sapling Drive in Mathur",
    titleTa: "மத்தூரில் மர நடவு — பசுமைப் பணி",
    descEn: "Planting saplings with local volunteers to green Mathur and improve neighbourhood shade.",
    descTa: "மத்தூர் பகுதியில் உள்ளூர் தொண்டர்களுடன் மர நடவு செய்து சுற்றுச்சூழலை பாதுகாத்த பணி."
  },
  {
    id: 11,
    src: "/gallery/slide14_JanDhan-Yojana-BankAccounts/img01.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Jan Dhan Yojana — Bank Account Camp",
    titleTa: "ஜன் தன் யோஜனா — வங்கிக் கணக்கு முகாம்",
    descEn: "Helping unbanked families open zero-balance accounts under the Jan Dhan Yojana scheme.",
    descTa: "வங்கிக் கணக்கு இல்லாத குடும்பங்களுக்கு ஜன் தன் யோஜனா மூலம் கணக்கு தொடங்க உதவிய முகாம்."
  },
  {
    id: 12,
    src: "/gallery/slide15_Pongal-Celebration-Rangoli/img02.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Social Activities",
    titleEn: "Pongal Celebration & Rangoli Event",
    titleTa: "பொங்கல் கொண்டாட்டம் மற்றும் கோலம் போட்டி",
    descEn: "Community Pongal with rangoli competitions and festive provisions for local families.",
    descTa: "உள்ளூர் குடும்பங்களுடன் பொங்கல் கொண்டாட்டம், கோலம் போட்டி மற்றும் பண்டிகை உதவிகள்."
  },

  // AKR Trust Events
  {
    id: 13,
    src: "/gallery/slide12_Tailoring-Machines-Women/img01.png",
    fallbackSrc: "/event_livelihood.jpg",
    category: "AKR Trust Events",
    titleEn: "Sewing Machines for Women’s Livelihood",
    titleTa: "பெண்களுக்கு தையல் இயந்திரங்கள் — வாழ்வாதாரம்",
    descEn: "AKR Trust handing tailoring machines so women can earn from home-based work.",
    descTa: "ஏ.கே.ஆர் அறக்கட்டளை மூலம் பெண்கள் வீட்டிலிருந்தே வருமானம் ஈட்ட தையல் இயந்திரங்கள் வழங்கல்."
  },
  {
    id: 14,
    src: "/gallery/slide22_AKR-Trust-AnnualWelfareFunction/img01.png",
    fallbackSrc: "/9th_day_celebration.jpg",
    category: "AKR Trust Events",
    titleEn: "AKR Trust Annual Welfare Function",
    titleTa: "ஏ.கே.ஆர் அறக்கட்டளை ஆண்டு நல விழா",
    descEn: "Annual gathering distributing food, livelihood aids and welfare support to thousands.",
    descTa: "ஆயிரக்கணக்கான பயனாளிகளுக்கு உணவு, வாழ்வாதார உதவிகள் மற்றும் நலத்திட்டங்கள் வழங்கிய ஆண்டு விழா."
  },
  {
    id: 15,
    src: "/gallery/slide23_Birthday-Celebration-Karunagarajan-Priya/img02.png",
    fallbackSrc: "/9th_day_celebration.jpg",
    category: "AKR Trust Events",
    titleEn: "Foundation Day Celebration with Beneficiaries",
    titleTa: "அறக்கட்டளை ஆண்டு விழா — பயனாளிகளுடன்",
    descEn: "Celebrating another year of AKR Trust service with elders, families and community leaders.",
    descTa: "முதியோர், குடும்பங்கள் மற்றும் சமூகத் தலைவர்களுடன் அறக்கட்டளை சேவை ஆண்டு விழா கொண்டாட்டம்."
  },

  // Political
  {
    id: 16,
    src: "/gallery/slide16_Career-Start-BJP/img01.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Beginning a Career in Public Service (BJP)",
    titleTa: "பொது சேவையில் அரசியல் பயணத்தின் தொடக்கம்",
    descEn: "Early years joining the BJP and committing to grassroots work in Madhavaram.",
    descTa: "பா.ஜ.க-வில் இணைந்து மாதவரம் அடிப்படை மக்கள் பணிக்கு அர்ப்பணித்த தொடக்க காலம்."
  },
  {
    id: 17,
    src: "/gallery/slide17_Birthday-SyamaPrasadMukherjee/img04.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Shyama Prasad Mukherjee Jayanti Observance",
    titleTa: "சியாமா பிரசாத் முகர்ஜி ஜெயந்தி நிகழ்வு",
    descEn: "Paying tribute to Dr. Shyama Prasad Mukherjee with cadre and community programmes.",
    descTa: "டாக்டர் சியாமா பிரசாத் முகர்ஜிக்கு அஞ்சலி — தொண்டர்கள் மற்றும் சமூக நிகழ்ச்சிகளுடன்."
  },
  {
    id: 18,
    src: "/gallery/slide18_Birthday-AtalBihariVajpayee/img02.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Atal Bihari Vajpayee Jayanti Celebration",
    titleTa: "அடல் பிஹாரி வாஜ்பாய் ஜெயந்தி கொண்டாட்டம்",
    descEn: "Commemorating former PM Atal Bihari Vajpayee with cultural programmes and public meetings.",
    descTa: "முன்னாள் பிரதமர் அடல் பிஹாரி வாஜ்பாயை நினைவுகூரும் பொதுக்கூட்டம் மற்றும் நிகழ்ச்சிகள்."
  },
  {
    id: 19,
    src: "/gallery/slide19_Birthday-DrBRAmbedkar/img03.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "Dr. B.R. Ambedkar Jayanti Observance",
    titleTa: "டாக்டர் பி.ஆர். அம்பேத்கர் ஜெயந்தி நிகழ்வு",
    descEn: "Honouring Babasaheb Ambedkar’s legacy with community gatherings and welfare outreach.",
    descTa: "பாபா சாஹेप் அம்பேத்கர் நினைவில் சமூக நிகழ்ச்சிகள் மற்றும் நலத்திட்ட பணிகள்."
  },
  {
    id: 20,
    src: "/gallery/slide20_RSS-Rally-Mathur/img03.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Political",
    titleEn: "RSS Rally in Mathur",
    titleTa: "மத்தூரில் ஆர்.எஸ்.எஸ். பேரணி",
    descEn: "Participating in an RSS path sanchalan rally through Mathur with local volunteers.",
    descTa: "மத்தூர் பகுதியில் உள்ளூர் தொண்டர்களுடன் ஆர்.எஸ்.எஸ். பாத சஞ்சலன் பேரணியில் பங்கேற்பு."
  },

  // Media Coverage
  {
    id: 22,
    src: "/gallery/slide24_Media-Coverage-1/img01.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Media Coverage",
    titleEn: "Tamil Press — Welfare Work in Headlines",
    titleTa: "தமிழ் நாளிதழ்கள் — நலப் பணி செய்திகள்",
    descEn: "Regional dailies covering AKR Trust pension drives and community service in Madhavaram.",
    descTa: "மாதவரம் நலப் பணிகள் மற்றும் முதியோர் ஓய்வூதியம் — தமிழ் நாளிதழ் செய்திகள்."
  },
  {
    id: 23,
    src: "/gallery/slide24_Media-Coverage-1/img04.png",
    fallbackSrc: "/agr_large.jpg",
    category: "Media Coverage",
    titleEn: "GEM TV — Community Food Service",
    titleTa: "GEM TV — சமூக உணவு வழங்கல் செய்தி",
    descEn: "Television coverage of large-scale food distribution for residents during a community event.",
    descTa: "சமூக நிகழ்வில் பல்லாயிரக்கணக்கான மக்களுக்கு உணவு வழங்கிய சேவை — தொலைக்காட்சி செய்தி."
  },
  {
    id: 24,
    src: "/gallery/slide25_Media-Coverage-2/img04.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Media Coverage",
    titleEn: "Press Briefing on Public Welfare",
    titleTa: "மக்கள் நலம் குறித்த பத்திரிகையாளர் சந்திப்பு",
    descEn: "Addressing reporters on ongoing welfare programmes and grassroots outreach in Chennai West.",
    descTa: "மேற்கு சென்னையில் நடைபெறும் நலத்திட்டங்கள் குறித்து ஊடகங்களுக்கு விளக்கம்."
  },
  {
    id: 25,
    src: "/gallery/slide25_Media-Coverage-2/img02.png",
    fallbackSrc: "/journey_image.jpg",
    category: "Media Coverage",
    titleEn: "Newspaper Feature — Grassroots Leadership",
    titleTa: "நாளிதழ் சிறப்புக் கட்டுரை — களப் பணி",
    descEn: "Print media highlighting decades of ward-level service and AKR Trust initiatives.",
    descTa: "பல தசாப்தங்களின் களப் பணியும் ஏ.கே.ஆர் அறக்கட்டளை முயற்சிகளும் — நாளிதழ் சிறப்பு."
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

            {/* Clean Minimalistic Tabs (Scrollable on Mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
              {CATEGORIES.map(category => {
                const isActive = activeTab === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
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
                        loading="lazy"
                        width="600"
                        height="450"
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-6 lg:p-10 animate-fade-in select-none"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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
            className="absolute left-2 sm:left-6 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
            }}
            className="absolute right-2 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image & Caption container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#0A1128] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[90vh]"
          >
            {/* Scrollable container for whole modal on very small mobile viewports */}
            <div className="overflow-y-auto flex flex-col w-full h-full">
              <div className="bg-black flex items-center justify-center min-h-[220px] max-h-[45vh] sm:max-h-[60vh] p-3 relative">
                <img
                  src={currentItem.src}
                  alt={isTa ? currentItem.titleTa : currentItem.titleEn}
                  className="max-h-[40vh] sm:max-h-[55vh] w-auto object-contain rounded"
                  onError={(e) => {
                    if (e.target.src !== window.location.origin + currentItem.fallbackSrc) {
                      e.target.src = currentItem.fallbackSrc;
                    } else {
                      e.target.src = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
                    }
                  }}
                />
              </div>
              <div className="p-4 sm:p-6 text-white bg-[#0A1128] border-t border-white/5">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#EA580C] uppercase tracking-wider block mb-1">
                  {getCategoryLabel(currentItem.category)}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {isTa ? currentItem.titleTa : currentItem.titleEn}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {isTa ? currentItem.descTa : currentItem.descEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
