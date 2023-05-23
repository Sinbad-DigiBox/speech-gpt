"use client";

import React from "react";

export default function Message({ message }) {
  return (
    <div className="ml-auto w-8/12 rounded-2xl rounded-br-none bg-sky-900 px-4 py-3 text-xl text-white">
      {message}
    </div>
  );
}
