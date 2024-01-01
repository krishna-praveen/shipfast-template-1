import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const supabase = createRouteHandlerClient({ cookies });

    console.info("Making the login >", { email, password });

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error to login >", {
        error: JSON.stringify(error),
      });

      return NextResponse.json(
        { error: "Por favor, verifique se seu email e senha estão corretos." },
        { status: 400 }
      );
    }

    console.info("Login successfully");

    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
