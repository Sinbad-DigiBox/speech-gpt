import db from "./db";

export const getMessage = async (userId, charId) => {
  const messages = await db.message.findMany({
    where: { userId: parseInt(userId), charId: parseInt(charId) },
  });

  return messages;
};

export const addMessage = async (content, response, userId, charId) => {
  const push = await db.message.create({
    data: { content, response, userId, charId },
  });

  return { message: "Message added." };
};

export const flushMessages = async (charId) => {
  const flush = await db.message.deleteMany({
    where: {
      charId: parseInt(charId),
    },
  });

  return { message: "Messages deleted." };
};
