"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Modal({ characters }) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="mx-auto mb-36 block rounded-lg bg-gray-200 px-12 py-4 text-xl font-bold text-background"
      >
        Hemen Dene
      </button>
      {open && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-30 m-auto flex h-28 w-1/2 items-center">
          <ul className="z-40 mx-auto flex flex-col rounded-2xl bg-background p-8 shadow-lg shadow-gray-500">
            <h2 className="mb-8 w-full text-center text-2xl font-bold">
              Karakter seç
            </h2>
            <div className="flex">
              {characters.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.id.toString()}
                    className="flex flex-col items-center gap-y-2 p-4"
                  >
                    <div className="h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={`/characters/${c.id}.png`}
                        width={100}
                        height={100}
                        alt={c.name}
                        className="mx-auto h-full w-auto"
                      />
                    </div>
                    <h4>{c.name}</h4>
                  </Link>
                </li>
              ))}
            </div>
          </ul>
          <div
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
