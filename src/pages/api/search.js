import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";

export default async function search(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { searchTerm } = req.query;

  const gamesQuery = `fields *; where name ~ *"${searchTerm}"* & version_parent = null & parent_game = null & themes != [42]; sort first_release_date desc; limit 10;`;
  const endpoint = "games";

  const games = await fetchData(gamesQuery, endpoint);
  const thumbnails = await fetchData(queries.coverArtForGames(games), "covers");

  const gamesWithThumbnails = queries.gamesWithCoverArt(
    games,
    thumbnails,
    "t_cover_small_2x"
  );

  res.send(gamesWithThumbnails);
}
