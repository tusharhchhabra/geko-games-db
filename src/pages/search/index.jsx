import AdvancedSearchTabs from "@/components/AdvancedSearchTabs";
import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import React, { useState, useEffect } from "react";

const AdvancedSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    genres: [1],
    themes: [1],
    platforms: [1],
    modes: [1],
    fromDate: "",
    toDate: "",
    ratings: [],
    developers: [],
    publishers: [],
    limit: 10,
    offset: 0,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, []);

  const handleChange = (selectedOption, name) => {
    setSearchParams({
      ...searchParams,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSearch = async () => {
    // setIsLoading(true);
    // setError(null);
    try {
      const response = await fetch(`/api/advanced-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchParams }),
      });
      console.log(await response.json());
      // setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <AdvancedSearchTabs />
    </div>
  );
};

export default AdvancedSearch;

export async function getServerSideProps() {
  const [genresPromise, themesPromise, modesPromise, platformsPromise] =
    await Promise.allSettled([
      fetchData(queries.genres, "genres"),
      fetchData(queries.themes, "themes"),
      fetchData(queries.modes, "game_modes"),
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
