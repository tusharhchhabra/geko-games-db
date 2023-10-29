import { useState } from "react";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [games, setGames] = useState([]);

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
  };

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
      <input
        type="search"
        placeholder="Search..."
        className="flex h-9 w-64 rounded-md px-3 py-1 text-md text-gray-900"
        value={searchText}
        onChange={handleSearch}
      />
      <button
        className="bg-gray-700 px-3 py-1 my-4"
        onClick={() => search(searchText)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
