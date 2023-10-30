function extractId(games) {
  const ids = games.map((game) => game.id);
  const formattedIds = `(${ids.join(", ")})`;
  return formattedIds;
}

export default extractId;
