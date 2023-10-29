import { useEffect, useState, useRef } from "react"; // Import useRef
import MyCombobox from "./Dropdown";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchTimeoutRef = useRef(null); // Create a ref to hold the timeout ID

  const search = async (searchTerm) => {
    if (searchTerm) {
      setIsSearching(true);
      const response = await fetch(
        `/api/search?searchTerm=${encodeURIComponent(searchTerm)}`
      );
      const results = await response.json();
      console.log("fetched", results);
      setGames(results);
    } else {
      console.log("search text is empty");
      setGames([]);
    }
    setIsSearching(false);
  };

  useEffect(() => {
    if (!query) return;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      await search(query);
    }, 200);

    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  return (
    <div className="text-black">
      <MyCombobox
        query={query}
        setQuery={setQuery}
        games={games.sort(
          (a, b) => b.first_release_date - a.first_release_date
        )}
        selected={selectedGame}
        setSelected={setSelectedGame}
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
