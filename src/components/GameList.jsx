import GamesListItem from "@/components/GameListItem";

const GamesList = ({ setOfGames }) => {
  return (
    <div>
      {setOfGames.map((gameSet, index) => (
        <div key={index}>
          <>{gameSet.title}</>
          <GamesListItem games={gameSet.games} />
        </div>
      ))}
    </div>
  );
};

export default GamesList;
