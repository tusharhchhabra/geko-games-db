// This file is for testing the results of database queries by visiting /api/create

import { getUserFavoriteGames } from "@/db/queries";
import seedDatabase from "@/db/seed";

export default async function handler(request, response) {
  try {
    const result = await seedDatabase();
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
