import fetchData from "@/helpers/fetchData";
import queries from "@/queryStrings";

export default async function getVideos(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { platformId, platformName } = req.query;


  const games = await fetchData(queries.gamesByPlatforms(platformId), "games");

  const gameCovers = await fetchData(queries.coverArt(games), "covers");

  const gamesWithCovers = queries.gamesWithCoverArt(games, gameCovers, "t_cover_big");

  const gamesObject = {
    games: gamesWithCovers,
    title: platformName
  }
  res.send(gamesObject);
}
