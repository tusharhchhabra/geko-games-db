import React, { useState } from 'react';

function RenderGames({ games }) {
  const [videos, setVideos] = useState({});
  const [hoveredGameId, setHoveredGameId] = useState(null);

  async function fetchVideo(gameId) {
    try {
      const response = await fetch(`/api/videos?videoID=${encodeURIComponent(gameId)}`);
      const result = await response.json();

      if (result && result.length > 0) {
        setVideos((prevVideos) => ({
          ...prevVideos,
          [gameId]: result[0]
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

  
  return games.map((game) => {
    const gameVideo = videos[game.id];
    return (
      <div key={game.id}>
        <h2>{game.name}</h2>
        <img 
          loading="lazy" 
          src={game.coverUrl} 
          alt={game.name} 
          onMouseEnter={() => fetchVideo(game.id)} 
          className={gameVideo && game.id === hoveredGameId ? 'hidden' : 'block'} 
        />
        <div>
          {gameVideo && (
            <iframe
              className={gameVideo && game.id === hoveredGameId ? 'block' : 'hidden'}
              onMouseLeave={() => clearVideo(game.id)}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${gameVideo.video_id}?si=rKISgJFVYRGMtTwG&amp;start=10&autoplay=1&mute=1`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          )}
        </div>
      </div>
    );
  });
}


export default RenderGames;
