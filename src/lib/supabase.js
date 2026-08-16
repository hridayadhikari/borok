import { createClient } from '@supabase/supabase-js';

const getSupabaseCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const localUrl = localStorage.getItem('supabase_test_url') || '';
  const localKey = localStorage.getItem('supabase_test_key') || '';

  const url = localUrl || envUrl;
  const key = localKey || envKey;

  return {
    url,
    key,
    isConfigured: Boolean(url && key)
  };
};

const creds = getSupabaseCredentials();

export const isSupabaseConfigured = () => {
  return creds.isConfigured;
};

export const supabase = createClient(creds.url, creds.key);

export const getSupabaseClient = () => {
  return supabase;
};

export const setLocalSupabaseCredentials = (url, key) => {
  if (url && key) {
    localStorage.setItem('supabase_test_url', url.trim());
    localStorage.setItem('supabase_test_key', key.trim());
    window.location.reload();
  }
};

export const clearLocalSupabaseCredentials = () => {
  localStorage.removeItem('supabase_test_url');
  localStorage.removeItem('supabase_test_key');
  window.location.reload();
};

// Cloud Sync Helpers for Kokborok Learning Platform (Secured via Supabase RLS auth.uid())
export const syncUserStreakToCloud = async (userId, streak) => {
  if (!supabase || !userId) return;
  try {
    const today = new Date().toISOString().split('T')[0];
    await supabase.from('user_streaks').upsert({
      user_id: userId,
      current_streak: streak,
      last_activity_date: today,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  } catch (err) {
    console.warn('Supabase streak sync notice:', err);
  }
};

export const syncUserProgressToCloud = async (userId, completedLessons, srsData) => {
  if (!supabase || !userId) return;
  try {
    await supabase.from('user_progress').upsert({
      user_id: userId,
      completed_lessons: completedLessons,
      srs_queue: srsData,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  } catch (err) {
    console.warn('Supabase progress sync notice:', err);
  }
};

export const syncBookmarksToCloud = async (userId, bookmarks) => {
  if (!supabase || !userId) return;
  try {
    await supabase.from('user_bookmarks').delete().match({ user_id: userId });
    if (bookmarks.length > 0) {
      const rows = bookmarks.map(b => ({
        user_id: userId,
        word_kokborok: b.kokborok,
        word_english: b.english,
        word_bengali: b.bengali || ''
      }));
      await supabase.from('user_bookmarks').insert(rows);
    }
  } catch (err) {
    console.warn('Supabase bookmarks sync notice:', err);
  }
};

// Fetch User Data from Supabase Cloud on Login / Initial Load
// RLS automatically restricts select results to auth.uid() on Supabase server
export const fetchUserDataFromCloud = async (userId) => {
  if (!supabase || !userId) return null;
  try {
    const [progressRes, streakRes, bookmarksRes] = await Promise.all([
      supabase.from('user_progress').select('*').maybeSingle(),
      supabase.from('user_streaks').select('*').maybeSingle(),
      supabase.from('user_bookmarks').select('*')
    ]);

    if (progressRes.error) console.warn('user_progress cloud fetch error:', progressRes.error);
    if (streakRes.error) console.warn('user_streaks cloud fetch error:', streakRes.error);
    if (bookmarksRes.error) console.warn('user_bookmarks cloud fetch error:', bookmarksRes.error);

    return {
      progress: progressRes.data || null,
      streak: streakRes.data || null,
      bookmarks: bookmarksRes.data || []
    };
  } catch (err) {
    console.warn('Error fetching cloud user data:', err);
    return null;
  }
};



