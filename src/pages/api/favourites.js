import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";

export default async function search(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { game_id } = req.query;

  const formatIds = function (gameIdString) {
    const gameIdsArray = gameIdString.split(",").map(Number);
    const uniqueIds = [...new Set(gameIdsArray)];
    const formattedIds = `(${uniqueIds.join(", ")})`;
    return formattedIds;
  };
  const gameIds = formatIds(game_id);

  const gamesQuery = queries.game(gameIds);
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
    title: "Favourites",
  };

  res.send([gamesObject]);
}
