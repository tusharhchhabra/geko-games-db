import GamesList from "@/components/GameList";
import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import PlatformButton from "@/components/PlatformButton";
import { useState, useEffect, useCallback } from "react";
import extractIdAsAnArray from "@/helpers/extractIdsAsArray";
import extractNameAsAnArray from "@/helpers/extractNameAsArray";

const PlatformsGameList = ({
  initialGames,
  initialPlatforms,
  initialThemes,
  platforms,
}) => {
  // States
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [filteredGames, setFilteredGames] = useState(null);
  const [gameSets, setGameSets] = useState(initialGames);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [platformId, setPlatformId] = useState(() =>
    extractIdAsAnArray(platforms)
  );
  const [gamePlatforms, setGamePlatform] = useState(() =>
    extractNameAsAnArray(platforms)
  );
  const [gameThemesId, setGameThemesId] = useState(() =>
    extractIdAsAnArray(initialThemes)
  );
  const [gameThemes, setGameThemes] = useState(() =>
    extractNameAsAnArray(initialThemes)
  );
  const [filteredGamesFetched, setFilteredGamesFetched] = useState(false);
  const[allPlatforms, setAllPlatforms] = useState(initialPlatforms)
  const [selectedPlatformName, setSelectedPlatformName] = useState(null);

  console.log("platforms", platforms);
  console.log("initialPlatforms", initialPlatforms);

   useEffect(() => {
     if (selectedPlatform !== null) {
       allPlatforms.map((platform) => {
         if (platform.id === selectedPlatform) {
           setSelectedPlatformName(platform.name)
         }
       })
     }
   }, [selectedPlatform])

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
    <div className="lg:p-24 w-full p-2">
      <PlatformButton
        platforms={initialPlatforms}
        setSelectedPlatform={setSelectedPlatform}
        setGameThemesId={setGameThemesId}
        setGameThemes={setGameThemes}
        initialThemes={initialThemes}
        setAllDataLoaded={setAllDataLoaded}
      />
      {filteredGamesFetched ? (
        <div className="w-full absolute lg:left-10 top-48 ">
          <h1 className="lg:text-[50px] font-bold text-gray-700 mt-5">
            {selectedPlatformName}
          </h1>
          <GamesList setOfGames={filteredGames} />
        </div>
      ) : (
        <div className="w-full absolute lg:left-10 top-48 mt-5 lg:mt-2">
          <GamesList setOfGames={gameSets} />
        </div>
      )}
      {loading && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-0 flex justify-center"
        >
          <svg
            aria-hidden="true"
            className="w-11 h-11 text-gray-200 animate-spin dark:text-gray-600 fill-violet-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {allDataLoaded && (
        <p className="text-3xl font-bold text-gray-700 mt-4 fixed inset-x-0 bottom-0 flex justify-center">
          No more games. Pick a game already nerd!
        </p>
      )}
    </div>
  );
};

export default PlatformsGameList;

// Initial Data Fetching
export async function getServerSideProps() {
  const platforms = await fetchData(queries.platforms, "platforms");
  const initialPlatforms = await fetchData(queries.topPlatforms, "platforms");
  const themes = await fetchData(queries.themesForSearch, "themes");

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
      platforms: platforms,
      initialGames: setOfGames,
      initialPlatforms: initialPlatforms,
      initialThemes: themes,
    },
  };
}
