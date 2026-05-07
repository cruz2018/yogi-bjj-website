# Deployment Guide — Yogi BJJ Backend

The backend is a Node.js/Express server run via `tsx` (TypeScript execute).
No compilation step is needed — `tsx` runs `.ts` files directly in production.

---

## Render

1. Create a new **Web Service** and connect your GitHub repository.
2. Set the following in the Render dashboard:

| Setting | Value |
|---|---|
| **Root Directory** | *(leave empty — project root)* |
| **Build Command** | `npm install` |
| **Start Command** | `npm run start:server` |
| **Node Version** | 20 |

3. Add environment variables (Settings → Environment):

```
PORT=10000
FRONTEND_URL=https://your-frontend.onrender.com
META_ACCESS_TOKEN=
PHONE_NUMBER_ID=
WABA_ID=
VERIFY_TOKEN=
META_APP_SECRET=
ACADEMY_WHATSAPP_NUMBER=
AI_API_KEY=
```

> Render assigns `PORT` automatically — set it to `10000` or leave it to Render.

4. After deploy, your backend URL will be:
   `https://yogui-bjj-backend.onrender.com`

---

## Railway

1. Create a new project → **Deploy from GitHub repo**.
2. In the service settings:

| Setting | Value |
|---|---|
| **Build Command** | `npm install` |
| **Start Command** | `npm run start:server` |

3. Add environment variables under **Variables**:

```
PORT=${{PORT}}
FRONTEND_URL=https://your-frontend.up.railway.app
META_ACCESS_TOKEN=
PHONE_NUMBER_ID=
WABA_ID=
VERIFY_TOKEN=
META_APP_SECRET=
ACADEMY_WHATSAPP_NUMBER=
AI_API_KEY=
```

> Railway injects `PORT` automatically via `${{PORT}}`.

4. After deploy, your backend URL will be:
   `https://yogui-bjj-backend.up.railway.app`

---

## Meta Webhook Registration

Once deployed, register your webhook in the Meta Developer Portal:

1. Go to your app → **WhatsApp** → **Configuration** → **Webhook**
2. Set **Callback URL** to:
   ```
   https://YOUR_BACKEND_DOMAIN/webhook
   ```
3. Set **Verify Token** to the same value as your `VERIFY_TOKEN` environment variable.
4. Subscribe to the **messages** field.
5. Click **Verify and Save**.

### Manual verification test

Run this curl to confirm your webhook endpoint responds correctly before registering with Meta:

```bash
curl "https://YOUR_BACKEND_DOMAIN/webhook?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=12345"
```

Expected response:
```
12345
```

If you get `403 Forbidden`, the `VERIFY_TOKEN` env var doesn't match what you passed in the query string.

---

## Health check

```bash
curl https://YOUR_BACKEND_DOMAIN/health
```

Expected response:
```json
{"success":true,"data":{"status":"ok","timestamp":"2026-..."},"error":null}
```

Both `/health` and `/api/health` return identical responses.

---

## Local development

```bash
cp .env.example .env
# fill in your values
npm run dev:all
```

Frontend: `http://localhost:5180`
Backend:  `http://localhost:4000`
Webhook:  `http://localhost:4000/webhook` (use ngrok or similar to expose locally)
