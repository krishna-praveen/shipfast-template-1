import { NextResponse, NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { calculateAssessmentResult } from "./functions/calculate-assessment-result";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const student = await supabase
      .from("students")
      .select("*")
      .eq("id", body.studentId)
      .single();

    await supabase
      .from("assessments")
      .insert({
        user_id: body.userId,
        student_id: body.studentId,
        start_date: body.startDate.split("/").reverse().join("-"),
        end_date: body.endDate.split("/").reverse().join("-"),
        assessment_type: body.assessmentType,
        assessment_measures: body.assessmentMeasures,
        assessment_result: calculateAssessmentResult(
          body.assessmentType,
          body.assessmentMeasures,
          body.bodyMeasurement,
          student.data
        ),
        body_measurement: body.bodyMeasurement,
      })
      .throwOnError();

    return NextResponse.json({});
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
