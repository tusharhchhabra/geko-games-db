import React, { useState, useEffect, useCallback } from "react";
import fetchData from "@/helpers/fetchData";
import GamesList from "@/components/GameList";
import queries from "@/helpers/queryStrings";
import extractIdAsAnArray from "@/helpers/extractIdsAsArray";
import extractNameAsAnArray from "@/helpers/extractNameAsArray";

const HomePage = ({ initialGameSets, initialThemes }) => {
  const [gameSets, setGameSets] = useState(initialGameSets);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [gameThemesId, setGameThemesId] = useState(() =>
    extractIdAsAnArray(initialThemes)
  );
  const [gameThemes, setGameThemes] = useState(() =>
    extractNameAsAnArray(initialThemes)
  );

  const fetchMoreGames = useCallback(async () => {
    if (!gameThemesId.length && !gameThemes.length) {
      setAllDataLoaded(true);
      return;
    }

    setLoading(true);

    const [nextThemeId, ...remainingThemeId] = gameThemesId;
    const [nextTheme, ...remainingThemeNames] = gameThemes;
    try {
      const response = await fetch(
        `/api/games?nextThemeId=${encodeURIComponent(
          nextThemeId
        )}&nextTheme=${encodeURIComponent(nextTheme)}`
      );
      const newGameData = await response.json();

      setGameSets((prevGames) => [...prevGames, newGameData]);
      setGameThemesId(remainingThemeId);
      setGameThemes(remainingThemeNames);
    } catch (error) {
      console.error("Error fetching additional games: ", error);
    } finally {
      setLoading(false);
    }
  }, [gameThemesId, gameThemes]);

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
    <div>
      <GamesList setOfGames={gameSets} />
      {loading && (
        <p className="text-3xl font-bold text-gray-700 mt-4">
          Loading more games...
        </p>
      )}
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  try {
    const themesPromise = fetchData(queries.themes, "themes");

    const top10GamesPromise = fetchData(queries.top10Games, "games");
    const newGamesPromise = fetchData(queries.newGames, "games");

    const [themes, top10Games, newGames] = await Promise.all([
      themesPromise,
      top10GamesPromise,
      newGamesPromise,
    ]);

    const top10GamesCoversPromise = fetchData(
      queries.coverArtForGames(top10Games),
      "covers"
    );
    const newGamesCoversPromise = fetchData(
      queries.coverArtForGames(newGames),
      "covers"
    );

    const [top10GamesCovers, newGamesCovers] = await Promise.all([
      top10GamesCoversPromise,
      newGamesCoversPromise,
    ]);

    const top10GamesWithCovers = queries.gamesWithCoverArt(
      top10Games,
      top10GamesCovers,
      "t_cover_big"
    );

    const newGamesWithCovers = queries.gamesWithCoverArt(
      newGames,
      newGamesCovers,
      "t_cover_big"
    );

    const top10GamesObject = { games: top10GamesWithCovers, title: "Top 10" };
    const newGamesObject = {
      games: newGamesWithCovers,
      title: "New and Noteworthy",
    };

    return {
      props: {
        initialGameSets: [top10GamesObject, newGamesObject],
        initialThemes: themes,
      },
    };
  } catch (error) {
    console.error("Error fetching initial data: ", error);
    return {
      props: {
        initialGameSets: [],
        initialThemes: [],
      },
    };
  }
}
