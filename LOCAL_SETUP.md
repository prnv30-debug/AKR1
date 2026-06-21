# Local Development Setup

This guide explains how to run the **AKR Social Welfare Trust** site on your machine (macOS, Linux, or Windows).

## Stack overview

| Layer | Technology |
|---|---|
| Frontend | React 19 + Create React App (CRACO) + Tailwind CSS + shadcn/ui |
| Backend | FastAPI + Uvicorn + Motor (async MongoDB driver) |
| Database | MongoDB Atlas (cloud) or local MongoDB |

---

## Prerequisites

Install these before you begin:

1. **Node.js 18+** and **npm** — [nodejs.org](https://nodejs.org/)
2. **Python 3.11+** — [python.org](https://www.python.org/downloads/)
3. **MongoDB Atlas** account (free tier) — [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

Optional: **Git** to clone the repository.

---

## 1. Clone and open the project

```bash
git clone <your-repo-url>
cd AKR1
```

---

## 2. MongoDB Atlas setup

1. Create a free **M0** cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Add a database user (username + password).
3. Under **Network Access**, allow your IP (or `0.0.0.0/0` for development).
4. Copy the connection string from **Connect → Drivers**:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## 3. Backend setup

Run all backend commands from the **repository root** (`AKR1/`).

### Create a Python virtual environment

**macOS / Linux:**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows (PowerShell):**

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**

```cmd
python -m venv .venv
.venv\Scripts\activate.bat
```

### Install dependencies

```bash
pip install -r api/requirements.txt
```

### Configure environment variables

```bash
cp api/.env.example api/.env
```

Edit `api/.env` and set:

| Variable | Required | Example |
|---|---|---|
| `MONGO_URL` | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DB_NAME` | No (default: `akr_trust`) | `akr_trust` |
| `CORS_ORIGINS` | No | `http://localhost:3000,http://127.0.0.1:3000` |

### Start the API

From the repo root (with venv activated):

```bash
uvicorn api.index:app --reload
```

Expected output:

```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     AKR Trust API starting — db=akr_trust
INFO:     MongoDB connection verified
```

Verify: open [http://localhost:8000/api/](http://localhost:8000/api/) — you should see:

```json
{"message":"AKR Trust API is running"}
```

API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Logs

Rotating log files are written to:

- `logs/access.log` — every HTTP request
- `logs/error.log` — failed requests and exceptions

---

## 4. Frontend setup

Open a **second terminal** (keep the backend running).

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Edit `frontend/.env` if needed:

| Variable | Local value | Production (Vercel) |
|---|---|---|
| `REACT_APP_BACKEND_URL` | `http://localhost:8000` | *(empty string)* |

The dev server opens at [http://localhost:3000](http://localhost:3000).

---

## 5. Test the full stack

1. Open [http://localhost:3000](http://localhost:3000).
2. Scroll to **Get Involved** and submit the **Volunteer** form.
3. Submit the **Contact** form.
4. Confirm entries in MongoDB Atlas → **Browse Collections** → `volunteers` / `contacts`.

---

## Quick reference

| Service | URL | Start command |
|---|---|---|
| Frontend | http://localhost:3000 | `cd frontend && npm start` |
| Backend API | http://localhost:8000 | `uvicorn api.index:app --reload` |
| API docs | http://localhost:8000/docs | (automatic with backend) |

---

## Project structure

```
AKR1/
├── api/                    # FastAPI backend (local + Vercel serverless)
│   ├── index.py            # App entry — uvicorn api.index:app
│   ├── logging_config.py   # Rotating access/error logs
│   ├── requirements.txt
│   └── .env.example
├── frontend/               # React SPA
│   ├── src/
│   ├── package.json
│   └── .env.example
├── backend/                # Legacy local copy (not used — see note below)
├── logs/                   # Runtime logs (gitignored)
├── vercel.json             # Vercel deployment config
└── LOCAL_SETUP.md          # This file
```

> **Note:** The `backend/` folder is a legacy duplicate kept for reference. Local development uses `api/index.py` — the same code path Vercel deploys.

---

## Troubleshooting

### `RuntimeError: MONGO_URL env var is required`

Copy `api/.env.example` to `api/.env` and set `MONGO_URL`. Restart uvicorn.

### `npm install` fails with peer dependency errors

Ensure `date-fns` is `3.6.0` in `frontend/package.json` (compatible with `react-day-picker@8`). Run:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Form submissions fail with network errors

- Confirm the backend is running on port **8000**.
- Confirm `frontend/.env` has `REACT_APP_BACKEND_URL=http://localhost:8000`.
- Restart the frontend after changing `.env` (CRA reads env vars at build/start time).

### MongoDB connection errors

- Check username/password in the Atlas connection string.
- Confirm your IP is allowed in Atlas **Network Access**.
- Check `logs/error.log` for details.

### Port already in use

**Backend (8000):**

```bash
uvicorn api.index:app --reload --port 8001
```

Then set `REACT_APP_BACKEND_URL=http://localhost:8001` in `frontend/.env`.

**Frontend (3000):** When prompted, choose another port or set `PORT=3001 npm start`.

---

## Vercel deployment (production)

Production uses the same `api/index.py` via Vercel serverless functions. Set these in Vercel → **Environment Variables**:

| Variable | Value |
|---|---|
| `MONGO_URL` | Atlas connection string |
| `DB_NAME` | `akr_trust` |
| `REACT_APP_BACKEND_URL` | *(empty string)* |
| `CORS_ORIGINS` | optional — defaults to `*` |

See [README.md](./README.md) for the full Vercel deployment guide.

---

## Platform notes

### macOS

Use Homebrew Python or python.org installer. Activate venv with `source .venv/bin/activate`.

### Linux

Install `python3-venv` if venv creation fails:

```bash
sudo apt install python3-venv   # Debian/Ubuntu
```

### Windows

Use PowerShell or Command Prompt. If script execution is blocked:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Use `python` instead of `python3` if only the Windows launcher is installed.
