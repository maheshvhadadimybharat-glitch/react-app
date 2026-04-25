import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bkyfiumweqsebhkjjvfi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJreWZpdW13ZXFzZWJoa2pqdmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NjY3ODcsImV4cCI6MjA5MTE0Mjc4N30.C-kmu_YZSlHtds6wdwLVraQYjjz_HBxGqr7qFvtNQ0k';
export const supabase = createClient(supabaseUrl, supabaseKey);