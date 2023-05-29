import { Configuration, OpenAIApi } from "openai";

const createCompletion = async (content, history, trait) => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_GPT_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: trait,
        },
        ...history,
        { role: "user", content: content },
      ],
    })
    .then((res) => {
      return res.data.choices[0];
    });

  return completion;
};

export default createCompletion;
