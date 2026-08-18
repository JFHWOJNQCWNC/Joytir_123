import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Booking {
  id: string;
  booking_ref: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  dob: string;
  tob: string;
  pob: string;
  preferred_date: string;
  notes: string;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed';
  unread: boolean;
  created_at: string;
}

export type NewBooking = Omit<Booking, 'id' | 'created_at' | 'status' | 'unread'> & {
  status?: 'pending' | 'confirmed' | 'completed';
  unread?: boolean;
};

export async function createBooking(booking: NewBooking): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();
  if (error) {
    console.error('Failed to create booking:', error.message);
    return null;
  }
  return data as Booking;
}

export async function fetchBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to fetch bookings:', error.message);
    return [];
  }
  return (data as Booking[]) ?? [];
}

export async function updateBooking(
  id: string,
  patch: Partial<Booking>
): Promise<boolean> {
  const { error } = await supabase.from('bookings').update(patch).eq('id', id);
  if (error) {
    console.error('Failed to update booking:', error.message);
    return false;
  }
  return true;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) {
    console.error('Failed to delete booking:', error.message);
    return false;
  }
  return true;
}

export function generateBookingRef(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  const ts = Date.now().toString().slice(-4);
  return `JV-${rand}${ts}`;
}
