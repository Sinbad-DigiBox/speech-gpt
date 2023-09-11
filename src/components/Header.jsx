import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Menu from "./Menu";
import getUser from "@/utils/user";

export default async function Header({ characters }) {
  const user = await getUser(1);

  return (
    <header className="flex w-full items-center justify-between">
      <Menu characters={characters} />
      <Link
        href="/"
        className="relative flex place-items-center after:absolute after:-z-20 after:h-[160px] after:w-[300px] after:bg-gradient-radial after:from-sky-500 after:via-[#2f4da7] after:opacity-60 after:blur-2xl after:content-['']"
      >
        <Image
          src="/logo.svg"
          width={300}
          height={200}
          alt="Konuşa Konuşa logo"
          priority
          className="drop-shadow-[0_0_0.3rem_#ffffff70] invert-0"
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
