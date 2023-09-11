"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Menu({ characters }) {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleMenu}
        className="group flex items-center duration-200"
      >
        <ChevronRightIcon
          className={`h-10 w-10 text-white duration-200 group-hover:scale-y-50 ${
            open && `rotate-180`
          }`}
        />
        <h3>Karakterler</h3>
      </button>
      <ul
        className={`absolute bottom-0 left-0 top-0 m-auto block h-fit space-y-2 rounded-xl rounded-l-none p-2 duration-200 ease-in-out ${
          open ? `translate-x-0 opacity-100` : `-translate-x-10 opacity-0`
        }`}
      >
        {characters.map((c) => (
          <li key={c.id}>
            <Link
              href={c.id.toString()}
              className="flex items-center gap-x-2 p-4"
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
      </ul>
    </div>
  );
}
