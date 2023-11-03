import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import React, { useState, useEffect } from "react";

const AdvancedSearch = () => {
  const [genres, setGenres] = useState([]);
  const [themes, setThemes] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [modes, setModes] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [year, setYear] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    year: null,
    genre: null,
    theme: null,
    platform: null,
    mode: null,
    rating: null,
  });

  useEffect(() => {}, []);

  const handleChange = (selectedOption, name) => {
    setSearchParams({
      ...searchParams,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSearch = async () => {
    try {
      const res = await fetch("/api/advanced-search", { params: searchParams });
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Advanced Search</h2>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year Released
          </label>
          <input
            type="number"
            value={searchParams.year}
            onChange={(e) => handleChange({ value: e.target.value }, "year")}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Genre/Theme
          </label>
          Genres
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          Platforms
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mode
          </label>
          Modes
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ratings
          </label>
          Ratings
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
      >
        Search
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Search Results:</h3>
        <ul>
          {searchResults.map((game) => (
            <li key={game.id} className="mb-1">
              {game.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdvancedSearch;

export async function getServerSideProps() {
  const [genresPromise, themesPromise, modesPromise, platformsPromise] =
    await Promise.allSettled([
      fetchData(queries.genres, "genres"),
      fetchData(queries.themes, "themes"),
      fetchData(queries.modes, "genres"),
      fetchData(queries.platforms, "platforms"),
    ]);

  const [genres, themes, modes, platforms] = [
    genresPromise.value,
    themesPromise.value,
    modesPromise.value,
    platformsPromise.value,
  ];

  console.log(genres, themes, modes, platforms);

  // const genres = await genresRes.json();
  // const themes = await themesRes.json();
  // const modes = await modesRes.json();
  // const platforms = await modesRes.json();

  return { props: {} };
}
