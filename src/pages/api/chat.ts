import { Configuration, OpenAIApi } from "openai";

export default async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const { content } = req.body;

    const configuration = new Configuration({
      apiKey: process.env.GPT_KEY,
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

    return res.status(200).json(completion);
  }
}
