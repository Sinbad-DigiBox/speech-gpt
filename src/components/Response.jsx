"use client";

import React from "react";
import { SpeakerWaveIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Response({ message }) {
  return (
    <div className="mr-auto flex items-center justify-start space-x-2">
      <div className="w-10/12 max-w-fit break-words rounded-2xl rounded-tl-none bg-white px-4 py-3 text-xl text-slate-900 transition-all">
        {message == "" ? (
          <Image
            src="/msgloading.svg"
            width={35}
            height={35}
            alt="Message loading spinner"
          />
        ) : (
          <p className="whitespace-pre-line">{message}</p>
        )}
      </div>
      <SpeakerWaveIcon className="h-5 w-5 cursor-pointer" />
    </div>
  );
}
