import React, { useState, useRef } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function GameListItem({ games }) {
  const [videos, setVideos] = useState({});
  const [hoveredGameId, setHoveredGameId] = useState(null);
  const gameListRef = useRef(null);


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

  const handleClick = () => {
    console.log("CLICKED!!!");
  };

  return games.map((game) => {
    const gameVideo = videos[game.id];
    return (
      <div
        key={game.id}
        className="w-[264px] h-[352px] inline-block cursor-pointer relative p-2 ml-10"
      >
        <img
          id={game.id}
          loading="lazy"
          src={game.coverUrl}
          alt={game.name}
          onMouseEnter={() => {
            gameListRef.current = setTimeout(() => {
              fetchVideo(game.id);
            }, 750);
          }}
          onMouseLeave={() => {
            clearTimeout(gameListRef.current);
          }}
          className={
            gameVideo && game.id === hoveredGameId ? "hidden" : "block "
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
              <p
              className="absolute bottom-4 left-5 text-white"
              >Heart Icon</p>
              <Link
              href={`/games/${game.id}`}>
              <button
              className={`text-white absolute bottom-2 right-5 ${inter.className} bg-black px-4 py-2 rounded-2xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
              >Game Details
              </button>
              </Link>
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
