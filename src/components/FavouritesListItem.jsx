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
      <div key={game.id} className="block cursor-pointer relative lg:p-2 ">
        <div>
          <div
            onClick={() => handleFavouriteClick(game.id)}
            className="absolute top-5 left-6 z-10"
          >
            {isFavourite(game.id) ? heartFilled : heart}
          </div>
          <Link href={`/games/${game.id}`} className="">
            <img
              loading="lazy"
              src={game.coverUrl}
              alt={game.name}
              className="block cursor-pointer relative  rounded-lg
              lg:w-[240px] lg:h-[335px] lg: m-2
              md:w-[250px] md:h-[315px]
              sm:w-[150px] sm:h-[185px]
              w-[250px] h-[305px] m-0 p-1
              "
            />
          </Link>
        </div>
      </div>
    );
  });
}

export default FavouritesListItem;
