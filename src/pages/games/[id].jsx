import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import queries from "@/helpers/queryStrings";
import websiteCategores from "@/helpers/websiteCategories";
import Link from "next/link";

function GameDetailsPage({ game }) {
  return (
    <div key={game.id} className="max-w-md">
      {game.coverUrl && (
        <img loading="lazy" src={game.coverUrl} alt={game.name} />
      )}
      <p className="font-bold text-3xl line-clamp-2 max-w-md">{game.name}</p>
      <div className="flex gap-4">
        <span>{getYearFromUnixTimestamp(game.first_release_date)}</span>
        <span>Rating: {Math.round(game.total_rating)}</span>
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
      <div className="max-w-sm">
        <p className="font-bold text-xl">Summary</p>
        <p className="max-w-sm">{game.summary}</p>
      </div>

      <div className="mt-12 max-w-sm">
        <p className="font-bold text-xl ">Links</p>
        <div className="max-w-sm flex gap-6">
          {game.websites.map((website) => (
            <Link key={website.id} href={website.url} target="_blank">
              {websiteCategores[website.category].name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-sm">
        <p className="font-bold text-xl">More Like This</p>
        {game.similarGames.map((game) => (
          <p key={game.id} className="max-w-sm">
            {game.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default GameDetailsPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const games = await fetchData(queries.game(id), "games");

  if (games.length === 0) {
    console.log("No games found for this ID!");
    return;
  }

  const game = games[0];

  const [
    coversPromise,
    genresPromise,
    platformsPromise,
    videosPromise,
    screenshotsPromise,
    websitesPromise,
    similarGamesPromise,
  ] = await Promise.allSettled([
    fetchData(queries.coverArtForGame(game), "covers"),
    fetchData(queries.genresForGame(game), "genres"),
    fetchData(queries.platformsForGame(game), "platforms"),
    fetchData(queries.videosForGame(game), "game_videos"),
    fetchData(queries.screenshotsForGame(game), "screenshots"),
    fetchData(queries.websitesForGame(game), "websites"),
    fetchData(queries.similarGames(game), "games"),
  ]);

  const [
    covers,
    genres,
    platforms,
    videos,
    screenshots,
    websites,
    similarGames,
  ] = [
    coversPromise.value,
    genresPromise.value,
    platformsPromise.value,
    videosPromise.value,
    screenshotsPromise.value,
    websitesPromise.value,
    similarGamesPromise.value,
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
    videos,
    screenshots: formattedScreenshots,
    similarGames,
    websites,
  };

  console.log(gameDetails);
  return { props: { game: gameDetails } };
}
