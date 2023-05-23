import { NextResponse } from "next/server";

export async function POST(req) {
  const { content } = await req.json();

  const options = {
    input: {
      text: content,
    },
    voice: {
      languageCode: "tr-TR",
      name: "tr-TR-Standard-E",
      ssmlGender: "MALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };
  const response = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize?key=" +
      process.env.GOOGLE_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    }
  ).then((res) => res.json());

  return NextResponse.json(response);
}
