/*
# Create bookings table (single-tenant, no auth)

1. New Tables
- `bookings`
- `id` (uuid, primary key)
- `booking_ref` (text, short human-readable reference like JV-XXXX1234)
- `name` (text, not null)
- `email` (text, not null)
- `phone` (text, not null)
- `service` (text, not null)
- `dob` (date, not null)
- `tob` (time, not null)
- `pob` (text, not null)
- `preferred_date` (date, not null)
- `notes` (text, optional, defaults to '—')
- `currency` (text, not null, defaults to 'AED')
- `status` (text, not null, defaults to 'pending')
- `unread` (boolean, not null, defaults to true)
- `created_at` (timestamptz, defaults to now())
2. Security
- Enable RLS on `bookings`.
- Allow anon + authenticated CRUD because the booking form is intentionally public (no sign-in),
  and the owner dashboard reads/writes with the same anon key.
- A unique index on `booking_ref` prevents duplicate references.
3. Notes
- This is a single-tenant app: one owner, one public booking form. No user_id or auth is needed.
- The admin dashboard is protected by a client-side PIN gate only (prototype). All rows are shared.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  dob date NOT NULL,
  tob time NOT NULL,
  pob text NOT NULL,
  preferred_date date NOT NULL,
  notes text NOT NULL DEFAULT '—',
  currency text NOT NULL DEFAULT 'AED',
  status text NOT NULL DEFAULT 'pending',
  unread boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS bookings_booking_ref_key ON bookings (booking_ref);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
TO anon, authenticated USING (true);
