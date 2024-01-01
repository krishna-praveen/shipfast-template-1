import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

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
