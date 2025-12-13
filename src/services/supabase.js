import {createClient} from '@supabase/supabase-js';
export const supabaseUrl = 'get it from env';
const supabaseKey = 'get it from env';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
