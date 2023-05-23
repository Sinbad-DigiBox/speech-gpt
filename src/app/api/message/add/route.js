import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { content, response, userId, charId } = await req.json();

  const push = await db.message.create({
    data: { content, response, userId, charId },
  });
  console.log(push);

  return NextResponse.json({ message: "Message added." });
}
