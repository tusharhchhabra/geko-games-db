import { React, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FavouritesContext from "@/context/FavouritesContext";


const heart = <FontAwesomeIcon icon={faHeart} size="lg" />;
const heartFilled = (
  <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#FF0000" }} />
);

function FavouritesListItem({ games }) {
 
  const { toggleFavourite, state } = useContext(FavouritesContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const isFavourite = (gameId) => {
    return state.favourites.some(favourite => favourite.game_id === gameId);
  };
  
  const handleFavouriteClick = (gameId, userId) => {
    setIsUpdating(true);
    isFavourite(gameId);
    toggleFavourite(userId, gameId)
      .then(() => {
        setIsUpdating(false);
      })
      .catch((error) => {
        console.error("Error toggling favourite:", error);
        setIsUpdating(false);
      });
  };

  return games.map((game) => {
    return (
      <div
        key={game.id}
        className="m-6 p-4 transform transition-transform duration-300 hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
      >
        <div onClick={() => handleFavouriteClick(game.id, 1)}>
          {isFavourite(game.id) ? heartFilled : heart}
        </div>
        <img
          loading="lazy"
          src={game.coverUrl}
          alt={game.name}
          className="w-full h-[250px] object-cover mb-4 rounded-md "
        />
        <h2 className="text-white text-2xl mb-4">{game.name}</h2>
      </div>
    );
  });
}

export default FavouritesListItem;
