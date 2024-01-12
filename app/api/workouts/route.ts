import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { mapKeysToCamelCase } from "@/libs/maps/mapKeysToCamelCase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    const supabase = createRouteHandlerClient({ cookies });

    await supabase
      .from("workouts")
      .insert({
        user_id: userId,
        student_id: body.studentId,
        assessment_id: body.assessmentId,
        description: body.description,
        phase: body.phase,
        goal: body.goal,
        type: body.type,
        exercises: body.exercises,
      })
      .throwOnError();

    return NextResponse.json({});
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId)
      .throwOnError();

    return NextResponse.json({ data: mapKeysToCamelCase(data) });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
