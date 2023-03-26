import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxurjxssvmgdarviwqpe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4dXJqeHNzdm1nZGFydml3cXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMTkwNDYsImV4cCI6MTk5NDc5NTA0Nn0.HH74Mk7rPGcIbQN6Kvu1JfJVKbPdt0urUcyid1lJHhg";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default SupabaseClient;
