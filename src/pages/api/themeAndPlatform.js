import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";

export default async function getGamesByThemeAndPlatform(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { nextThemeId, nextTheme, platformId } = req.query;

  const gamesQuery = queries.gamesByThemeAndPlatform(nextThemeId, platformId);
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
    title: nextTheme,
  };

  res.send(gamesObject);
}
