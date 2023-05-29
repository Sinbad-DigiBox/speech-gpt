"use client";

import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useReducer, useRef, useState } from "react";
import { speechToText } from "@/utils/speech";

export default function Input({ insertMessage, generating, generateText }) {
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [timer, dispatch] = useReducer(reducer, 0);
  const interval = useRef();
  const audioCtxContainer = useRef();
  const mediaRecorder = useRef();
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

  const handleInput = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!message) return;
    if (generating.current) return;
    generating.current = true;
    setMessage("");
    insertMessage(message);
  };

  const startTimer = () => {
    interval.current = setInterval(() => {
      dispatch({ type: "increment" });
    }, 1000);
  };

  const stopRecord = () => {
    mediaRecorder.current.stop();
  };

  const record = () => {
    audioCtxContainer.current = new AudioContext();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          mediaRecorder.current = new MediaRecorder(stream);

          if (mediaRecorder.current.state == "recording") return;
          mediaRecorder.current.start();
          setRecording(true);
          startTimer();

          setTimeout(() => {
            mediaRecorder.current.stop();
          }, 7000);

          mediaRecorder.current.onstop = async (e) => {
            dispatch({ type: "reset" });
            clearInterval(interval.current);
            interval.current = null;

            const buffer = new Blob(chunks, { type: "audio/mp3; codecs=opus" });

            let base64 = "";
            var reader = new window.FileReader();
            reader.readAsDataURL(buffer);
            reader.onloadend = async () => {
              base64 = reader.result.split(",")[1];

              const textObject = await generateText(base64);
              const transcript = textObject.transcript;
              setMessage(
                transcript
                  ? textObject.transcript[0].toUpperCase() +
                      textObject.transcript.slice(1)
                  : ""
              );
              setRecording(false);
            };
          };

          mediaRecorder.current.ondataavailable = async (e) => {
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
    <div className="flex items-center gap-x-5">
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
            <div className="flex items-center gap-x-2">
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
        {recording ? (
          <StopIcon
            onClick={stopRecord}
            className="z-20 h-10 w-10 cursor-pointer text-black duration-300"
          />
        ) : (
          <MicrophoneIcon
            onClick={record}
            className="z-20 h-10 w-10 cursor-pointer duration-300"
          />
        )}
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
