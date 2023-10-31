import GamesList from "@/components/GameList";
import fetchData from "@/helpers/fetchData";
import queries from "@/queryStrings";
import SearchBar from "../components/SearchBar";
import { useState, useEffect, useCallback } from "react";
import extractId from "@/helpers/extractId";
import extractIdAsAnArray from "@/helpers/extractIdsAsArray";
import extractNameAsAnArray from "@/helpers/extractNameAsArray";

const PlatformsGameList = ({ initialGames, initialPlatforms }) => {
  const [gameSets, setGameSets] = useState(initialGames);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [platformId, setPlatformId] = useState(() =>
    extractIdAsAnArray(initialPlatforms));
  const [gamePlatforms, setGamePlatform] = useState(() =>
    extractNameAsAnArray(initialPlatforms)
  );
  

  const platformsDropdown = initialPlatforms.map((platform) => {
    return platform.name;
  });

  const fetchMoreGames = useCallback(async () => {
    if (!platformId.length && !platforms.length) {
      setAllDataLoaded(true);
      return;
    }

    setLoading(true);

    const [nextPlatformId, ...remainingPlatformId] = platformId;
    const [nextPlatform, ...remainingPlatformNames] = gamePlatforms;
    try {
      const response = await fetch(
        `/api/platforms?nextPlatformId=${encodeURIComponent(
          nextPlatformId
        )}&nextPlatform=${encodeURIComponent(nextPlatform)}`
      );
      const newGameData = await response.json();

      setGameSets((prevGames) => [...prevGames, newGameData]);
      setPlatformId(remainingPlatformId);
      setGamePlatform(remainingPlatformNames);
    } catch (error) {
      console.error("Error fetching additional games: ", error);
    } finally {
      setLoading(false);
    }
  }, [gameSets, platformId]);


  const handleScroll = useCallback(() => {
    if (loading || allDataLoaded) return;

    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      fetchMoreGames();
    }
  }, [loading, allDataLoaded, fetchMoreGames]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="p-10">
      <SearchBar />
      <GamesList setOfGames={gameSets} />
      {loading && <p className="text-3xl font-bold text-gray-700 mt-4">Loading more games...</p>}

    </div>
  );
};

export default PlatformsGameList;

export async function getServerSideProps() {

  // Fetch platforms
  const platforms = await fetchData(queries.platforms, "platforms");

  // Fetch initial games (Move rest to call on scroll)
  // (PS5 &  Xbox Series X/S)
  const seriesXGames = await fetchData(
    queries.gamesByPlatform(169),
    "games"
  );
  console.log(seriesXGames);



  const seriesXGamesCovers = await fetchData(
    queries.coverArt(seriesXGames),
    "covers"
  );
  const seriesXGamesWithCovers = queries.gamesWithCoverArt(
    seriesXGames,
    seriesXGamesCovers,
    "t_cover_big"
  );
  const seriesXGamesObject = {
    games: seriesXGamesWithCovers,
    title: "Xbox Series X/S",
  };
  console.log("obj", seriesXGamesObject);

  const ps5Games = await fetchData(
    queries.gamesByPlatform(167),
    "games"
  );
  const ps5GamesCovers = await fetchData(
    queries.coverArt(ps5Games),
    "covers"
  );
  const ps5GamesWithCovers = queries.gamesWithCoverArt(
    ps5Games,
    ps5GamesCovers,
    "t_cover_big"
  );
  const ps5GamesObject = {
    games: ps5GamesWithCovers,
    title: "PS5",
  };

  const setOfGames = [seriesXGamesObject, ps5GamesObject];

  return { props: { initialGames: setOfGames, initialPlatforms: platforms } };
}

//fields name, id, total_rating; where platforms = [167] & rating > 70 & rating_count > 0; sort total_rating desc; limit 10;