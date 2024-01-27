import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useStipe } from '@/services/hooks/useStipe';

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
  const { customer, subscription } = await useStipe.findCustomerAndSubscription(email);

  const priceId = subscription?.items.data[0].price.id || '';
  const customerId = customer?.id || '';

  const { data: { user } } = await supabase.auth.signUp({
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    await supabase.from("profiles").insert(
      {
        id: user.id,
        price_id: priceId,
        email,
        has_access: true,
        customer_id: customerId
      },
    );
  }
}
