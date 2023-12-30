import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", params.id)
      .single()
      .throwOnError();

    const mapped = {
      id: data.id,
      assessmentId: data.assessment_id,
      userId: data.user_id,
      studentId: data.student_id,
      goal: data.goal,
      type: data.type,
      phase: data.phase,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      exercises: data.exercises,
    };

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const body = await req.json();
  const { params } = context;

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data } = await supabase.auth.getSession();

    await supabase
      .from("workouts")
      .update({
        user_id: data.session.user.id,
        student_id: body.studentId,
        assessment_id: body.assessmentId,
        description: body.description,
        phase: body.phase,
        goal: body.goal,
        type: body.type,
        exercises: body.exercises,
      })
      .match({ id: params.id })
      .throwOnError();

    return NextResponse.json({});
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
