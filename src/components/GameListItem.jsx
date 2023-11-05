import React, { useState, useRef, useContext } from "react";
import Link from "next/link";
import FavouritesContext from "@/context/FavouritesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function GameListItem({ games }) {
  const [videos, setVideos] = useState({});
  const [hoveredGameId, setHoveredGameId] = useState(null);
  const gameListRef = useRef(null);
  const { toggleFavourite, state } = useContext(FavouritesContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const heart = <FontAwesomeIcon icon={faHeart} size="xl" />;
  const heartFilled = (
    <FontAwesomeIcon icon={faHeart} size="xl" style={{ color: "#FF0000" }} />
  );
  const heartBig = <FontAwesomeIcon icon={faHeart} size="2xl" />;
  const heartFilledBig = (
    <FontAwesomeIcon icon={faHeart} size="2xl" style={{ color: "#FF0000" }} />
  );

  const isFavourite = (gameId) => {
    return state.favourites.some((favourite) => favourite.game_id === gameId);
  };

  async function fetchVideo(gameId) {
    try {
      const response = await fetch(
        `/api/videos?videoID=${encodeURIComponent(gameId)}`
      );
      const result = await response.json();

      if (result && result.length > 0) {
        setVideos((prevVideos) => ({
          ...prevVideos,
          [gameId]: result[0],
        }));
        setHoveredGameId(gameId);
      } else {
        clearVideo(gameId);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }

  function clearVideo(gameId) {
    setVideos((prevVideos) => {
      const newVideos = { ...prevVideos };
      delete newVideos[gameId];
      return newVideos;
    });
    setHoveredGameId(null);
  }

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

  const handleClick = () => {
    console.log("CLICKED!!!");
  };

  return games.map((game) => {
    const gameVideo = videos[game.id];
    return (
      <div
        key={game.id}
        className="w-[240px] h-[352px] inline-block cursor-pointer relative p-2"
      >
        <div
          onClick={() => handleFavouriteClick(game.id, 1)}
          className="absolute top-2.5 left-3.5"
        >
          {isFavourite(game.id) ? heartFilled : heart}
        </div>
        <img
          id={game.id}
          loading="lazy"
          src={game.coverUrl}
          alt={game.name}
          onMouseEnter={() => {
            gameListRef.current = setTimeout(() => {
              fetchVideo(game.id);
            }, 1500);
          }}
          onMouseLeave={() => {
            clearTimeout(gameListRef.current);
          }}
          className={
            gameVideo && game.id === hoveredGameId
              ? "hidden"
              : "block rounded-lg "
          }
        />

        <div
          className="relative w-[560px] h-[400px]"
          onClick={handleClick}
          onMouseLeave={() => {
            clearVideo(game.id);
          }}
        >
          {gameVideo && (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-10 w-[425px] h-[332px] bg-violet-500 rounded-lg">
              <iframe
                className={
                  gameVideo && game.id === hoveredGameId
                    ? "absolute top-0 bottom-0 left-0 right-0 z-10 rounded-lg"
                    : "hidden"
                }
                width="425"
                height="275"
                src={`https://www.youtube.com/embed/${gameVideo.video_id}?si=rKISgJFVYRGMtTwG&amp;start=10&autoplay=1&mute=1&controls=0&showinfo=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <Link href={`/games/${game.id}`}>
                {/* <button
                  className={`text-white absolute bottom-2 right-5 bg-black px-4 py-2 rounded-2xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                >
                  Game Details
                </button> */}
                <div className="absolute bottom-1 right-3">
                <button class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] active:scale-95">
                  <span class="w-full h-full flex items-center gap-2 px-2 py-2 bg-black text-white rounded-[14px] bg-gradient-to-t from-black to-violet-800 text-lg font-bold">
                    <svg
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke="currentColor"
                      fill="none"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"></path>
                    </svg>
                    More Details
                  </span>
                </button>

                </div>
              </Link>
              <div
                onClick={() => handleFavouriteClick(game.id, 1)}
                className="absolute bottom-4 left-5"
              >
                {isFavourite(game.id) ? heartFilledBig : heartBig}
              </div>
            </div>
          )}
          {/* <div
            className={
              !gameVideo && game.id !== hoveredGameId
                ? "hidden"
                : "absolute top-0 left-0 w-full h-full bg-transparent cursor-pointer z-10"
            }
          ></div> */}
        </div>
      </div>
    );
  });
}

export default GameListItem;
