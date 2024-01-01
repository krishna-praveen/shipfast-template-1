import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    const supabase = createRouteHandlerClient({ cookies });

    if (userId) {
      const { data: user } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (user.error) {
        return NextResponse.json(
          { error: "Usuário não encontrado." },
          { status: 404 }
        );
      }

      const userPlan = user.price_id;

      const limits = {
        [process.env.STRIPE_PLAN_STARTER]: {
          student: 20,
          assessment: 6,
          workout: 6,
        },
        [process.env.STRIPE_PLAN_BOOSTER]: {
          student: 40,
          assessment: 12,
          workout: 12,
        },
        [process.env.STRIPE_PLAN_MASTER]: {
          student: 60,
          assessment: 24,
          workout: 24,
        },
      };

      return NextResponse.json(
        {
          data: { limits: limits[userPlan] },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Sessão não encontrada." },
      { status: 404 }
    );
  } catch (e) {
    console.error({ e });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
