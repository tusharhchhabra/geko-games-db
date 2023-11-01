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
    <div className="md:min-w-[400px] mr-6 mx-auto">
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
    </div>
  );
}

export default SearchBar;
