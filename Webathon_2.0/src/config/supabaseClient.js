import { createClient } from '@supabase/supabase-js';

// TODO: Replace with environment variables eventually if committed to GitHub.
// Using raw strings as requested for this local trial run.
const supabaseUrl = 'https://sgfzvsymrlhlthtlaucz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnp2c3ltcmxobHRodGxhdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MzIyNzIsImV4cCI6MjA4NzIwODI3Mn0.xkI3X9SI8QhTJUIo2pKHHgBk5ScvC2kG9MnRMqxPcJI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
