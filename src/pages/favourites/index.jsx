import { getUserFavoriteGames } from "@/db/queries";
import React, { useState, useEffect, useContext } from "react";
import FavouritesList from "@/components/FavouritesList";
import SearchBar from "@/components/SearchBar"; 


const Favourites = ({ games }) => {
  const [gamesFetched, setGamesFetched] = useState(false);
  const [fetchedGames, setFetchedGames] = useState(games);


const favouriteGames = games.map((game) => {
  return game.game_id;
});
  
  const fetchFavourites = async (favouriteGames) => {
    try {
      const response = await fetch(`/api/favourites?game_id=${encodeURIComponent(favouriteGames)}`);
      const fetchedFavourites = await response.json();
      setGamesFetched(true);
      setFetchedGames(fetchedFavourites);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  useEffect(() => {
    if (games && games.length) {
      fetchFavourites(favouriteGames);
    }
  }, [games]);

  return (
    <div>
      <SearchBar />
      {gamesFetched ? <FavouritesList setOfGames={fetchedGames} /> : <div>Loading Favourites...</div>}
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
