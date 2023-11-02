import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";

export default async function gptGames (req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { suggestedFavourites } = req.query;
  const gamesQuery = suggestedFavourites;
  const endpoint = "games";

  const games = await fetchData(gamesQuery, endpoint);
  const covers = await fetchData(queries.coverArtForGames(games), "covers");

  const gamesWithCovers = queries.gamesWithCoverArt(
    games,
    covers,
    "t_cover_big"
  );

  const gamesObject = {
    games: gamesWithCovers,
    title: "AI Suggested Games"
  };

  res.send(gamesObject);
}
