import { prisma } from "../../../server/db";

export default async function (req: any, res: any) {
  if (req.method === "POST") {
    const { userId, charId } = req.body;
    if (!userId) {
      res.status(400).json({ error: "userId could not get" });
    }
    const chat = await prisma.chat.findMany({
      where: { userId: userId, charId: charId },
    });
    const messages = await prisma.message.findMany({
      where: { chatId: chat[0]?.chatId },
    });
    res.status(200).json(messages);
  }
}
