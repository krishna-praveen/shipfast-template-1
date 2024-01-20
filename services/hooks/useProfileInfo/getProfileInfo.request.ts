import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { IProfileInfoResponse } from '@/types/models/profileInfo.model';

export const getProfileInfo = async (): Promise<IProfileInfoResponse> => {
  const supabase = createClientComponentClient();
  const { data: { session } } = await supabase.auth.getSession()

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .filter("has_access", "eq", true)
    .single();

  return { profileCompleted: !!data, user: session.user };
}
