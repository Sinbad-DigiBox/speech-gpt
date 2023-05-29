"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div>
      <button onClick={handleMenu}>
        <ChevronRightIcon
          className={`h-10 w-10 text-white duration-200 ${
            open && `rotate-180`
          }`}
        />
      </button>
      <ul
        className={`absolute bottom-0 left-0 top-0 m-auto block h-fit space-y-2 rounded-xl rounded-l-none p-2 duration-200 ease-in-out ${
          open ? `translate-x-0 opacity-100` : `-translate-x-10 opacity-0`
        }`}
      >
        <li className="flex items-center gap-x-2 p-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="/characters/2.png"
              width={100}
              height={100}
              alt="Gergin görünüşlü adam"
              className="mx-auto h-full w-auto"
            />
          </div>
          <h4>Gergin</h4>
        </li>
        <li className="flex items-center gap-x-2 p-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="/characters/3.png"
              width={100}
              height={100}
              alt="Dedektif"
              className="mx-auto h-full w-auto"
            />
          </div>
          <h4>Dedektif</h4>
        </li>
        <li className="flex items-center gap-x-2 p-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="/characters/4.png"
              width={100}
              height={100}
              alt="Pozitif kız"
              className="mx-auto h-full w-auto"
            />
          </div>
          <h4>Pozitif</h4>
        </li>
        <li className="flex items-center gap-x-2 p-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="/characters/1.png"
              width={100}
              height={100}
              alt="Şair"
              className="mx-auto h-full w-auto"
            />
          </div>
          <h4>Şair</h4>
        </li>
      </ul>
    </div>
  );
}
