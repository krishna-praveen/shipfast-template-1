import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, redirectTo } = await req.json();

  console.info("E-mail and redirectTo values >", { email, redirectTo });

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    console.info("Reset password e-mail sent");

    if (error) {
      console.error("Error to request update password >", {
        error: JSON.stringify(error),
      });

      /**
       * We should treat this error in a better way, but for now we will just keep wth the default error message.
       * Error to update password > {
       *  error: '{"name":"AuthApiError","message":"Email rate limit exceeded","status":429}'
       * }
       */

      return NextResponse.json(
        {
          error:
            "Erro ao solicitar atualização da senha. Entre em contato com o suporte.",
        },
        { status: 500 }
      );
    }

    console.info("Reset password successfully");

    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
