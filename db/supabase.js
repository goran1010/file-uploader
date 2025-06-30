import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(
  "https://elnvmijogmkosiggzifh.supabase.co",
  SUPABASE_KEY
);

export default supabase;
