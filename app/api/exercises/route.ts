import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { mapKeysToCamelCase } from "@/libs/maps/mapKeysToCamelCase";

function getPagination(page: number, size: number) {
  const from = (page - 1) * size;
  const to = page * size - 1;
  return { from, to };
}

export async function GET(req: NextRequest) {
  const bodyPart = req.nextUrl.searchParams.get("bodyPart");
  const target = req.nextUrl.searchParams.get("target");
  const equipment = req.nextUrl.searchParams.get("equipment");
  const term = req.nextUrl.searchParams.get("term");
  const paginate = req.nextUrl.searchParams.get("paginate") === "true";
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
  const size = parseInt(req.nextUrl.searchParams.get("size") || "10", 10);

  try {
    const supabase = createRouteHandlerClient({ cookies });

    let query = supabase
      .from("exercises")
      .select("*", paginate ? { count: "exact" } : {})
      .throwOnError();

    if (bodyPart) query = query.eq("body_part", bodyPart);
    if (target) query = query.eq("target", target);
    if (equipment) query = query.eq("equipment", equipment);
    if (term) query = query.textSearch("name", term);

    if (paginate) {
      const { from, to } = getPagination(page, size);
      query = query.range(from, to);
    }

    const { data, count } = await query;

    return NextResponse.json({
      data: mapKeysToCamelCase(data),
      ...(paginate && { count, page, totalPages: Math.ceil(count / size) }),
    });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
