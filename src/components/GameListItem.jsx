import React, { useState, useRef, useContext, useEffect } from "react";
import Link from "next/link";
import FavouritesContext from "@/context/FavouritesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@/context/AuthContext";

function GameListItem({ games, gameSetRef, index }) {
  const [videos, setVideos] = useState({});
  const [hoveredGameId, setHoveredGameId] = useState(null);
  const gameListRef = useRef(null);
  const { toggleFavourite, state } = useContext(FavouritesContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useContext(AuthContext);

  
  const gameSetIndex = index;
  const heartBig = <FontAwesomeIcon icon={faHeart}/>;
  const heartFilledBig = (
    <FontAwesomeIcon icon={faHeart} style={{ color: "#FF0000" }} />
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

  return games.map((game, index) => {
    const gameVideo = videos[game.id];

    let style = "translate-x-0";

    gameSetRef.map((ref) => {
      if (ref.index === gameSetIndex) {
        if (ref.slidePosition === 0 && index === 6) {
          style = "lg:-translate-x-28";
        } else if (ref.slidePosition === 0 && index === 7) {
          style = "lg:-translate-x-72";
        } else if (ref.slidePosition === 200 && index === 7) {
          style = "lg:-translate-x-40";
        } else if (ref.slidePosition === 200 && index === 8) {
          style = "lg:-translate-x-80";
        } else if (ref.slidePosition === 200 && index === 0) {
         style = "lg:translate-x-48"; 
        } else if (ref.slidePosition === 400 && index === 8) {
          style = "lg:-translate-x-52";
        } else if (ref.slidePosition === 400 && index === 9) {
          style = "lg:-translate-x-96";
        } else if (ref.slidePosition === 400 && index === 1) {
          style = "lg:translate-x-44";
        } else if ((ref.slidePosition === 600 || ref.slidePosition === 610) && index === 9) {
          style = "lg:-translate-x-56";
        } else if ((ref.slidePosition === 600 || ref.slidePosition === 610) && index === 2) {
          style = "lg:translate-x-36";
        }
      }
    });

    return (
      <div
        key={game.id}
        className={`w-[100px] h-[125px] sm:w-[150px] sm:h-[185px] md:w-[180px] md:h-[215px] lg:w-[240px] lg:h-[352px] inline-block cursor-pointer relative p-2`}
      >
        <Link href={`/games/${game.id}`}>
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
                : `block rounded-lg shadow-lg hover:shadow-[0px_10px_15px_rgba(255,255,255,1)] shadow-[0_5px_10px_rgba(95,61,196,1)] transition duration-200 ease-in-out hover:scale-105  hover:brightness-110 z-0`
            }
          />
        </Link>

        <div
          className="relative w-[100px] h-[125px] sm:w-[150px] sm:h-[185px] md:w-[180px] md:h-[215px] lg:w-[240px] lg:h-[352px] inline-block cursor-pointer relative p-2"
          onMouseLeave={() => {
            clearVideo(game.id);
          }}
        >
          {gameVideo && (
            // Box With video in it
            <div
              className={`absolute top-0 bottom-0 left-0 right-0 
            w-[150px] h-[120px]
            sm:w-[200px] sm:h-[166px]
            md:w-[300px] md:h-[210px]
            lg:w-[425px] lg:h-[330px]
            bg-violet-500/[0.9] rounded-lg
            z-30
            ${style}`}
            >
              <iframe
                className={
                  // Video size
                  gameVideo && game.id === hoveredGameId
                    ? "absolute top-0 bottom-0 left-0 right-0 rounded-lg w-[150px] h-[100px] sm:w-[200px] sm:h-[135px] md:w-[300px] md:h-[175px] lg:w-[425px] lg:h-[275px] z-30"
                    : "hidden"
                }
                src={`https://www.youtube.com/embed/${gameVideo.video_id}?si=rKISgJFVYRGMtTwG&amp;start=10&autoplay=1&mute=1&controls=0&showinfo=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <Link href={`/games/${game.id}`}>
                {/* button position */}
                <div className="absolute bottom-[0px] right-[5px] sm:bottom-[3px] sm:right-[5px] md:bottom-[5px] md:right-[5px] lg:bottom-1 lg:right-3">
                  <button className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] active:scale-95">
                    {/* px & py to control button size */}
                    <span className="w-[50px] h-[10px] sm:w-[70px] sm:h-[22px] md:w-full md:h-full lg:w-full lg:h-full flex items-center gap-2 px-[1px] py-[0px] sm:px-[1px] sm:py-[2px] lg:px-2 lg:py-2 bg-black text-white rounded-[14px] bg-gradient-to-t from-black to-black text-[4px] sm:text-[7.25px] md:text-md lg:text-lg font-bold">
                      <svg
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] lg:w-5 lg:h-5" // Controller size
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
              {user && (
                <div
                  onClick={() => handleFavouriteClick(game.id)}
                  className="absolute
                  lg:bottom-3 lg:left-5 lg:text-[35px]
                  md:bottom-0.75 md:left-5 md:text-2xl
                  sm:bottom-0.5 sm:left-5 sm:text-xl
                  bottom-0.5 left-2 text-sm
                  "
                >
                  {isFavourite(game.id) ? heartFilledBig : heartBig}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="inline-block" style={{ width: "105px" }}></div>
      </div>
    );
  });
}

export default GameListItem;
