import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data } = await supabase.auth.getSession();

    await supabase
      .from("workouts")
      .insert({
        user_id: data.session.user.id,
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

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", session.user.id)
      .throwOnError();

    const mapped = data.map((workout) => ({
      id: workout.id,
      assessmentId: workout.assessment_id,
      userId: workout.user_id,
      studentId: workout.student_id,
      goal: workout.goal,
      type: workout.type,
      description: workout.description,
      createdAt: workout.created_at,
      updatedAt: workout.updated_at,
      exercises: workout.exercises,
    }));

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
