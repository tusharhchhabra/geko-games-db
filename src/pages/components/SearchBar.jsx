import { useState } from "react";
import MyCombobox from "./Dropdown";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);

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
  };

  return (
    <div>
      <MyCombobox query={query} setQuery={setQuery}></MyCombobox>
      <button
        className="bg-gray-700 px-3 py-1 my-4"
        onClick={() => search(query)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
