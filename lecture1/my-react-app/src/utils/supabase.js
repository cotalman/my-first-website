import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sabpsntepdkpzrcvjuup.supabase.co';
const supabaseKey = 'sb_publishable_ISCIyGZvJDkPshNms6NK4Q_NDhoewIV';

export const supabase = createClient(supabaseUrl, supabaseKey);
