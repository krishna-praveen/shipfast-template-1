import { User } from '@supabase/auth-helpers-nextjs';


export type IProfileInfoResponse = {
  user: User
  profileCompleted: boolean;
}
