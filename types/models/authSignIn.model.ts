import { User, Session } from "@supabase/auth-helpers-nextjs";


export type IAuthSignInPayload = {
  email: string;
  password: string;
}

export type IAuthSignInResponse = {
  user: User;
  session: Session
}
