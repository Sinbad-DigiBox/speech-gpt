import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

serve(async (req) => {
  const { content } = await req.json();

  const configuration = new Configuration({
    apiKey: Deno.env.get("API_KEY"),
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: content }],
    })
    .then((res) => {
      return res.data.choices[0];
    });

  return new Response(JSON.stringify(completion), {
    headers: { "Content-Type": "application/json" },
  });
});
