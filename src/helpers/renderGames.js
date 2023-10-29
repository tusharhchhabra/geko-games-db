function renderGames(games) {
  return games.map((game) => (
    <div key={game.id}>
      <h2>{game.name}</h2>
      {game.coverUrl && (
        <img loading="lazy" src={game.coverUrl} alt={game.name} />
      )}
    </div>
  ));
}

export default renderGames;
