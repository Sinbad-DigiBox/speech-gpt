"use client";

import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import Input from "./Input";

export default function ChatBox({
  character,
  charId,
  generateAnswer,
  generateSpeech,
  generateText,
  getMessages,
  addMessages,
  deleteMessages,
}) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [lastMessage, setLastMessage] = useState();
  const [audioObj, setAudioObj] = useState();
  const generating = useRef(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(charId);
      setHistory(messages);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  const insertMessage = async (message) => {
    let newMsg = { content: message, response: "" };
    setHistory([...history, newMsg]);

    const answer = await generateAnswer(message, history, character.system);
    const response = answer.message.content;

    const base64 = await generateSpeech(
      response.replaceAll(/(?:\r\n|\r|\n)/g, "."),
      character.gender,
      character.soundSpeed,
      character.soundPitch,
      character.soundName
    );
    const audio = base64.audioContent;
    const a = new Audio(`data:audio/ogg;base64,${audio}`);
    setAudioObj(a);
    a.play();

    const inserted = [...history];
    newMsg.response = response;
    inserted.push(newMsg);

    setHistory(inserted);
    setLastMessage(response);
    generating.current = false;

    addMessages(message, response, charId);
  };

  return (
    <>
      <Chat
        firstMessage={character.firstMessage}
        loading={loading}
        history={history}
        lastMessage={lastMessage}
        audio={audioObj}
      />
      <Input
        insertMessage={(m) => insertMessage(m)}
        generating={generating}
        generateText={generateText}
        deleteMessages={deleteMessages}
        charId={charId}
        setHistory={setHistory}
      />
    </>
  );
}
