import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sgfzvsymrlhlthtlaucz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnp2c3ltcmxobHRodGxhdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MzIyNzIsImV4cCI6MjA4NzIwODI3Mn0.xkI3X9SI8QhTJUIo2pKHHgBk5ScvC2kG9MnRMqxPcJI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const workshopsData = [
    {
        title: 'Advanced Hypertrophy Techniques',
        date: '2026-03-15',
        time: '18:00',
        location: 'Downtown Iron Gym',
        description: 'Learn the secrets to true muscle growth and progressive overload with elite coach Sarah Jenkins.'
    },
    {
        title: 'Mobility & Posture Reset',
        date: '2026-03-18',
        time: '08:00',
        location: 'Virtual Zoom Workshop',
        description: 'A dedicated session for reversing desk posture and building functional joint resilience.'
    },
    {
        title: 'Powerlifting Fundamentals',
        date: '2026-03-22',
        time: '10:00',
        location: 'Eastside Barbell Club',
        description: 'Nail your bench, squat, and deadlift technique in this comprehensive beginner clinic.'
    }
];

async function seed() {
    // Check if table exists / fetch existing
    const { data: existing, error: checkErr } = await supabase.from('workshops').select('*').limit(1);
    if (checkErr) {
        console.error("Failed to check workshops table:", checkErr);
        return;
    }

    // Insert mock data
    const { data, error } = await supabase.from('workshops').insert(workshopsData).select();

    if (error) {
        console.error('Error inserting workshops:', error);
    } else {
        console.log('Workshops seeded successfully! Inserted rows:', data.length);
    }
}

seed();
