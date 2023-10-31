import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const result = await sql```
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS favorite_games;

      CREATE TABLE users (
        id          SERIAL PRIMARY KEY,
        username    VARCHAR(255),
        email       VARCHAR(255) UNIQUE NOT NULL,
        created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE favorite_games (
        id SERIAL PRIMARY KEY,
        game_id INT NOT NULL,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    ```;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
