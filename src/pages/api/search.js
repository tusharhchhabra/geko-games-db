import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";

export default async function search(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { searchTerm } = req.query;

  const gamesQuery = `search "${searchTerm}"; fields *;`;
  const endpoint = "games";

  const games = await fetchData(gamesQuery, endpoint);
  const thumbnails = await fetchData(queries.coverArt(games), "covers");

  const gamesWithThumbnails = queries.gamesWithCoverArt(
    games,
    thumbnails,
    "t_cover_small"
  );

  res.send(gamesWithThumbnails);
}
