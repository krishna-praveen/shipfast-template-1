import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session.user.id;

    const { data, error } = await supabase.rpc("get_student_workouts", {
      user_id: userId,
    });

    if (error) {
      throw error;
    }

    const mapped = data.map((workout: any) => ({
      studentFullName: workout.student_full_name,
      workouts: workout.workouts,
    }));

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
