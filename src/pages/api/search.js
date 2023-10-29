import fetchData from "@/helpers/fetchData";

export default async function search(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { searchTerm } = req.query;
  console.log("searched", searchTerm);

  const gamesQuery = `search "${searchTerm}"; fields *;`;
  const endpoint = "games";

  const games = await fetchData(gamesQuery, endpoint);
  console.log(games.map((game) => game.name));

  const thumbnailsQuery = `fields url; where id = (
    ${games.map((game) => game.cover).join(", ")});`;
  const thumbnails = await fetchData(thumbnailsQuery, "covers");
  console.log("thumbnails", thumbnails);

  res.send(games);
}