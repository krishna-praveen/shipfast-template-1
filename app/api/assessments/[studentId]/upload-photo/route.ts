import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const SIDES = {
  front: "front",
  back: "back",
  left: "left",
  right: "right",
};

export async function POST(req: NextRequest, context: any) {
  const { params } = context;
  const body = await req.json();

  if (!SIDES[body.side as keyof typeof SIDES]) {
    return NextResponse.json({ error: "Invalid side" }, { status: 400 });
  }

  const userId = req.nextUrl.searchParams.get("userId");
  const assessmentId = req.nextUrl.searchParams.get("assessmentId");

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.storage
      .from("assessment_photos")
      .upload(
        `side_${body.side}_assessment_${assessmentId}_student_${
          params.studentId
        }_user_${userId}_date_${Date.now()}.png`,
        body.photo
      );

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
