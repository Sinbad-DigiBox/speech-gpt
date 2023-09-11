import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { getCharacters } from "@/utils/char";
import Image from "next/image";

export default async function Home() {
  const characters = await getCharacters();

  return (
    <>
      <main className="w-full">
        <div className="mx-auto my-32 flex justify-center">
          <Image
            src="/characters/1.png"
            width={300}
            height={500}
            quality={100}
            className="-z-10 translate-x-6 translate-y-4 rounded-2xl border bg-gray-800 shadow-xl shadow-gray-700"
            priority
          />
          <Image
            src="/characters/2.png"
            width={300}
            height={500}
            quality={100}
            className="z-10 scale-125 rounded-2xl border bg-gray-800 shadow-xl shadow-gray-700"
            priority
          />
          <Image
            src="/characters/4.png"
            width={300}
            height={500}
            quality={100}
            className="-z-10 -translate-x-6 translate-y-4 rounded-2xl border bg-gray-800 shadow-xl shadow-gray-700"
            priority
          />
        </div>
        <h2 className="mb-10 mt-20 text-center text-7xl font-black">
          Enteresan kişiliklerle konuş
        </h2>
        <Modal characters={characters} />
      </main>
      <Footer />
    </>
  );
}
