import fetchData from "@/helpers/fetchData";
import queries from "@/queryStrings";

export default async function getVideos(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { nextPlatformId, nextPlatform } = req.query;

  console.log("req.query", req.query);

  const gameQuery = queries.gamesByPlatform(nextPlatformId);

  const games = await fetchData(gameQuery, "games");
  console.log("games", games);
  const covers = await fetchData(queries.coverArt(games), "covers");
  const gamesWithCovers = queries.gamesWithCoverArt(
    games,
    covers,
    "t_cover_big"
  );

  const gamesObject = {
    games: gamesWithCovers,
    title: nextPlatform,
  }
  res.send(gamesObject);
}