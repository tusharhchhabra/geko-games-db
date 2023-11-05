import { React, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FavouritesContext from "@/context/FavouritesContext";
import Link from "next/link";

const heart = <FontAwesomeIcon icon={faHeart} size="lg" />;
const heartFilled = (
  <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#FF0000" }} />
);

function FavouritesListItem({ games }) {
  const { toggleFavourite, state } = useContext(FavouritesContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const isFavourite = (gameId) => {
    return state.favourites.some((favourite) => favourite.game_id === gameId);
  };

  const handleFavouriteClick = (gameId) => {
    setIsUpdating(true);
    isFavourite(gameId);
    toggleFavourite(gameId)
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
      <div key={game.id} className="inline-block cursor-pointer relative p-2">
        <div>
          <div
            onClick={() => handleFavouriteClick(game.id)}
            className="absolute top-8 left-9 z-10"
          >
            {isFavourite(game.id) ? heartFilled : heart}
          </div>
          <Link href={`/games/${game.id}`} className="">
            <img
              loading="lazy"
              src={game.coverUrl}
              alt={game.name}
              className="block cursor-pointer relative p-2 rounded-lg m-3"
            />
          </Link>
        </div>
      </div>
    );
  });
}

export default FavouritesListItem;
