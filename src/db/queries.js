import { sql } from "@vercel/pg";

async function createUser(username, email) {
  const user = await sql`
    INSERT INTO "User" (username, email)
    VALUES (${username}, ${email})
    RETURNING *;
  `;
  return user;
}

async function getUserByEmail(email) {
  const user = await sql`
    SELECT * FROM "User"
    WHERE email = ${email};
  `;
  return user;
}

async function updateUserEmail(userId, newEmail) {
  const updatedUser = await sql`
    UPDATE "User"
    SET email = ${newEmail}
    WHERE id = ${userId}
    RETURNING *;
  `;
  return updatedUser;
}

async function deleteUser(userId) {
  const deletedUser = await sql`
    DELETE FROM "User"
    WHERE id = ${userId}
    RETURNING *;
  `;
  return deletedUser;
}

async function createFavoriteGame(gameId, userId) {
  const favoriteGame = await sql`
    INSERT INTO "FavoriteGame" (game_id, user_id)
    VALUES (${gameId}, ${userId})
    RETURNING *;
  `;
  return favoriteGame;
}

async function getUserFavoriteGames(userId) {
  const favoriteGames = await sql`
    SELECT * FROM "FavoriteGame"
    WHERE user_id = ${userId};
  `;
  return favoriteGames;
}

async function deleteFavoriteGame(favoriteGameId) {
  const deletedFavoriteGame = await sql`
    DELETE FROM "FavoriteGame"
    WHERE id = ${favoriteGameId}
    RETURNING *;
  `;
  return deletedFavoriteGame;
}

export {
  createUser,
  getUserByEmail,
  updateUserEmail,
  deleteUser,
  createFavoriteGame,
  getUserFavoriteGames,
  deleteFavoriteGame,
};
