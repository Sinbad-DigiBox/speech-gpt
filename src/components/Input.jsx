"use client";

import { MicrophoneIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useReducer, useRef, useState } from "react";

export default function Input() {
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [timer, dispatch] = useReducer(reducer, 0);
  const interval = useRef();
  const audioCtxContainer = useRef();
  const chunks = [];

  useEffect(() => {
    return () => {
      const bar = document.getElementById("progress-bar");
      const percentage = (100 / 6) * (timer + 1);
      if (bar) bar.style.width = `${percentage}%`;
    };
  }, [timer]);

  function reducer(state, action) {
    if (action.type === "increment") {
      return state + 1;
    }
    if (action.type === "reset") {
      return 0;
    }
    throw Error("Unknown action.");
  }

  const generateAnswer = async () => {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({
        content: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const answer = await response.json();
    return answer;
  };

  const handleInput = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!message) return;
    setMessage("");
    // TODO const answer = await generateAnswer();
  };

  const startTimer = () => {
    interval.current = setInterval(() => {
      dispatch({ type: "increment" });
    }, 1000);
  };

  const record = () => {
    audioCtxContainer.current = new AudioContext();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);

          if (mediaRecorder.state == "recording") return;
          mediaRecorder.start();
          setRecording(true);
          startTimer();

          setTimeout(() => {
            mediaRecorder.stop();
            dispatch({ type: "reset" });
            clearInterval(interval.current);
            interval.current = null;
          }, 7000);

          mediaRecorder.onstop = async (e) => {
            const buffer = new Blob(chunks, { type: "audio/mp3; codecs=opus" });

            let base64 = "";
            var reader = new window.FileReader();
            reader.readAsDataURL(buffer);
            reader.onloadend = async () => {
              base64 = reader.result.split(",")[1];

              await fetch("/api/stt", {
                method: "POST",
                body: JSON.stringify({ content: base64 }),
              })
                .then(async (res) => await res.json())
                .then((json) => {
                  const transcript = json.transcript;
                  setMessage(
                    transcript
                      ? json.transcript[0].toUpperCase() +
                          json.transcript.slice(1)
                      : ""
                  );
                  setRecording(false);
                });
            };
          };

          mediaRecorder.ondataavailable = async (e) => {
            chunks.push(e.data);
          };
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  };

  return (
    <div className="group flex items-center space-x-5">
      <div
        className={`relative flex w-full items-center justify-center gap-x-4 overflow-hidden rounded-full border-2 pr-4 after:absolute after:right-0 after:z-10 after:h-full after:w-full after:rounded-full after:bg-white after:duration-300 after:content-[''] ${
          recording ? `after:translate-x-0` : `after:translate-x-full`
        }`}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => handleInput(e)}
          placeholder="Mesajınızı girin"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSubmit(e);
            }
          }}
          className="w-full bg-transparent px-5 py-4 text-xl text-white focus:outline-none"
        />
        <div
          className={`absolute z-30 text-black ${
            recording ? "block" : "hidden"
          }`}
        >
          {interval.current ? (
            <div className="flex items-center space-x-2">
              <svg
                className="h-3 w-3 animate-pulse"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="50"
                  fill="red"
                  className="h-full w-full"
                />
              </svg>
              <p className="leading-none">{`00:0${timer}`}</p>
              <div className="h-2 w-44 rounded-full border border-background border-opacity-40">
                <div
                  className="h-full w-0 bg-background duration-300 ease-in-out"
                  id="progress-bar"
                />
              </div>
            </div>
          ) : (
            <Image src="/loading.svg" alt="Spinner" width={35} height={35} />
          )}
        </div>
        <MicrophoneIcon
          onClick={record}
          className={`z-20 h-10 w-10 cursor-pointer duration-300 ${
            recording && "text-black"
          }`}
        />
      </div>
      <div
        onClick={(e) => handleSubmit(e)}
        className="relative flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white before:absolute before:h-full before:w-full before:rounded-full before:border-2 before:border-white before:duration-150 before:content-[''] hover:before:scale-125"
      >
        <PaperAirplaneIcon className="h-6 w-6 text-slate-900" />
      </div>
    </div>
  );
}
