import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { content } = await req.json();
  const data = {
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

  const key = Deno.env.get("GOOGLE_KEY");
  const googleResponse = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + key,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());

  return new Response(JSON.stringify(googleResponse), {
    headers: { "Content-Type": "application/json" },
  });
});
