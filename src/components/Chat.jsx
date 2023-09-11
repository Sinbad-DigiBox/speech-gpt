"use client";

import Message from "@/components/Message";
import Response from "@/components/Response";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Chat({
  firstMessage,
  history,
  loading,
  lastMessage,
  audio,
}) {
  const anchor = useRef();

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    anchor.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="z-20 h-full space-y-8 overflow-y-scroll pr-9"
      id="scrollbar"
    >
      <Response message={firstMessage} />
      {loading ? (
        <Image
          src="/spinner.svg"
          className="mx-auto"
          width={50}
          height={50}
          alt="Spinner"
        />
      ) : (
        history.map((e) => (
          <div className="space-y-8" key={crypto.randomUUID()}>
            <Message message={e.content} />
            <Response
              message={e.response}
              lastMessage={lastMessage}
              audio={audio}
            />
          </div>
        ))
      )}
      <div ref={anchor} />
    </div>
  );
}
