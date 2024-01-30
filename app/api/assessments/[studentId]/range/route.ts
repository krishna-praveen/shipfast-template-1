import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { mapKeysToCamelCase } from "@/libs/maps/mapKeysToCamelCase";

import { calculateDifferences } from "../../functions/calculate-differences";

export async function GET(req: NextRequest, context: any) {
  const userId = req.nextUrl.searchParams.get("userId");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

  const { params } = context;

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("assessments")
      .select("*")
      .eq("user_id", userId)
      .eq("student_id", params.studentId)
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    const assessments = mapKeysToCamelCase(data);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      data: assessments,
      difference: calculateDifferences(assessments.shift(), assessments.pop()),
    });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
