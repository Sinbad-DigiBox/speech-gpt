import db from "./db";

export const getCharacter = async (charId) => {
  const character = await db.character.findUnique({
    where: { id: parseInt(charId) },
  });

  return character;
};

export const getCharacters = async () => {
  const character = await db.character.findMany();

  return character;
};
