-- StudyGlide: forms + testimonials
-- Run in Supabase SQL Editor or via CLI: supabase db push

-- ─── Applications (Home + Applicants forms) ─────────────────
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null check (source in ('home', 'applicants')),
  full_name text not null,
  age integer,
  phone_number text not null,
  email text not null,
  gender text not null,
  preferred_study_destination text not null,
  other_countries_interested text,
  program_interested text not null,
  intake_period text not null,
  highest_qualification text not null,
  other_qualification text,
  previous_visa_refusal text not null,
  referral_source text not null
);

-- ─── Contact messages ───────────────────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  message text not null
);

-- ─── Newsletter ─────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  subscribed_at timestamptz not null default now(),
  email text not null unique
);

-- ─── Testimonials (metadata; videos in Storage) ─────────────────
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  school text not null,
  country text not null,
  video_path text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true
);

-- ─── Row Level Security ─────────────────────────────────────────
alter table public.applications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.testimonials enable row level security;

-- Anonymous users can submit forms only (no read)
create policy "anon_insert_applications"
  on public.applications for insert to anon
  with check (true);

create policy "anon_insert_contact_messages"
  on public.contact_messages for insert to anon
  with check (true);

create policy "anon_insert_newsletter"
  on public.newsletter_subscribers for insert to anon
  with check (true);

create policy "anon_upsert_newsletter"
  on public.newsletter_subscribers for update to anon
  using (true)
  with check (true);

-- Published testimonials are public read
create policy "anon_read_published_testimonials"
  on public.testimonials for select to anon
  using (is_published = true);

-- ─── Storage: public testimonials bucket ────────────────────────
-- Create bucket "testimonials" in Dashboard → Storage (public).
-- Then run:
insert into storage.buckets (id, name, public)
values ('testimonials', 'testimonials', true)
on conflict (id) do update set public = true;

create policy "public_read_testimonial_videos"
  on storage.objects for select to anon
  using (bucket_id = 'testimonials');

-- ─── Seed testimonials (run once after uploading videos to Storage) ─
-- insert into public.testimonials (name, school, country, video_path, sort_order)
-- values
--   ('Toyosi', 'University of Northumbria', 'UK', 'first.mp4', 1),
--   ('Deborah', 'University of Lancashire', 'UK', 'second.mp4', 2),
--   ('Ayomide', 'University of Sunderland', 'Canada', 'third.mp4', 3);
