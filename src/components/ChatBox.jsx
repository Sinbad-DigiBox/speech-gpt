"use client";

import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import Input from "./Input";

export default function ChatBox({ firstMessage }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const generating = useRef(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await fetch(
        "https://speech-dm376v9qc-yuuns.vercel.app/api/message/get?user=1&char=1",
        {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      ).then(async (res) => await res.json());
      setHistory(messages);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  const insertMessage = (message) => {
    let newMsg = { content: message, response: "" };
    setHistory([...history, newMsg]);
    generateAnswer(message).then((answer) => {
      const response = answer.message.content;
      generateSpeech(response.replaceAll(/(?:\r\n|\r|\n)/g, ".")).then(
        (base64) => {
          const audio = base64.audioContent;
          const inserted = [...history];
          newMsg.response = response;
          inserted.push(newMsg);
          setHistory(inserted);
          generating.current = false;

          new Audio(`data:audio/ogg;base64,${audio}`).play();

          fetch("https://speech-dm376v9qc-yuuns.vercel.app/api/message/add", {
            method: "POST",
            body: JSON.stringify({
              content: message,
              response: response,
              userId: 1,
              charId: 1,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      );
    });
  };

  const generateAnswer = async (prompt) => {
    const previousMessages = [];
    history.forEach((e) => {
      previousMessages.push({ role: "user", content: e.content });
      previousMessages.push({ role: "assistant", content: e.response });
    });

    const response = await fetch(
      "https://speech-dm376v9qc-yuuns.vercel.app/api/chat",
      {
        method: "POST",
        body: JSON.stringify({
          content: prompt,
          history: previousMessages,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    return answer;
  };

  const generateSpeech = async (content) => {
    const response = await fetch(
      "https://speech-dm376v9qc-yuuns.vercel.app/api/tts",
      {
        method: "POST",
        body: JSON.stringify({
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    return answer;
  };

  return (
    <>
      <Chat firstMessage={firstMessage} loading={loading} history={history} />
      <Input insertMessage={(m) => insertMessage(m)} generating={generating} />
    </>
  );
}
