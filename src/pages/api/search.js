import fetchData from "@/helpers/fetchData";

export default async function search(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const { searchTerm } = req.query;
  console.log("searched", searchTerm);

  const query = `search "${searchTerm}"; fields *;`;
  const endpoint = "games";

  const games = await fetchData(query, endpoint);
  console.log(games.map((game) => game.name));

  res.send(games);
}
