import { deleteFavoriteGame } from "@/db/queries";

export default async function deleteFavourite(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end("Method Not Allowed");
  }

  const { gameId, userId } = req.body;

  try {
    const result = await deleteFavoriteGame(gameId, userId);
    if (result) {
      res.status(200).json({
        message: "Favourite deleted successfully",
        newFavourite: result,
      });
    } else {
      res.status(404).json({ message: "Favourite not found" });
    }
  } catch (error) {
    console.error("Error processing the delete action:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
