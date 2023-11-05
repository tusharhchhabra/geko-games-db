import FavouritesListItem from "./FavouritesListItem";

const FavouritesList = ({ setOfGames }) => {
  return (
    <div>
      {setOfGames.map((gameSet, index) => (
        <div key={index}>
          <span className="text-violet-500 font-bold p-2 ml-10 mt-5 text-4xl [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-black">
            {gameSet.title}
          </span>
          <div className="grid grid-cols-5">
            <FavouritesListItem games={gameSet.games} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouritesList;
