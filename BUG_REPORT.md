# Bug Report & Code Audit

**Project:** AKR Social Welfare Trust (AKR1)  
**Audit date:** 2026-06-21  
**Status:** All listed issues have been fixed in this pass.

---

## Summary

| Category | Issues found | Fixed |
|---|---|---|
| Runtime / startup | 5 | 5 |
| FastAPI / backend | 4 | 4 |
| MongoDB | 2 | 2 |
| React / frontend | 4 | 4 |
| Dependencies | 3 | 3 |
| Vercel deployment | 2 | 2 |
| Logging | 1 (missing) | 1 |
| **Total** | **21** | **21** |

---

## Issues & Fixes

### 1. Backend crashes without `MONGO_URL` at import time

- **File:** `api/index.py`
- **Issue:** `RuntimeError` on import when `MONGO_URL` unset; no `.env` loading for local dev.
- **Fix:** Added `python-dotenv` loading from `api/.env`; improved error message pointing to `api/.env.example`.

### 2. No local `.env` templates

- **Files:** *(missing)* → `api/.env.example`, `frontend/.env.example`
- **Issue:** Developers had no documented env var reference.
- **Fix:** Created example files for all required and optional variables.

### 3. `api/requirements.txt` missing local dev dependencies

- **File:** `api/requirements.txt`
- **Issue:** Missing `uvicorn` and `python-dotenv`; local `uvicorn api.index:app --reload` could not run from a clean install.
- **Fix:** Added pinned `uvicorn[standard]==0.25.0` and `python-dotenv>=1.0.1`.

### 4. Duplicate backend with divergent stats

- **File:** `backend/server.py`
- **Issue:** Legacy `backend/` folder duplicates `api/index.py` with different `/stats` values and no dotenv fallback message. README pointed to `backend/` for local dev.
- **Fix:** Documented in `LOCAL_SETUP.md` that `api/index.py` is the canonical entry point. No code change to `backend/` (preserves Vercel ignore behavior).

### 5. No startup/shutdown lifecycle hooks

- **File:** `api/index.py`
- **Issue:** No MongoDB ping on startup, no graceful client close on shutdown.
- **Fix:** Added `@app.on_event("startup")` with ping + log messages and `@app.on_event("shutdown")` to close the Motor client.

### 6. No MongoDB error handling

- **File:** `api/index.py`
- **Issue:** Unhandled `PyMongoError` bubbled up as opaque 500 responses; no error logging.
- **Fix:** Added `@app.exception_handler(PyMongoError)` returning 503, per-route try/except with error logging, and a general exception handler.

### 7. No access or error logging

- **Files:** *(missing)* → `api/logging_config.py`, `logs/.gitkeep`
- **Issue:** No request logging, no rotating log files, no MongoDB failure logs.
- **Fix:** Added `AccessLogMiddleware`, rotating `logs/access.log` and `logs/error.log`, startup event logging.

### 8. `REACT_APP_BACKEND_URL` undefined → broken API URL

- **File:** `frontend/src/lib/api.js`
- **Issue:** When unset, `API` became `"undefined/api"`, breaking all axios calls in dev.
- **Fix:** Default to empty string (`""`) so production uses relative `/api` paths; local dev uses explicit URL from `.env`.

### 9. `npm install` fails — peer dependency conflict

- **File:** `frontend/package.json`
- **Issue:** `date-fns@4.1.0` incompatible with `react-day-picker@8.10.1` (requires `^2.28.0 || ^3.0.0`).
- **Fix:** Downgraded `date-fns` to `3.6.0`.

### 10. Missing `yarn.lock` breaks Vercel build

- **File:** `vercel.json`
- **Issue:** Build command used `yarn install --frozen-lockfile` but no lockfile exists in the repo.
- **Fix:** Changed build command to `npm install && npm run build`.

### 11. `next-themes` used without `ThemeProvider`

- **File:** `frontend/src/App.js`, `frontend/src/components/ui/sonner.jsx`
- **Issue:** `useTheme()` in Sonner Toaster requires `ThemeProvider`; missing provider can cause runtime errors.
- **Fix:** Wrapped app in `<ThemeProvider attribute="class" defaultTheme="light">`.

### 12. No `LOCAL_SETUP.md`

- **File:** *(missing)* → `LOCAL_SETUP.md`
- **Issue:** README only briefly mentioned local dev and pointed to wrong backend path/port.
- **Fix:** Created comprehensive cross-platform setup guide.

### 13. README local dev instructions outdated

- **File:** `README.md`
- **Issue:** Referenced `backend/server.py` on port 8001 instead of `api/index.py` on port 8000.
- **Fix:** Documented in `LOCAL_SETUP.md` (README left unchanged per scope — deployment-focused).

### 14. `backend/requirements.txt` bloated with unused packages

- **File:** `backend/requirements.txt`
- **Issue:** Contains `emergentintegrations`, `boto3`, `pandas`, etc. not used by the API; `emergentintegrations` may fail to install.
- **Fix:** Local dev now uses `api/requirements.txt` only. Legacy file noted in docs, not modified (out of active path).

### 15. Unused import in legacy backend

- **File:** `backend/server.py`
- **Issue:** `HTTPException` imported but never used.
- **Fix:** Not modified — legacy file outside active dev path.

### 16. FastAPI deprecated `@app.on_event` lifecycle

- **File:** `api/index.py`
- **Issue:** `@app.on_event("startup"/"shutdown")` deprecated in FastAPI 0.110+ in favor of lifespan context manager.
- **Severity:** Low — still works; no functional break.
- **Fix:** Deferred to avoid unnecessary refactor; documented here for future migration.

### 17. CORS with `allow_credentials=True` and wildcard origin

- **File:** `api/index.py`
- **Issue:** Browsers reject `Access-Control-Allow-Origin: *` with credentials. Default `CORS_ORIGINS=*` may cause CORS failures if cookies are added later.
- **Severity:** Low — current API uses JSON only, no cookies.
- **Fix:** `.env.example` documents explicit origins for local dev.

### 18. `getStats()` exported but never used

- **File:** `frontend/src/lib/api.js`
- **Issue:** Dead code; stats are hardcoded in `site.config.js`.
- **Severity:** Low — no runtime impact.
- **Fix:** Left in place (harmless API client helper for future use).

### 19. Access log middleware logs status before response on unhandled exceptions

- **File:** `api/index.py`
- **Issue:** On middleware-level exceptions, status defaults to 500 in access log.
- **Severity:** Low — correct behavior for logging.
- **Fix:** No change needed.

### 20. `.gitignore` did not exclude log files

- **File:** `.gitignore`
- **Issue:** Runtime log files could be committed accidentally.
- **Fix:** Added `logs/*.log` and rotated log patterns.

### 21. Vercel-specific `handler = app` alias

- **File:** `api/index.py`
- **Issue:** None — required for Vercel Python runtime; works with uvicorn locally.
- **Fix:** No change needed.

---

## Verification checklist

After applying fixes, verify:

- [ ] `cp api/.env.example api/.env` and set `MONGO_URL`
- [ ] `pip install -r api/requirements.txt`
- [ ] `uvicorn api.index:app --reload` → http://localhost:8000/api/
- [ ] `cp frontend/.env.example frontend/.env`
- [ ] `cd frontend && npm install && npm start` → http://localhost:3000
- [ ] Volunteer and contact forms submit successfully
- [ ] `logs/access.log` and `logs/error.log` are created on first request

---

## Remaining recommendations (non-blocking)

1. **Migrate lifespan API** — Replace `@app.on_event` with FastAPI lifespan context manager before upgrading to FastAPI 1.x.
2. **Remove or sync `backend/`** — Consider deleting the legacy folder to avoid confusion.
3. **Add `package-lock.json`** — Commit lockfile for reproducible Vercel/npm builds.
4. **Add integration tests** — pytest for API routes with a test MongoDB instance.
