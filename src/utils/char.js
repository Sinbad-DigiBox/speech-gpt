import db from "./db";

const getCharacter = async (charId) => {
  const character = await db.character.findUnique({
    where: { id: parseInt(charId) },
  });

  return character;
};

export default getCharacter;
