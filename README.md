# Yogi BJJ Website

Swedish BJJ academy website — React 19, TypeScript, Tailwind v4, Vite, Express.

---

## Local development

```bash
cp .env.example .env
# fill in your values
npm install
npm run dev:all
```

- Frontend: `http://localhost:5180`
- Backend:  `http://localhost:4000`
- Health:   `http://localhost:4000/health`

Run E2E tests (starts servers automatically):

```bash
npm run test:e2e
```

---

## Project structure

```
src/           React frontend
server/        Express backend (shared between local and Vercel)
  app.ts       Express app (no listen — imported by index.ts and api/index.ts)
  index.ts     Local dev entrypoint (calls app.listen)
  routes/      Route handlers
  services/    Business logic (CRM, WhatsApp message storage)
  data/        Local JSON storage (git-ignored)
api/
  index.ts     Vercel serverless function entrypoint (exports app)
vercel.json    Vercel route rewrites
```

---

## Deploying to Vercel + Meta WhatsApp Production Setup

### Architecture

Vercel hosts both the React frontend and the Express backend as a single project:

- **Frontend** — Vite builds `dist/`. Vercel serves it automatically (SPA fallback included).
- **Backend** — `api/index.ts` exports the Express app as a Vercel serverless function. All `/api/*`, `/webhook`, and `/health` traffic is rewritten to it via `vercel.json`.

### 1 — Deploy to Vercel

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel detects Vite automatically. Leave framework as **Vite**.
4. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. Click **Deploy**.

### 2 — Environment variables

Add these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Description |
|---|---|
| `FRONTEND_URL` | Your Vercel frontend URL, e.g. `https://yogui-bjj.vercel.app` |
| `META_ACCESS_TOKEN` | Permanent system user token with `whatsapp_business_messaging` permission |
| `PHONE_NUMBER_ID` | Phone Number ID from Meta → WhatsApp → API Setup |
| `WABA_ID` | WhatsApp Business Account ID |
| `VERIFY_TOKEN` | Secret string you choose — must match what you enter in Meta Webhooks |
| `META_APP_SECRET` | App Secret from Meta → App Settings → Basic |
| `ACADEMY_WHATSAPP_NUMBER` | Academy's own WhatsApp number in E.164 format (e.g. `+46701234567`) |

> **Do not add `PORT`** — Vercel manages the port automatically.

### 3 — Routes handled on Vercel

| Route | Method | Description |
|---|---|---|
| `/api/leads` | POST | Save an intresseanmälan lead |
| `/api/questions` | POST | Save a contact-form question |
| `/api/health` | GET | Health check (used by Playwright probe) |
| `/health` | GET | Health check (canonical production endpoint) |
| `/webhook` | GET | Meta webhook verification |
| `/webhook` | POST | Incoming WhatsApp messages |

### 4 — Register the Meta webhook

Once deployed:

1. Go to **Meta Developer Portal** → your app → **WhatsApp → Configuration → Webhook**.
2. Set **Callback URL** to:
   ```
   https://YOUR-DOMAIN.vercel.app/webhook
   ```
   > Use `/webhook` — **not** `/api/webhook`. The rewrite in `vercel.json` routes it to the Express handler.
3. Set **Verify Token** to the same value as your `VERIFY_TOKEN` environment variable.
4. Subscribe to the **messages** field.
5. Click **Verify and Save**.

Manually test the verification endpoint before registering:

```bash
curl "https://YOUR-DOMAIN.vercel.app/webhook?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=12345"
# Expected: 12345
```

### 5 — Health check

```bash
curl https://YOUR-DOMAIN.vercel.app/health
```

Expected:

```json
{"success":true,"data":{"status":"ok","timestamp":"2026-..."},"error":null}
```

### 6 — Ephemeral storage on Vercel

The backend stores leads and WhatsApp messages in JSON files. On Vercel, the project root is read-only, so files are written to `/tmp/yogi-data/`. This storage is **ephemeral** — it resets between function cold starts and does not persist across deployments.

For persistent storage, replace `server/services/crmService.ts` and `server/services/messageService.ts` with a database adapter (Supabase, PlanetScale, Airtable, etc.) — the calling code in the route handlers does not need to change.

---

## Other deployment targets

See [DEPLOY.md](DEPLOY.md) for Render and Railway instructions.
