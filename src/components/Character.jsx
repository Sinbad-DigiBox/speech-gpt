import Image from "next/image";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Character({ character }) {
  return (
    <>
      <div className="relative before:absolute before:bottom-12 before:left-0 before:right-0 before:mx-auto before:h-[400px] before:w-[500px] before:bg-gradient-radial before:from-slate-500 before:to-transparent before:opacity-60 before:blur-2xl before:content-['']">
        <Image
          src={`/characters/${character.id}.png`}
          width={450}
          height={500}
          className="pointer-events-none relative mx-auto"
          alt="Character icon"
        />
        <div className="absolute bottom-0 z-10 h-24 w-full bg-gradient-to-t from-white to-transparent dark:from-background" />
      </div>
      <div className="flex flex-col space-y-1 py-4 text-center">
        <h1 className="text-3xl">
          {character.name.toLocaleUpperCase("tr-TR")}
        </h1>
        <p>{character.description}</p>
      </div>
    </>
  );
}
