import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";

export default async function search(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { platformId } = req.query;
  const query = Number(platformId);
  const top10GamesQuery = queries.top10GamesByPlatform(query);
  const endpoint = "games";
  const top10Games = await fetchData(top10GamesQuery, endpoint);
  const top10GamesCovers = await fetchData(
    queries.coverArtForGames(top10Games),
    "covers"
  );
  const gamesWithCovers = queries.gamesWithCoverArt(
    top10Games,
    top10GamesCovers,
    "t_cover_big"
  );
  const top10GamesObject = {
    games: gamesWithCovers,
    title: "Top 10 Games",
  };

  const newPlatforms = [167, 48, 169, 6, 49, 130];
  if (newPlatforms.includes(query)) {
    const newGamesQuery = queries.newGamesByPlatform(query);
    const newGames = await fetchData(newGamesQuery, endpoint);
    const newGamesCovers = await fetchData(
      queries.coverArtForGames(newGames),
      "covers"
    );
    const newGamesWithCovers = queries.gamesWithCoverArt(
      newGames,
      newGamesCovers,
      "t_cover_big"
    );
    const newGamesObject = {
      games: newGamesWithCovers,
      title: "New & Noteworthy",
    };

    const gameObject = {
      top10Games: top10GamesObject,
      newGames: newGamesObject,
    };

    res.send([top10GamesObject, newGamesObject]);
  } else {
    res.send([top10GamesObject]);
  }
}
