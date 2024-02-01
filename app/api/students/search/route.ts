import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { mapKeysToCamelCase } from "@/libs/maps/mapKeysToCamelCase";

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? (page - 1) * limit : 0;
  const to = from + limit - 1;

  return { from, to };
};

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const term = req.nextUrl.searchParams.get("term");
  const page = Number(req.nextUrl.searchParams.get("page"));

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const size = 10;
    const { from, to } = getPagination(page, size);

    const { count } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const totalPages = Math.ceil(count / size);

    if (page > totalPages) {
      return NextResponse.json(
        {
          data: [],
          count: 0,
          page: page,
          message: "No more data available.",
        },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("students")
      .select("*", { count: "exact" })
      .order("name", { ascending: true })
      .eq("user_id", userId)
      .textSearch("name", term)
      .range(from, to)
      .throwOnError();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao buscar alunos. Entre em contato com o suporte." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: mapKeysToCamelCase(data),
      count,
      page,
    });
  } catch (e) {
    console.error({ e });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
