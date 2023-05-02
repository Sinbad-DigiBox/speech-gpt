export default async function handler(req: any, res: any) {
  if (req.method == "POST") {
    const { content } = JSON.parse(req.body);

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

    const key = process.env.GOOGLE_KEY;
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

    return res.status(200).json(response);
  }
}
