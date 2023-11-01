// This file is for testing the results of database queries by visiting /api/create

import { getUserFavoriteGames } from "@/db/queries";
import seedDatabase from "@/db/seed";
import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const result = await getUserFavoriteGames(1);
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
