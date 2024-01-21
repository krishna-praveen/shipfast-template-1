import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface SignUpProps {
  email: string;
  password: string;
  phone: string;
  name: string;
  birthDate: string;
  emailRedirectTo: string;
}

export const useSignUp = async ({ birthDate, email, emailRedirectTo, name, password, phone }: SignUpProps) => {
  const supabase = createClientComponentClient();

  return await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        name,
        birthDate
      },
      emailRedirectTo
    }
  })
}
