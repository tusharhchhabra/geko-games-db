import React, { useState, useEffect, useCallback } from "react";
import fetchData from "@/helpers/fetchData";
import GamesList from "@/components/GameList";
import queries from "@/helpers/queryStrings";
import extractIdAsAnArray from "@/helpers/extractIdsAsArray";
import extractNameAsAnArray from "@/helpers/extractNameAsArray";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <div className={`p-16 flex justify-center ${inter.className}`}>
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
    const themes = await fetchData(queries.themes, "themes");

    const top10Games = await fetchData(queries.top10Games, "games");
    const covers = await fetchData(
      queries.coverArtForGames(top10Games),
      "covers"
    );
    const top10GamesWithCovers = queries.gamesWithCoverArt(
      top10Games,
      covers,
      "t_cover_big"
    );

    const top10GamesObject = { games: top10GamesWithCovers, title: "Top 10" };

    const newGames = await fetchData(queries.newGames, "games");
    const newCovers = await fetchData(
      queries.coverArtForGames(newGames),
      "covers"
    );
    const newGamesWithCovers = queries.gamesWithCoverArt(
      newGames,
      newCovers,
      "t_cover_big"
    );

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
