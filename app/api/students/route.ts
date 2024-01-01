import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("user_id", userId)
      .throwOnError();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao buscar alunos. Entre em contato com o suporte." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
    throw NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  const body = await req.json();

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { error, data } = await supabase
      .from("students")
      .insert({
        user_id: userId,
        name: body.name,
        surname: body.surname,
        birth_date: body.birthDateFormatted,
        gender: body.gender,
        state: body.state,
        city: body.city,
        email: body.email,
        phone: body.phone,
      })
      .throwOnError();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao registrar aluno. Entre em contato com o suporte." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
    throw NextResponse.json({ error: e.message }, { status: 500 });
  }
}
