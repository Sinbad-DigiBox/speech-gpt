import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user1 = await prisma.user.upsert({
    where: { userId: "1" },
    update: {},
    create: {
      userId: "1",
      email: "yunus@gmail.com",
      password: "test123",
    },
  });
  const user2 = await prisma.user.upsert({
    where: { userId: "2" },
    update: {},
    create: {
      userId: "2",
      email: "firat@gmail.com",
      password: "test123",
    },
  });
  const user3 = await prisma.user.upsert({
    where: { userId: "3" },
    update: {},
    create: {
      userId: "3",
      email: "furkan@gmail.com",
      password: "test123",
    },
  });
  const user4 = await prisma.user.upsert({
    where: { userId: "4" },
    update: {},
    create: {
      userId: "4",
      email: "sila@gmail.com",
      password: "test123",
    },
  });
  const user5 = await prisma.user.upsert({
    where: { userId: "5" },
    update: {},
    create: {
      userId: "5",
      email: "petek@gmail.com",
      password: "test123",
    },
  });
  console.log({ user1, user2, user3, user4, user5 });

  const char1 = await prisma.character.upsert({
    where: { charId: "1" },
    update: {},
    create: {
      charId: "1",
      name: "Yalancı Adam",
      persona: "Yalan söyler",
    },
  });
  const char2 = await prisma.character.upsert({
    where: { charId: "2" },
    update: {},
    create: {
      charId: "2",
      name: "Şakacı Adam",
      persona: "Şaka yapar",
    },
  });
  const char3 = await prisma.character.upsert({
    where: { charId: "3" },
    update: {},
    create: {
      charId: "3",
      name: "Bilgili Adam",
      persona: "Bilgilidir",
    },
  });
  console.log({ char1, char2, char3 });

  const chat1 = await prisma.chat.upsert({
    where: { chatId: "1" },
    update: {},
    create: {
      charId: "1",
      chatId: "1",
      userId: "1",
      messages: {
        create: [
          {
            messageId: "1",
            message: "Nabersin",
            response: "İyilik",
          },
          {
            messageId: "2",
            message: "Nabersin",
            response: "İyilik",
          },
        ],
      },
    },
  });
  console.log({ chat1 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
