import { getUserFavoriteGames } from "@/db/queries";
import React, { useState, useEffect, useContext } from "react";
import FavouritesList from "@/components/FavouritesList";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

const Favourites = ({ games }) => {
  const [gamesFetched, setGamesFetched] = useState(false);
  const [fetchedGames, setFetchedGames] = useState(games);
  const [suggestedFavourites, setSuggestedFavourites] = useState([]);
  const [gptGamesFecthed, setGptGamesFetched] = useState(false);
  const [fullGptGamesFetched, setFullGptGamesFetched] = useState(false);
  const [namesOfFavourites, setNamesOfFavourites] = useState([]);
  const { user } = useContext(AuthContext);

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
      {!user ? (
        <div className="flex items-center justify-center h-screen ">
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div>
              <div className="text-xl font-medium text-black">
                Please login or register to keep track of your favourite games!
              </div>
              <Link href={"/"}>
              <button className="px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-violet-500 hover:bg-violet-800 ml-56">
                Login
              </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {gamesFetched ? (
            <FavouritesList setOfGames={fetchedGames} />
          ) : (
            <div className="text-violet-500 font-bold text-xl [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-black ">
              Loading Favourites...
            </div>
          )}
          {!fullGptGamesFetched && gamesFetched && (
            <div
              role="status"
              className="fixed absolute bottom-5 left-[850px] flex justify-center"
            >
              <svg
                aria-hidden="true"
                className="w-11 h-11 text-gray-200 animate-spin dark:text-gray-600 fill-violet-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="absolute bottom-2.5 left-14 text-violet-500 font-bold text-xl [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-black w-[200px]">
                Our AI is thinking...
              </p>
            </div>
          )}
          {fullGptGamesFetched && (
            <FavouritesList setOfGames={[suggestedFavourites]} />
          )}
        </>
      )}
    </div>
  );
};

export default Favourites;

export async function getServerSideProps(context) {
const { id } = context.query;

  let games;
  try {
    games = await getUserFavoriteGames(id);
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
