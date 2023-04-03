import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { content } = await req.json();
  const data = {
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

  const key = Deno.env.get("GOOGLE_KEY");
  const googleResponse = await fetch(
    "https://speech.googleapis.com/v1p1beta1/speech:recognize?key=" + key,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());

  const transcript = googleResponse.results[0].alternatives[0].transcript;
  const requestId = googleResponse.requestId;

  const response = {
    transcript,
    requestId,
  };

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
});
