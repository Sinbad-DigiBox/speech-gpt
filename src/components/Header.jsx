import Image from "next/image";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Header() {
  const user = await fetch(
    "https://speech-dm376v9qc-yuuns.vercel.app/api/user/get?id=1",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => await res.json());

  return (
    <header className="flex w-full items-center justify-between">
      <div>
        <Bars3BottomLeftIcon className="h-10 w-10 dark:text-white" />
      </div>
      <Link
        href="/"
        className="relative flex place-items-center after:absolute after:-z-20 after:h-[160px] after:w-[300px] after:bg-gradient-radial after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] after:dark:from-sky-500 after:dark:via-[#2f4da7] after:dark:opacity-60"
      >
        <Image
          src="/logo.svg"
          width={300}
          height={200}
          alt="Konuşa Konuşa logo"
          priority
          className="drop-shadow-[0_0_0.3rem_#ffffff70] invert dark:invert-0"
        />
      </Link>
      <Link href="/" className="mr-4">
        <div className="flex items-center gap-x-2 text-lg">
          <UserCircleIcon className="h-10 w-10" />
          <h2>{user.name}</h2>
        </div>
      </Link>
    </header>
  );
}
