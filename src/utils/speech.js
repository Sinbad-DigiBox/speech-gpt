export const textToSpeech = async (content) => {
  const options = {
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
  const response = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize?key=" +
      process.env.NEXT_PUBLIC_GOOGLE_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    }
  ).then((res) => res.json());

  return response;
};

export const speechToText = async (content) => {
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
      process.env.NEXT_PUBLIC_GOOGLE_KEY,
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

  return response;
};
