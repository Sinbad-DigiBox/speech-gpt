export default async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const { content } = req.body;
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

    const key = process.env.GOOGLE_KEY;
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

    return res.status(200).json(googleResponse);
  }
}
