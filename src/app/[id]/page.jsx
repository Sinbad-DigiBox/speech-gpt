import Character from "@/components/Character";
import ChatBox from "@/components/ChatBox";
import getCharacter from "@/utils/char";
import createCompletion from "@/utils/chat";
import { textToSpeech } from "@/utils/speech";
import { addMessage, getMessage } from "@/utils/message";

export default async function Chat({ params }) {
  const character = await getCharacter(params.id);

  const fetchMessages = async (charId) => {
    "use server";

    const messages = await getMessage(1, charId);
    return messages;
  };

  const addMessages = async (message, response, charId) => {
    "use server";

    await addMessage(message, response, 1, parseInt(charId));
  };

  const generateAnswer = async (prompt, history, trait) => {
    "use server";

    const previousMessages = [];
    history.forEach((e) => {
      previousMessages.push({ role: "user", content: e.content });
      previousMessages.push({ role: "assistant", content: e.response });
    });
    const response = await createCompletion(prompt, previousMessages, trait);
    return response;
  };

  const generateSpeech = async (content) => {
    "use server";

    const response = await textToSpeech(content);
    return response;
  };

  return (
    <main className="mx-auto mt-10 flex w-full flex-col items-center justify-between">
      <div className="mx-auto flex w-full justify-evenly">
        <div className="w-1/2">
          <Character character={character} />
        </div>
        <div className="flex h-[44rem] w-1/2 flex-col space-y-20">
          <ChatBox
            firstMessage={character.firstMessage}
            charId={params.id}
            generateAnswer={generateAnswer}
            generateSpeech={generateSpeech}
            addMessages={addMessages}
            getMessages={fetchMessages}
            trait={character.system}
          />
        </div>
      </div>
    </main>
  );
}
