import React, { useState } from "react";

const GPTPage = () => {
  const [gameTitle, setGameTitle] = useState("The Legend of Zelda");
  const [similarGames, setSimilarGames] = useState("");
  const [error, setError] = useState(null);

  const fetchSimilarGames = async () => {
    try {
      const response = await fetch(
        `/api/gpt?term=${encodeURIComponent(gameTitle)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data);
      console.log("data.game", data.game);
      setSimilarGames(data.game);
    } catch (err) {
      console.error("Error fetching similar games:", err);
      setError("Failed to fetch similar games.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSimilarGames();
  };

  return (
    <div>
      <h1>Find Similar Video Games</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="gameTitle">Enter a Video Game Title:</label>
        <input
          type="text"
          id="gameTitle"
          placeholder="Type a game title here"
          className="text-black bg-white"
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {similarGames && (
        <div>
          <h2>Similar Games:</h2>
          <p>{similarGames}</p>
        </div>
      )}

      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default GPTPage;

// fields id, name;
// where (name ~ *"Valheim" | name ~ *"Zelda") & version_parent = null & parent_game = null;
// limit 10;
