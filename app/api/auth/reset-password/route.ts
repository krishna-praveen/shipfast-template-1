import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  try {
    const supabase = createRouteHandlerClient({ cookies });

    console.info("Resetting password");

    const { error, data } = await supabase.auth.updateUser({ password });

    console.info("Password reset successfully");

    if (error) {
      console.error("Error to reset password >", {
        error: JSON.stringify(error),
      });

      return NextResponse.json(
        { error: "Erro ao atualizar senha. Entre em contato com o suporte." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
