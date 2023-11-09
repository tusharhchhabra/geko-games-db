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

  const gamesWithSizedCoverUrl = queries.searchedGamesWithSizedCovers(
    games,
    "t_cover_big_2x"
  );

  res.send({ games: gamesWithSizedCoverUrl });
}
