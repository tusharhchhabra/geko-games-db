function extractThemeAsAnArray(games) {
  const names = games.map((game) => game.name);
  return names;
}

export default extractThemeAsAnArray;
