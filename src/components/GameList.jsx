import GamesListItem from "@/components/GameListItem";

const GamesList = ({ setOfGames }) => {
  return (
    <>
      {setOfGames.map((gameSet, index) => (
        <div key={index}>
          <h2 className="text-white font-bold md:text-xl p-4">
            {gameSet.title}
          </h2>
          <div className="relative flex items-center ">
            <div id={'slider'}>
              <GamesListItem games={gameSet.games}  />
            </div>
            
          </div>
        </div>
      ))}
    </>
  );
};

export default GamesList;
