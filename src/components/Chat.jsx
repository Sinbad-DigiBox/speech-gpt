import Message from "@/components/Message";
import Response from "@/components/Response";

export default async function Chat({ firstMessage }) {
  const messages = await fetch(
    "http://localhost:3000/api/message/get?user=1&char=1",
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  ).then(async (res) => await res.json());

  return (
    <div
      className="flex h-full transform-gpu flex-col justify-end gap-y-8 overflow-y-scroll py-20"
      id="scrollbar-hide"
    >
      <Response message={firstMessage} />
      {messages.map((e) => (
        <div className="flex flex-col gap-y-8" key={e.id}>
          <Message message={e.content} />
          <Response message={e.response} />
        </div>
      ))}
    </div>
  );
}
