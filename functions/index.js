const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

exports.chat = functions.https.onRequest(async (request, response) => {
  const { content } = await request.json();

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

  response.send(completion);
});
