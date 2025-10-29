
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://hrtwnsjpybjitscwhnxf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhydHduc2pweWJqaXRzY3dobnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDczMzUsImV4cCI6MjA3NjYyMzMzNX0.tEMek7Yd9LUfzqeaE32AzKQb3DOQ-2pXuwdCMks0V2I"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase