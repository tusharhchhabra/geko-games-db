function extractIdAsAnArray(games) {
  const ids = games.map((game) => game.id);
  return ids;
}

export default extractIdAsAnArray;
