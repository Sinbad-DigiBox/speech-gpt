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
        "http://localhost:3000/api/message/get?user=1&char=1",
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
      const inserted = [...history];
      newMsg.response = answer.message.content;
      inserted.push(newMsg);
      setHistory(inserted);
      generating.current = false;
    });
  };

  const generateAnswer = async (prompt) => {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({
        content: prompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
