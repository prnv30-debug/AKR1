# Kumaran · AGR Trust — Promotional Portfolio Website

## Original Problem Statement
"portfolio and marketing website for a polititian with a ngo teust it shd be like a promotional website"

User input:
- Politician name: **Kumaran**
- NGO Trust name: **AGR**
- All other details filled by main agent.

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui + lucide-react + sonner.
  - Single-page promotional site with hash-routed sections.
- **Backend**: FastAPI + Motor (Mongo).
  - `/api/volunteers` (POST/GET), `/api/contacts` (POST/GET), `/api/stats` (GET).
- **Design**: Light theme, navy + orange. Outfit / IBM Plex Sans / Cormorant Garamond.

## User Personas
- Public visitor / supporter (browses, donates, signs up).
- Volunteer applicant (submits form).
- Journalist / partner (uses contact form).

## Core Requirements (static)
- Hero with politician's vision + CTA
- Bio / Journey timeline
- Vision & Manifesto pillars
- AGR NGO Trust impact (stats + gallery)
- Events & Campaign cards
- Volunteer + Contact forms wired to backend
- Donate CTA (static, no payment gateway yet)
- Responsive across mobile / tablet / desktop

## Implemented (Dec 2025)
- [x] FastAPI endpoints for volunteers, contacts, stats
- [x] Mongo persistence with UUID ids + ISO datetimes
- [x] Navbar (sticky, glassmorphic), Hero, Journey, Vision, AGR, Events, Involved (forms), Footer
- [x] Toast notifications via sonner
- [x] All interactive elements with `data-testid`
- [x] Tested end-to-end (testing_agent_v3 iteration_1.json → 100% pass)

## Backlog
- **P1**: Real donation flow (Razorpay / Stripe) with 80G receipt PDF email.
- **P1**: Admin dashboard to view volunteer + contact submissions.
- **P2**: Multilingual support (Tamil + English toggle).
- **P2**: News / press release CMS section.
- **P2**: Photo & video gallery with lightbox.
- **P2**: Newsletter signup + email automation (Resend / SendGrid).

## Next Tasks
- Integrate Razorpay for donations once user provides keys.
- Add admin login + protected dashboard for form submissions.
