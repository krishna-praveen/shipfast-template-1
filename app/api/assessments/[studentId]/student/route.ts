import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  let userId: string;

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const session = await supabase.auth.getSession();

    if (session.data.session) {
      const { id } = session.data.session.user;

      userId = id;
    }

    const { data, error } = await supabase
      .from("assessments")
      .select("*")
      .eq("user_id", userId)
      .eq("student_id", params.studentId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const mapped = data.map((assessment) => ({
      id: assessment.id,
      assessmentMeasures: assessment.assessment_measures,
      assessmentResult: assessment.assessment_result,
      assessmentType: assessment.assessment_type,
      bodyMeasurement: assessment.body_measurement,
      createdAt: assessment.created_at,
      updatedAt: assessment.updated_at,
      startDate: assessment.start_date,
      endDate: assessment.end_date,
      studentId: assessment.student_id,
      userId: assessment.user_id,
    }));

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
