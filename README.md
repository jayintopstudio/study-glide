# StudyGlide Educational Consult

Next.js site for StudyGlide Educational Consult.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_TESTIMONIALS_BUCKET=testimonials
```

On Vercel, add the same variables in **Project → Settings → Environment Variables** (replace any old `VITE_*` names).

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel)

Connect the repo to Vercel. Framework preset: **Next.js**. No SPA rewrites needed — routing is handled by the App Router.

## Routes

All previous URLs are preserved (`/about`, `/services`, `/destination/uk`, `/faq`, etc.) via `src/app/`.
