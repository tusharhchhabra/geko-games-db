import fetchData from "@/helpers/fetchData";
import queries from "@/queryStrings";

export default async function search(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { nextThemeId, nextTheme } = req.query;
  const gamesQuery = queries.gamesByTheme(nextThemeId);
  const endpoint = "games";

  const games = await fetchData(gamesQuery, endpoint);
  const covers = await fetchData(queries.coverArt(games), "covers");

  const gamesWithCovers = queries.gamesWithCoverArt(
    games,
    covers,
    "t_cover_big"
  );

  const gamesObject = {
    games: gamesWithCovers,
    title: nextTheme,
  };

  res.send(gamesObject);
}
