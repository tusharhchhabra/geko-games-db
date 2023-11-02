import { getUserFavoriteGames } from "@/db/queries";
import React, { useState, useEffect } from "react";
import FavouritesList from "@/components/FavouritesList";
import SearchBar from "@/components/SearchBar";

const Favourites = ({ games }) => {
  const [gamesFetched, setGamesFetched] = useState(false); 
  const [fetchedGames, setFetchedGames] = useState(games);
  const [suggestedFavourites, setSuggestedFavourites] = useState([]);
  const [gptGamesFecthed, setGptGamesFetched] = useState(false);
  const [fullGptGamesFetched, setFullGptGamesFetched] = useState(false);
  const [namesOfFavourites, setNamesOfFavourites] = useState([]);

  // Fetch to IGDB API with games from DB:

  const favouriteGames = games.map((game) => {
    return game.game_id;
  });
  // When games changes it fires the fetch to IGDB API
  useEffect(() => {
    if (games && games.length) {
      fetchFavourites(favouriteGames);
    }
  }, [games]);

  const fetchFavourites = async (favouriteGames) => {
    try {
      const response = await fetch(
        `/api/favourites?game_id=${encodeURIComponent(favouriteGames)}`
      );
      const fetchedFavourites = await response.json();
      setGamesFetched(true);
      setFetchedGames(fetchedFavourites);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // Once favourites from the user return it changes the value of fetchedGames which fires the fetch to GPT API with the names of the games:

  useEffect(() => {
    if (gamesFetched === true) {
      const games = fetchedGames[0].games;
      const newNamesOfFavourites = games.map((game) => game.name);
      setNamesOfFavourites(newNamesOfFavourites);
      gptGames(newNamesOfFavourites);
    }
  }, [fetchedGames, gamesFetched]);

  const gptGames = async (newNamesOfFavourites) => {
    try {
      const response = await fetch(
        `/api/gpt?term=${encodeURIComponent([newNamesOfFavourites])}`
      );
      const fetchedGptGames = await response.json();
      setGptGamesFetched(true);
      setSuggestedFavourites(fetchedGptGames);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // Once the GPT API returns it changes the value of gptGamesFetched and fires the fetch to IGDB API with the suggested game query:

  useEffect(() => {
    if (gptGamesFecthed === true) {
      const games = suggestedFavourites;
      fetchGptGames(games);
    }
  }, [gptGamesFecthed]);

  const fetchGptGames = async (suggestedFavourites) => {
    try {
      const response = await fetch(
        `/api/gptGames?suggestedFavourites=${encodeURIComponent(
          suggestedFavourites
        )}`
      );
      const fetchedGptGames = await response.json();
      setFullGptGamesFetched(true);
      setSuggestedFavourites(fetchedGptGames);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // By changing the state of fullGPTGamesFetched => renders the FavouritesList component with the suggested games:

  return (
    <div>
      <SearchBar />
      {gamesFetched ? (
        <FavouritesList setOfGames={fetchedGames} />
      ) : (
        <div>Loading Favourites...</div>
      )}

      <div>GPT SUGGESTIONS</div>
      {fullGptGamesFetched && (
        <FavouritesList setOfGames={[suggestedFavourites]} />
      )}
    </div>
  );
};

export default Favourites;

export async function getServerSideProps() {
  let games;
  try {
    games = await getUserFavoriteGames(1);
  } catch (error) {
    console.error("Error fetching initial data: ", error);
    return { props: { games: [] } };
  }
  games = games.rows.map((game) => {
    return {
      id: game.id,
      game_id: game.game_id,
      user_id: game.user_id,
    };
  });

  return { props: { games } };
}
