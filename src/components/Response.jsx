"use client";

import React from "react";
import { SpeakerWaveIcon } from "@heroicons/react/20/solid";

export default function Message({ message }) {
  return (
    <div className="mr-auto flex items-center justify-start space-x-2">
      <div className="w-10/12 rounded-2xl rounded-tl-none bg-white px-4 py-3 text-xl text-slate-900">
        {message}
      </div>
      <SpeakerWaveIcon className="h-5 w-5 cursor-pointer" />
    </div>
  );
}
