# Kumaran M.A. · AKR Social Welfare Trust — Vercel Deployment Guide

> Promotional website for **Kumaran M.A.**, General Secretary, BJP Chennai West District &amp; Founder, AKR Social Welfare Trust.

A single React + Tailwind frontend with a FastAPI serverless backend. Built to deploy on **Vercel** in under 10 minutes with a free MongoDB Atlas database.

---

## What you'll need (all free)

1. A **GitHub** account — to host the code.
2. A **Vercel** account — to deploy. Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3. A **MongoDB Atlas** account — to host the database for volunteer / contact form submissions. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

That's it. No Render, no Railway, no other service.

---

## Step 1 — Push the code to GitHub

In your Emergent workspace, click **"Save to GitHub"** and pick (or create) a repo.

---

## Step 2 — Create a free MongoDB Atlas database

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2. Click **"Build a Database"** → choose **M0 Free** → pick the closest region → create cluster.
3. Under **Database Access** → **Add New Database User** → set a username + password (save them).
4. Under **Network Access** → **Add IP Address** → **"Allow access from anywhere"** (`0.0.0.0/0`).
5. Under **Database** → **Connect** → **Drivers** → copy the connection string. It looks like:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   Replace `<username>` and `<password>` with the ones you just created.

---

## Step 3 — Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **"Import"** next to your GitHub repo.
3. Vercel auto-detects everything — **don't change** the build settings, they're handled by `vercel.json`.
4. Click **"Environment Variables"** and add these three:

   | Name | Value |
   |---|---|
   | `MONGO_URL` | the Atlas connection string from Step 2 |
   | `DB_NAME` | `akr_trust` |
   | `REACT_APP_BACKEND_URL` | leave **blank** (empty string) |

5. Click **Deploy**. Done in ~2 minutes.

---

## Step 4 — Test it

Open the deployment URL Vercel gives you. Try:

- Navigating sections.
- Submitting the **Volunteer** form.
- Submitting the **Contact** form.
- Clicking **"Write to the Trust"** in the AKR section (mailto).

Submissions are saved in MongoDB Atlas — you can view them in Atlas → Collections → `volunteers` / `contacts`.

---

## Required environment variables

| Name | Where | Required | Example |
|---|---|---|---|
| `MONGO_URL` | Vercel | ✅ | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DB_NAME` | Vercel | ✅ | `akr_trust` |
| `REACT_APP_BACKEND_URL` | Vercel | ✅ | *(empty string)* — keep blank |
| `CORS_ORIGINS` | Vercel | optional | `*` (default) |

---

## Project structure

```
/
├── api/                       ← Vercel Python serverless backend
│   ├── index.py               ← FastAPI app entry
│   └── requirements.txt
├── frontend/                  ← React + Tailwind + shadcn/ui
│   ├── src/
│   │   ├── App.js
│   │   ├── content/
│   │   │   └── site.config.js ← All site content (edit here!)
│   │   ├── components/site/   ← Page sections
│   │   └── lib/api.js         ← API client
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── vercel.json                ← Vercel config (build + routing)
├── .vercelignore              ← Files Vercel skips
├── .gitignore
└── README.md                  ← (this file)
```

---

## Editing content

All site copy, images and stats live in **one file**:

```
frontend/src/content/site.config.js
```

Edit it, push to GitHub, and Vercel auto-redeploys.

---

## Local development (optional)

```bash
# Frontend
cd frontend
yarn install
yarn start                       # localhost:3000

# Backend (FastAPI) — uses /backend folder for local dev only
cd backend
pip install -r requirements.txt
uvicorn server:app --reload      # localhost:8001
```

> Note: For **local** dev set `REACT_APP_BACKEND_URL=http://localhost:8001` in `frontend/.env`. On Vercel keep it blank.

---

## Custom domain

In Vercel → Project → Settings → Domains → add your domain. Vercel handles SSL automatically.

---

## Built with

- React 19 + Tailwind CSS + shadcn/ui + lucide-react
- FastAPI (Vercel Python serverless) + Motor (async MongoDB)
- MongoDB Atlas

For questions about the trust: **akrsocialwelfaretrust@gmail.com**
