import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xbgddjasslifdqwpuoly.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZ2RkamFzc2xpZmRxd3B1b2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NjU3OTEsImV4cCI6MjA4NzE0MTc5MX0.WLIulSTLSgbSqb9shT74zJ2MKKaELO-e4ys1fGgbdXQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
