import db from "./db";

const getUser = async (userId) => {
  const user = await db.user.findUnique({
    where: { id: parseInt(userId) },
  });

  return user;
};

export default getUser;
