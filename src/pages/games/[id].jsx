import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import queries from "@/helpers/queryStrings";
import { useRouter } from "next/router";

function GameDetailsPage({ game }) {
  return (
    <div key={game.id} className="max-w-md">
      <p className="font-bold text-4xl line-clamp-2 max-w-md">{game.name}</p>
      <div className="flex gap-4">
        <span className="max-w-sm">
          {getYearFromUnixTimestamp(game.first_release_date)}
        </span>
        <div className="flex gap-2">
          {game.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {game.platforms.map((platform) => (
          <span key={platform.id}>{platform.name}</span>
        ))}
      </div>
      <div className="flex gap-2">
        {game.screenshots.map((screenshot) => (
          <img key={screenshot.id} src={screenshot.url} loading="lazy" />
        ))}
      </div>
      <p className="max-w-sm">{game.summary}</p>
      {game.coverUrl && (
        <img loading="lazy" src={game.coverUrl} alt={game.name} />
      )}
      <p></p>
    </div>
  );
}

export default GameDetailsPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const games = await fetchData(queries.game(id), "games");
  const game = games[0];

  if (games.length === 0) {
    console.log("No games found for this ID!");
    return;
  }

  const [coversPromise, genresPromise, platformsPromise, screenshotsPromise] =
    await Promise.allSettled([
      fetchData(queries.coverArtForGame(game), "covers"),
      fetchData(queries.genresForGame(game), "genres"),
      fetchData(queries.platformsForGame(game), "platforms"),
      fetchData(queries.screenshotsForGame(game), "screenshots"),
    ]);

  const [covers, genres, platforms, screenshots] = [
    coversPromise.value,
    genresPromise.value,
    platformsPromise.value,
    screenshotsPromise.value,
  ];

  let formattedCoverUrl = null;
  if (covers.length !== 0) {
    formattedCoverUrl = adjustImageUrl(covers[0].url, "t_cover_big");
  } else {
    console.log("No covers found for this game!");
  }

  let formattedScreenshots = screenshots;
  if (screenshots.length !== 0) {
    formattedScreenshots = screenshots.map((screenshot) => {
      return {
        ...screenshot,
        url: adjustImageUrl(screenshot.url, "t_screenshot_med"),
      };
    });
  } else {
    console.log("No screenshots found for this game!");
  }

  const gameDetails = {
    ...game,
    coverUrl: formattedCoverUrl,
    genres,
    platforms,
    screenshots: formattedScreenshots,
  };
  console.log(gameDetails);

  return { props: { game: gameDetails } };
}
