import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxurjxssvmgdarviwqpe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4dXJqeHNzdm1nZGFydml3cXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMTkwNDYsImV4cCI6MTk5NDc5NTA0Nn0.HH74Mk7rPGcIbQN6Kvu1JfJVKbPdt0urUcyid1lJHhg";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
});
