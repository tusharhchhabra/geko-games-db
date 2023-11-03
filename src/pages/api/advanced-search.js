import fetchData from "@/helpers/fetchData";
import buildQuery from "@/helpers/queryBuilder";
import queries from "@/helpers/queryStrings";

export default async function advancedSearch(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { searchParams } = req.body;

  const gamesQuery = buildQuery(searchParams);

  const games = await fetchData(gamesQuery, "games");
  const thumbnails = await fetchData(queries.coverArtForGames(games), "covers");

  const gamesWithThumbnails = queries.gamesWithCoverArt(
    games,
    thumbnails,
    "t_cover_small"
  );

  res.send({ gamesWithThumbnails });
}
