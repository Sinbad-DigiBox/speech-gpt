import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const charId = searchParams.get("id");

  const character = await db.character.findUnique({
    where: { id: parseInt(charId) },
  });

  return NextResponse.json(character);
}
