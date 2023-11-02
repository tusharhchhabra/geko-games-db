import { useEffect, useState, useRef } from "react";
import MyCombobox from "./Dropdown";
import { useRouter } from "next/router";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [canShowEmptyState, setCanShowEmptyState] = useState(false);
  const router = useRouter();

  const searchTimeoutRef = useRef(null);

  const search = async (searchTerm) => {
    if (searchTerm) {
      const response = await fetch(
        `/api/search?searchTerm=${encodeURIComponent(searchTerm)}`
      );
      const results = await response.json();
      setGames(results);
    } else {
      setGames([]);
    }
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    router.push(`/games/${game.id}`);
  };

  // Manage search request and results display
  useEffect(() => {
    if (!query) return;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      setCanShowEmptyState(false);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      await search(query);
      setCanShowEmptyState(true);
    }, 150);

    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  return (
    <div className="text-black min-w-[400px]">
      <MyCombobox
        query={query}
        setQuery={setQuery}
        games={games.sort(
          (a, b) => b.first_release_date - a.first_release_date
        )}
        selected={selectedGame}
        setSelected={handleGameSelect}
        canShowEmptyState={canShowEmptyState}
      ></MyCombobox>
      <button
        className="bg-gray-700 px-3 py-1 my-4 text-white"
        onClick={() => search(query)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
