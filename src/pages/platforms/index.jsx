import GamesList from "@/components/GameList";
import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import SearchBar from "@/components/SearchBar";
import PlatformButton from "@/components/PlatformButton";
import { useState, useEffect, useCallback } from "react";
import extractIdAsAnArray from "@/helpers/extractIdsAsArray";
import extractNameAsAnArray from "@/helpers/extractNameAsArray";

const PlatformsGameList = ({
  initialGames,
  initialPlatforms,
  initialThemes,
}) => {
  // States
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [filteredGames, setFilteredGames] = useState(null);
  const [gameSets, setGameSets] = useState(initialGames);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [platformId, setPlatformId] = useState(() =>
    extractIdAsAnArray(initialPlatforms)
  );
  const [gamePlatforms, setGamePlatform] = useState(() =>
    extractNameAsAnArray(initialPlatforms)
  );
  const [gameThemesId, setGameThemesId] = useState(() =>
    extractIdAsAnArray(initialThemes)
  );
  const [gameThemes, setGameThemes] = useState(() =>
    extractNameAsAnArray(initialThemes)
  );
  const [filteredGamesFetched, setFilteredGamesFetched] = useState(false);

  // Fetch Initial Games When a Platform is Selected
  useEffect(() => {
    if (selectedPlatform) {
      const fetchGamesForPlatform = async () => {
        try {
          const response = await fetch(
            `/api/initialThemesByPlatform?platformId=${encodeURIComponent(
              selectedPlatform
            )}`
          );
          const data = await response.json();
          setFilteredGames(data);
          setFilteredGamesFetched(true);
        } catch (error) {
          console.error("Error fetching games for selected platform:", error);
        }
      };

      fetchGamesForPlatform();
    }
  }, [selectedPlatform]);

  // Fetch More Games When a Platform IS Selected and a User Scrolls
  const fetchMoreThemesByPlatform = useCallback(async () => {
    if (!gameThemesId.length && !gameThemes.length) {
      setAllDataLoaded(true);
      return;
    }

    setLoading(true);

    const [nextThemeId, ...remainingThemeId] = gameThemesId;
    const [nextTheme, ...remainingThemeNames] = gameThemes;
    try {
      const response = await fetch(
        `/api/themeAndPlatform?nextThemeId=${encodeURIComponent(
          nextThemeId
        )}&nextTheme=${encodeURIComponent(
          nextTheme
        )}&platformId=${encodeURIComponent(selectedPlatform)}`
      );
      const newGameData = await response.json();

      setFilteredGames((prevGames) => [...prevGames, newGameData]);
      setGameThemesId(remainingThemeId);
      setGameThemes(remainingThemeNames);
    } catch (error) {
      console.error("Error fetching additional games: ", error);
    } finally {
      setLoading(false);
    }
  }, [gameThemesId, gameThemes, selectedPlatform]);

  // Fetch More Games When a Platform IS NOT Selected and a User Scrolls
  const fetchMorePlatforms = useCallback(async () => {
    if (!platformId.length && !gamePlatforms.length) {
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
  }, [platformId, gamePlatforms]);

  // Handle Scroll
  const handleScroll = useCallback(() => {
    if (loading || allDataLoaded) return;

    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      selectedPlatform ? fetchMoreThemesByPlatform() : fetchMorePlatforms();
    }
  }, [
    loading,
    allDataLoaded,
    fetchMorePlatforms,
    fetchMoreThemesByPlatform,
    selectedPlatform,
  ]);

  // Clean up Scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Render JSX
  return (
    <div className="p-10">
      <SearchBar />
      <PlatformButton
        platforms={initialPlatforms}
        setSelectedPlatform={setSelectedPlatform}
        setGameThemesId={setGameThemesId}
        setGameThemes={setGameThemes}
        initialThemes={initialThemes}
        setAllDataLoaded={setAllDataLoaded}
      />
      {filteredGamesFetched ? (
        <GamesList setOfGames={filteredGames} />
      ) : (
        <GamesList setOfGames={gameSets} />
      )}
      {loading && (
        <p className="text-3xl font-bold text-gray-700 mt-4">
          Loading more games...
        </p>
      )}
      {allDataLoaded && (
        <p className="text-3xl font-bold text-gray-700 mt-4">
          No more games. Pick a game already you nerd!
        </p>
      )}
    </div>
  );
};

export default PlatformsGameList;

// Initial Data Fetching
export async function getServerSideProps() {
  const platforms = await fetchData(queries.topPlatforms, "platforms");
  const themes = await fetchData(queries.themes, "themes");

  const seriesXGames = await fetchData(queries.gamesByPlatform(169), "games");
  const seriesXGamesCovers = await fetchData(
    queries.coverArtForGames(seriesXGames),
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

  const ps5Games = await fetchData(queries.gamesByPlatform(167), "games");
  const ps5GamesCovers = await fetchData(
    queries.coverArtForGames(ps5Games),
    "covers"
  );
  const ps5GamesWithCovers = queries.gamesWithCoverArt(
    ps5Games,
    ps5GamesCovers,
    "t_cover_big"
  );
  const ps5GamesObject = {
    games: ps5GamesWithCovers,
    title: "Play Station 5",
  };

  const setOfGames = [seriesXGamesObject, ps5GamesObject];

  return {
    props: {
      initialGames: setOfGames,
      initialPlatforms: platforms,
      initialThemes: themes,
    },
  };
}
