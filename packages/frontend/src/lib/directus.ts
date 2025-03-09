import { createDirectus, rest, authentication } from '@directus/sdk';

const directusUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus(directusUrl)
  .with(rest())
  .with(authentication());

export type Event = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  type: 'training' | 'match' | 'meeting';
  is_recurring: boolean;
  recurrence_pattern?: string;
  created_at: string;
  updated_at: string;
};

export type Availability = {
  id: string;
  event_id: string;
  user_id: string;
  status: 'available' | 'unavailable' | 'pending';
  comment?: string;
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'event' | 'availability' | 'system';
  status: 'unread' | 'read';
  user_id: string;
  event_id?: string;
  created_at: string;
};