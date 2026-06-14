-- Run after uploading videos to the public "testimonials" Storage bucket.
-- video_path must match the exact object name in Storage (use simple names when possible).
-- On upload, set Content-Type to video/mp4 (Dashboard → file → Edit metadata).

-- Example (video_path = exact file name in Storage):
-- insert into public.testimonials (name, school, country, video_path, sort_order, is_published)
-- values
--   ('Deborah', 'University of Lancashire', 'UK', 'Testimonial by Deborah.mp4', 1, true);
