import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { content, response } = await req.json();

  db.message.create({ content, response });

  return NextResponse.json({ message: "Message added." });
}
