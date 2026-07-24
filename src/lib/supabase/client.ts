import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | undefined;

function getPublicEnvironmentVariable(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.local.example to .env.local and add your public Supabase project value.`,
    );
  }

  return value;
}

export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) {
    return browserClient;
  }

  const projectUrl = getPublicEnvironmentVariable(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const publishableKey = getPublicEnvironmentVariable(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  browserClient = createClient(projectUrl, publishableKey);
  return browserClient;
}
