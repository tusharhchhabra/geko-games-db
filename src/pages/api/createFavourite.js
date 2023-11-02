import { createFavoriteGame } from "@/db/queries";

export default async function createFavourite(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { userId, gameId } = req.body;

  try {
    const newFavourite = await createFavoriteGame(gameId, userId);
    if (newFavourite) {
      res
        .status(201)
        .json({ message: "Favourite created successfully", newFavourite });
    } else {
      res.status(400).json({ message: "Failed to create favourite" });
    }
  } catch (error) {
    console.error("Error processing the create action:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
