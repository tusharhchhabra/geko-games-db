import AdvancedSearchTabGroup from "@/components/AdvancedSearchTabGroup";
import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import React, { useState, useEffect } from "react";

const AdvancedSearchPage = (props) => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    genres: [],
    themes: [],
    platforms: [],
    modes: [],
    fromDate: "",
    toDate: "",
    // minRating: 0,
    // maxRating: 10,
    developers: [],
    publishers: [],
    limit: 30,
    offset: 0,
  });

  const [selectedTab, setSelectedTab] = useState("Genre");

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSearch();
  }, [searchParams]);

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
      const games = await response.json();
      console.log(games);
      // setSearchResults(response);
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  return (
    <div className="mt-4 max-w-3xl px-2 md:px-4 xl:px-0">
      <p className="text-2xl font-semibold">Advanced Search</p>
      <div className="">
        <AdvancedSearchTabGroup
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          params={searchParams}
          setParams={setSearchParams}
          options={props}
        />
        <div className="flex">
          {/* <div className="w-60 h-60 bg-red-500"></div>
          <div className="w-60 h-60 bg-red-500"></div> */}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;

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

  return { props: { genres, themes, modes, platforms } };
}
