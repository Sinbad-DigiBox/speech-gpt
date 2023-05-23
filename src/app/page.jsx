import Character from "@/components/Character";
import Chat from "@/components/Chat";
import ChatBox from "@/components/ChatBox";
import Input from "@/components/Input";

export default async function Home() {
  const character = await fetch("http://localhost:3000/api/char/get?id=1", {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  }).then(async (res) => await res.json());

  return (
    <main className="mx-auto mt-10 flex w-full flex-col items-center justify-between">
      <div className="mx-auto flex w-full justify-evenly ">
        <div className="w-1/2">
          <Character character={character} />
        </div>
        <div className="flex h-[44rem] w-1/2 flex-col space-y-20">
          <ChatBox firstMessage={character.firstMessage} />
        </div>
      </div>
    </main>
  );
}
