import React, { useState, useContext } from "react";
import FavouritesContext from "@/context/FavouritesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@/context/AuthContext";

function RenderGames({ games }) {
  const [videos, setVideos] = useState({});
  const [hoveredGameId, setHoveredGameId] = useState(null);
  const { toggleFavourite, state } = useContext(FavouritesContext);
  const { user } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const heart = <FontAwesomeIcon icon={faHeart} size="lg" />;
  const heartFilled = (
    <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#FF0000" }} />
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

  return games.map((game) => {
    const gameVideo = videos[game.id];
    return (
      <div key={game.id} className="h-[400px]">
        {user && (
          <div onClick={() => handleFavouriteClick(game.id)}>
            {isFavourite(game.id) ? heartFilled : heart}
          </div>
        )}
        <h2>{game.name}</h2>
        <img
          loading="lazy"
          src={game.coverUrl}
          alt={game.name}
          onMouseEnter={() => fetchVideo(game.id)}
          className={
            gameVideo && game.id === hoveredGameId ? "hidden" : "block"
          }
        />
        <div onMouseLeave={() => clearVideo(game.id)}>
          {gameVideo && (
            <iframe
              className={
                gameVideo && game.id === hoveredGameId ? "block" : "hidden"
              }
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${gameVideo.video_id}?si=rKISgJFVYRGMtTwG&amp;start=10&autoplay=1&mute=1&controls=0&showinfo=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    );
  });
}

export default RenderGames;
