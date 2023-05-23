import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req) {
  const { content } = await req.json();

  const configuration = new Configuration({
    apiKey: process.env.GPT_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a poet. Answer all the questions as a short Poe. Give the answers in Turkish.",
        },
        { role: "user", content: content },
      ],
    })
    .then((res) => {
      return res.data.choices[0];
    });

  return NextResponse.json(completion);
}
