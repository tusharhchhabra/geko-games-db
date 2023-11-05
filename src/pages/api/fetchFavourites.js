import { getUserFavoriteGames } from "@/db/queries";

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    let games = await getUserFavoriteGames(userId);
    games = games.rows.map((game) => {
      return {
        id: game.id,
        game_id: game.game_id,
        user_id: game.user_id,
      };
    });
    res.status(200).json({ games });
  } catch (error) {
    console.error("Error fetching user favorite games: ", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}
