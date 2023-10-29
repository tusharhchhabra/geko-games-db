import { useEffect, useState } from "react";
import MyCombobox from "./Dropdown";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const search = async (searchTerm) => {
    if (searchTerm) {
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

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query || isSearching) return;
    const searchGames = async () => {
      await search(query);
    };

    searchGames();
  }, [query]);

  return (
    <div className="text-black">
      <MyCombobox
        query={query}
        setQuery={setQuery}
        games={games}
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
