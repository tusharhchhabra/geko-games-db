const GameListItem = ({ combinedData }) => {
  
  const game = combinedData.map(game => (
    <div key={game.id}>
      <h2>{game.name}</h2>
      {game.coverUrl && <img loading="lazy" src={game.coverUrl} alt={game.name} />}
    </div>
  ));
    

  return (
    <div>
      {game}
    </div>
  );
}

export default GameListItem;