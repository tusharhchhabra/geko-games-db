import GamesListItem from "@/components/GameListItem";

const GamesList = ({ setOfGames }) => {
  return (
    <div>
      {setOfGames.map((gameSet, index) => (
        <div key={index}>
          <span className="text-4xl font-extrabold text-indigo-600 px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            {gameSet.title}
          </span>
          <GamesListItem games={gameSet.games} />
        </div>
      ))}
    </div>
  );
};

export default GamesList;
