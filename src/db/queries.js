import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createUser = async (data) => {
    return await prisma.user.create({ data });
  };

  const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  };

  const updateUser = async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  };

  const deleteUser = async (id) => {
    return await prisma.user.delete({ where: { id } });
  };

  const getUserWithFavoriteGames = async (id) => {
    return await prisma.user.findUnique({
      where: { id },
      include: { favoriteGames: true },
    });
  };

  const addFavoriteGame = async (userId, gameId) => {
    return await prisma.favoriteGame.create({
      data: {
        userId,
        gameId,
      },
    });
  };

  const removeFavoriteGame = async (id) => {
    return await prisma.favoriteGame.delete({ where: { id } });
  };

  const getAllUsers = async () => {
    return await prisma.user.findMany();
  };

  const getAllFavoriteGames = async () => {
    return await prisma.favoriteGame.findMany();
  };
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
