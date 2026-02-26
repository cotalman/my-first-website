import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sabpsntepdkpzrcvjuup.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYnBzbnRlcGRrcHpyY3ZqdXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODEzODksImV4cCI6MjA4NzA1NzM4OX0.-TIYAmsgH1PbUwPQ3qiMDV7bP1g44J0Fo46DxQo_qnM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
