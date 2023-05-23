const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const ali = await prisma.user.upsert({
    where: { email: "ali@test.com" },
    update: {},
    create: {
      id: 1,
      email: "ali@test.com",
      name: "Ali",
    },
  });
  console.log({ ali });

  const bilimadami = await prisma.character.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Bilim Adamı",
      description: "Ayrıntılı ve güvenilir cevaplar verir.",
      firstMessage:
        "Ben ünlü bir bilim adamıyım. Yapmış olduğum çalışmalarla 2015 yılında Nobel Kimya Ödülü'nü kazandım. 1997 yılından beri ABD'deki Kuzey Karolina Üniversitesi'nde görev yapıyorum.",
    },
  });
  console.log({ bilimadami });

  const test = await prisma.message.upsert({
    where: { id: 1 },
    update: {},
    create: {
      content: "Merhaba, nasılsın?",
      response: "İyiyim, teşekkürler. Sen nasılsın?",
      userId: 1,
      charId: 1,
    },
  });
  console.log({ test });
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
