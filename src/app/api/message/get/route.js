import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user");
  const charId = searchParams.get("char");

  const messages = await db.message.findMany({
    where: { userId: parseInt(userId), charId: parseInt(charId) },
  });

  return NextResponse.json(messages);
}
