import { sql } from "@vercel/postgres";

async function createUser(username, email) {
  return await sql`
    INSERT INTO users (username, email)
    VALUES (${username}, ${email})
    RETURNING *;
  `;
}

async function getUserByEmail(email) {
  return await sql`
    SELECT * FROM users
    WHERE email = ${email};
  `;
}

async function updateUserEmail(userId, newEmail) {
  const updatedUser = await sql`
    UPDATE users
    SET email = ${newEmail}
    WHERE id = ${userId}
    RETURNING *;
  `;
  return updatedUser;
}

async function deleteUser(userId) {
  const deletedUser = await sql`
    DELETE FROM users
    WHERE id = ${userId}
    RETURNING *;
  `;
  return deletedUser;
}

async function createFavoriteGame(gameId, userId) {
  const favoriteGame = await sql`
    INSERT INTO favorite_games (game_id, user_id)
    VALUES (${gameId}, ${userId})
    RETURNING *;
  `;
  return favoriteGame;
}

async function getUserFavoriteGames(userId) {
  const favoriteGames = await sql`
    SELECT * FROM favorite_games
    WHERE user_id = ${userId};
  `;
  return favoriteGames;
}

async function deleteFavoriteGame(favoriteGameId) {
  const deletedFavoriteGame = await sql`
    DELETE FROM favorite_games
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
