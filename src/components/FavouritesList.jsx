import FavouritesListItem from "./FavouritesListItem";

const FavouritesList = ({ setOfGames }) => {
  return (
    <div>
      {setOfGames.map((gameSet, index) => (
        <div key={index}>
          <span className="text-violet-500 font-bold text-4xl [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-black
          lg:p-2 lg:ml-10 lg:mt-5
          md:p-2 md:ml-5 md:mt-5
          sm:p-1 sm:ml-5 sm:mt-5
          p-0 ml-5 mt-[50px]
          
          
          ">
            {gameSet.title}
          </span>
          <div className="grid 
          lg:grid-cols-5
          md:grid-cols-4
          sm:grid-cols-4
          grid-cols-2
          ">
        
            <FavouritesListItem games={gameSet.games} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouritesList;
