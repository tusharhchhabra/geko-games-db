import { sql } from "@vercel/postgres";

const dropTables = async () => {
  const result1 = await sql`
      DROP TABLE IF EXISTS users;
    `;
  const result2 = await sql`
      DROP TABLE IF EXISTS favorite_games;
    `;
  return { result1, result2 };
};

const createTables = async () => {
  const usersTable = await sql`
      CREATE TABLE users (
        id          SERIAL PRIMARY KEY,
        username    VARCHAR(255),
        email       VARCHAR(255) UNIQUE NOT NULL,
        created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;
  const favoriteGamesTable = await sql`
      CREATE TABLE favorite_games (
        id SERIAL PRIMARY KEY,
        game_id INT NOT NULL,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;
  return { usersTable, favoriteGamesTable };
};

export { dropTables, createTables };
