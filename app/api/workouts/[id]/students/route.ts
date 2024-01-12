import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    const supabase = createRouteHandlerClient({ cookies });

    await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId)
      .eq("student_id", params.id)
      .throwOnError();

    return NextResponse.json({});
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
