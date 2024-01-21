import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const useSignOut = async () => {
  const supabase = createClientComponentClient();

  return await supabase.auth.signOut({ scope: "global" });
}
