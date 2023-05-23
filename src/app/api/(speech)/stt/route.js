import { NextResponse } from "next/server";

export async function POST(req) {
  const { content } = await req.json();

  const options = {
    config: {
      encoding: "MP3",
      sampleRateHertz: 16000,
      languageCode: "tr-TR",
      enableWordTimeOffsets: false,
    },
    audio: {
      content,
    },
  };

  const googleResponse = await fetch(
    "https://speech.googleapis.com/v1p1beta1/speech:recognize?key=" +
      process.env.GOOGLE_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    }
  ).then((res) => res.json());

  const response = {
    transcript: googleResponse.results
      ? googleResponse.results[0].alternatives[0].transcript
      : "",
    requestId: googleResponse.requestId,
  };

  return NextResponse.json(response);
}
