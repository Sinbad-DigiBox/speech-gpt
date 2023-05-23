import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  const user = await db.user.findUnique({
    where: { id: parseInt(userId) },
  });

  return NextResponse.json(user);
}
