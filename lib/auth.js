import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

// Returns the logged-in user's claims (email, sub = user id, ...) or null.
// getClaims() verifies the access token, so it is safe to trust on the server.
// cache() means it only runs once per request, even if several components call it.
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    return null;
  }

  return data.claims;
});
