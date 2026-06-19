/**
 * SITE CONFIG — Kumaran · AGR Trust
 * -----------------------------------------------------------
 * Edit any value here and the whole site updates automatically.
 * Replace image URLs by uploading new pics — I'll paste the URL.
 * -----------------------------------------------------------
 */

export const site = {
  // Brand
  brand: {
    name: "Kumaran",
    accent: ".", // small accent after the name in logo/footer
    tagline: "People's Leader · Public Servant",
    trustName: "AGR Trust",
  },

  // Hero
  hero: {
    image: "https://customer-assets.emergentagent.com/job_impact-voice/artifacts/htnjn8mo_hero.jpeg",
    headlineLine1: "A vision for",
    headlineLine2Prefix: "tomorrow.",
    headlineItalic: "Rooted",
    headlineLine3: "in the people.",
    description:
      "Kumaran — a tireless voice for the under-served, founder of the AGR Trust, and a leader committed to dignity, opportunity and progress for every household.",
    primaryCta: { label: "Join the Movement", href: "#volunteer" },
    secondaryCta: { label: "Read the Journey", href: "#journey" },
    manifestoLabel: "Manifesto, 2026",
    manifestoQuote: "Service is not a season. It is a way of life.",
    stats: [
      { value: "22+", label: "Years of service" },
      { value: "184", label: "Villages reached" },
      { value: "52K+", label: "Lives impacted" },
    ],
    ticker: [
      "Education for every child",
      "Healthcare at the doorstep",
      "Skills · Jobs · Dignity",
      "Clean water for every village",
      "Empowering women entrepreneurs",
      "Sustainable agriculture",
    ],
  },

  // About / Journey
  journey: {
    image:
      "https://images.unsplash.com/photo-1618306842557-a2515acf2112?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMGxlYWRlcnxlbnwwfHx8fDE3ODE3MDk0MTV8MA&ixlib=rb-4.1.0&q=85",
    eyebrow: "01 — The Journey",
    title: "From a farming village to the people's benches.",
    description:
      "Four decades of public service — built quietly, brick by brick — across classrooms, panchayats, hospitals and parliament floors.",
    milestones: [
      {
        year: "1978",
        title: "Born in a small farming village",
        body: "Growing up in a household of teachers and farmers, Kumaran learned the meaning of community and shared sacrifice early on.",
      },
      {
        year: "2001",
        title: "First grassroots campaign",
        body: "Organised a clean-water initiative across 14 villages, mobilising youth volunteers and local administration to deliver lasting infrastructure.",
      },
      {
        year: "2009",
        title: "Founded the AGR Trust",
        body: "A non-political NGO focused on education, women empowerment and rural healthcare — now active across 184 villages.",
      },
      {
        year: "2014",
        title: "Elected representative",
        body: "Won a landslide constituency mandate. Championed legislation on rural schooling, MSME credit access and women safety.",
      },
      {
        year: "2020",
        title: "Pandemic response",
        body: "Coordinated relief for over 200,000 families, delivering rations, oxygen and emergency medical aid through the AGR network.",
      },
      {
        year: "Today",
        title: "Building a brighter tomorrow",
        body: "Leading a renewed campaign focused on jobs, education and dignity — written and shaped by the people themselves.",
      },
    ],
  },

  // Vision & Manifesto pillars (icon names from lucide-react)
  vision: {
    eyebrow: "02 — Vision & Manifesto",
    title: ["Six promises.", "Written with the people, for the people."],
    quote:
      "A manifesto is not a list. It is a contract — signed in trust, redeemed in action.",
    quoteAuthor: "Kumaran",
    pillars: [
      { icon: "GraduationCap", title: "Education for every child", body: "Modern classrooms, English-medium options, and scholarships for every deserving student across rural India." },
      { icon: "HeartPulse", title: "Healthcare at the doorstep", body: "Mobile clinics, free diagnostics, and dignified maternal care delivered to every village." },
      { icon: "Briefcase", title: "Jobs & livelihoods", body: "Skill centres, MSME credit access, and entrepreneurship grants for youth and women." },
      { icon: "Sprout", title: "Sustainable farming", body: "Fair prices, water security and modern techniques to make agriculture profitable again." },
      { icon: "Users", title: "Women & safety", body: "Stronger laws, self-defence training, and microfinance circles to put power in women's hands." },
      { icon: "Building2", title: "Infrastructure that lasts", body: "All-weather roads, clean drinking water, and digital connectivity for every panchayat." },
    ],
  },

  // AGR NGO Trust
  agr: {
    eyebrow: "03 — AGR NGO Trust",
    titleLine1: "Transforming lives,",
    titleItalic: "one village",
    titleLine2: "at a time.",
    description:
      "Founded in 2009, AGR Trust is a non-political grassroots organisation dedicated to education, healthcare and women empowerment. Powered by 2,400+ volunteers — funded entirely by individual donors.",
    stats: [
      { value: 52000, suffix: "+", label: "Lives impacted" },
      { value: 184, suffix: "", label: "Villages reached" },
      { value: 36, suffix: "", label: "Schools supported" },
      { value: 2400, suffix: "+", label: "Active volunteers" },
    ],
    gallery: {
      large: {
        image:
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwyfHxpbmRpYSUyMGNoYXJpdHklMjBuZ28lMjBzb2NpYWwlMjB3b3JrfGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85",
        label: "Education",
        caption: "Sponsoring 12,400 students across 36 schools",
      },
      small1: {
        image:
          "https://images.unsplash.com/photo-1692609659165-1ec4d8108c0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwzfHxpbmRpYSUyMGNoYXJpdHklMjBuZ28lMjBzb2NpYWwlMjB3b3JrfGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85",
        label: "Women",
        caption: "1,800+ women in self-help groups",
      },
      small2: {
        image:
          "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGNoYXJpdHklMjBuZ28lMjBzb2NpYWwlMjB3b3JrfGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85",
        label: "Healthcare",
        caption: "112 free medical camps last year",
      },
    },
  },

  // Events
  events: {
    eyebrow: "04 — Events & Campaign",
    title: "On the road. Meet us next.",
    ctaLabel: "Host us in your town",
    ctaHref: "#involved",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1715351151262-6b1e1cee2318?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBjcm93ZCUyMHB1YmxpYyUyMHJhbGx5fGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85",
        date: "Dec 22, 2025",
        location: "Madurai Town Hall",
        title: "Youth & Jobs — Open Town Hall",
        desc: "An open dialogue with first-time voters, entrepreneurs and college students on skills, startups and the road ahead.",
        tag: "Town Hall",
      },
      {
        image:
          "https://images.unsplash.com/photo-1713001075225-8c490e800e29?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8NjA2MjJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcm93ZCUyMHB1YmxpYyUyMHJhbGx5fGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85",
        date: "Jan 08, 2026",
        location: "Trichy District Ground",
        title: "Vision 2030 — Public Address",
        desc: "Launching the 10-year roadmap for education, agriculture and women-led entrepreneurship in the region.",
        tag: "Rally",
      },
      {
        image:
          "https://images.unsplash.com/photo-1715351151262-6b1e1cee2318?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBjcm93ZCUyMHB1YmxpYyUyMHJhbGx5fGVufDB8fHx8MTc4MTcwOTQxNXww&ixlib=rb-4.1.0&q=85",
        date: "Jan 26, 2026",
        location: "Pondicherry Beach Promenade",
        title: "Republic Day Yatra",
        desc: "A coastal march for unity, dignity and the dreams of a new India — joined by AGR Trust volunteers and youth groups.",
        tag: "Yatra",
      },
    ],
  },

  // Get Involved (forms + donate)
  involved: {
    eyebrow: "05 — Get Involved",
    titleLine1: "This movement belongs",
    titleItalic: "you.",
    description:
      "Volunteer your time, share your story, or simply say hello. Every voice makes the wave.",
    volunteerInterests: [
      "Door to door campaign",
      "Event coordination",
      "Social media",
      "AGR Trust programmes",
      "Translation",
      "Other",
    ],
    donate: {
      eyebrow: "Stand with us",
      title: "Donate to the AGR Trust today.",
      description:
        "100% of contributions go directly to programmes on the ground — education, healthcare, and women-led livelihoods.",
      ctaLabel: "Donate Now",
      ctaHref: "#volunteer",
      footnote: "80G tax exemption available",
    },
  },

  // Navigation
  nav: {
    links: [
      { href: "#journey", label: "Journey" },
      { href: "#vision", label: "Vision" },
      { href: "#agr", label: "AGR Trust" },
      { href: "#events", label: "Events" },
      { href: "#involved", label: "Get Involved" },
    ],
  },

  // Footer / Contact
  footer: {
    address: [
      "AGR Trust Bhavan, 14 Gandhi Road,",
      "Madurai 625001, Tamil Nadu, India",
    ],
    email: "hello@kumaran.in",
    social: [
      { icon: "Facebook", label: "facebook", href: "#" },
      { icon: "Twitter", label: "twitter", href: "#" },
      { icon: "Instagram", label: "instagram", href: "#" },
      { icon: "Youtube", label: "youtube", href: "#" },
    ],
    rights: "All rights reserved.",
    designedBy: "Designed for the people · Built with conviction",
  },
};

export default site;
