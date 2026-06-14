# Form emails via Zoho Mail

**Single trigger:** the React app saves the form, then calls the Edge Function with `supabase.functions.invoke()`.

Do **not** create database webhooks for these tables — that would send duplicate emails.

Flow:

1. User submits form → row inserted in Supabase  
2. `src/services/formNotifications.js` → `resend-email`  
3. Zoho SMTP → email to **admin** + **user**

Tables: `applications`, `contact_messages`, `newsletter_subscribers`.

---

## 1. Zoho Mail

1. Mailbox on your domain (e.g. `hello@studyglide.com`).
2. Enable SMTP in Zoho Mail.
3. Create an **App-Specific Password** (Zoho → Security → App passwords).
4. SMTP host: `smtp.zoho.com` (465) · EU: `smtp.zoho.eu` · India: `smtp.zoho.in`

`FROM_EMAIL` is usually the same as `ZOHO_EMAIL`.

---

## 2. Edge Function secrets

Supabase Dashboard → **Edge Functions** → **Secrets** (or CLI):

```bash
supabase secrets set \
  ZOHO_EMAIL=hello@yourdomain.com \
  ZOHO_APP_PASSWORD=your_app_password \
  FROM_EMAIL=hello@yourdomain.com \
  ADMIN_EMAIL=admin@yourdomain.com \
  SITE_NAME="StudyGlide"
```

Optional: `ZOHO_SMTP_HOST`, `ZOHO_SMTP_PORT` (default `smtp.zoho.com` / `465`).

**Remove `WEBHOOK_SECRET` if you added it** — not used in this setup.

---

## 3. Deploy

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy resend-email
```

Function URL (name must match the folder):

`https://YOUR_PROJECT_REF.supabase.co/functions/v1/resend-email`

Deploy **with default JWT verification** (do **not** pass `--no-verify-jwt`). The site calls the function using your anon key in `.env.local`.

---

## 4. React app (`.env.local`)

```
VITE_SUPABASE_URL=https://YOUR_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Never put Zoho passwords in `VITE_*`.

Wired in:

- `src/services/applications.js`
- `src/services/contact.js`
- `src/services/newsletter.js`
- `src/services/formNotifications.js`

---

## 5. Remove database webhooks (if any)

If you created **Database → Webhooks** for `applications`, `contact_messages`, or `newsletter_subscribers`, **delete them** so each submit only triggers one email.

---

## 6. Test

1. Submit a form on the site.  
2. **Edge Functions → Logs** → `resend-email` should be `200`.  
3. Check admin + user inboxes (and spam until SPF/DKIM are set).

---

## Troubleshooting

| Issue | Fix |
|--------|-----|
| 405 Method Not Allowed | Redeploy after CORS fix; browser sends `OPTIONS` before `POST` — function must allow both |
| 401 Unauthorized | Anon key in `.env.local` must match project; redeploy function **without** `--no-verify-jwt` |
| Double emails | Delete database webhooks; only use the React invoke path |
| SMTP auth failed | Zoho app password, not account password |
| Mail in spam | Set SPF/DKIM for your domain in Zoho |
| Console: `[resend-email]` | Open Network tab → function response body for details |
| Admin gets mail, user does not (or the reverse) | Redeploy `resend-email`. Check logs for `user mail failed` / `admin mail failed`. Check **spam**. Ensure Zoho can send to **external** addresses. Do not use the same address for `ADMIN_EMAIL` and the form email when testing — Zoho may only deliver one. |
