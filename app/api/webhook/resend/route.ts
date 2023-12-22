import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const payload = req.body;
    console.log(payload);
    console.log(res.status);

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e?.message);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
