import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const useSession = async () => {
  const supabase = createClientComponentClient();

  const { data: { session } } = await supabase.auth.getSession()
  return session;
}
