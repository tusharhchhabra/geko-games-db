import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import queries from "@/helpers/queryStrings";
import websiteCategories from "@/helpers/websiteCategories";
import Image from "next/image";
import Link from "next/link";

function GameDetailsPage({ game }) {
  return (
    <div key={game.id} className="px-6 xl:px-0 max-w-3xl mb-28 text-zinc-200">
      <div
        className={`absolute left-0 right-0 -z-10 h-[50vh] bg-cover bg-center ${
          game.screenshotsBig ? "" : "bg-indigo-950"
        }`}
        style={{
          backgroundImage: game.screenshotsBig
            ? `url(${game.screenshotsBig[0].url})`
            : "",
        }}
      >
        <div class="absolute w-full h-[50vh] max-h-[50vh] bg-gradient-to-t from-neutral-900 via-transparent to-zinc-900" />
      </div>
      <div className="flex mt-[10vh] sm:mt-[20vh] flex-col sm:flex-row gap-6 sm:gap-9 text-center sm:text-left">
        {game.coverUrl && (
          <img
            loading="lazy"
            className="w-40 h-auto mx-auto object-cover lg:w-56 rounded-lg shadow-lg"
            src={game.coverUrl}
            alt={game.name}
          />
        )}
        <div className="mt-auto">
          <p className="font-semibold line-clamp-2 leading-snug max-w-md py-0.5 text-white text-4xl xl:text-4xl text-center mx-auto sm:text-left sm:mx-0">
            {game.name}
          </p>
          <div className="mt-4 flex gap-4 justify-between">
            <span>{getYearFromUnixTimestamp(game.first_release_date)}</span>
            {game.total_rating && (
              <span>Rating: {Math.round(game.total_rating)}</span>
            )}
            <div className="flex gap-2 flex-wrap">
              {game.genres &&
                game.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
            </div>
          </div>
          {game.platforms && (
            <div className="flex gap-2 flex-wrap">
              {game.platforms.map((platform) => (
                <span key={platform.id}>{platform.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {game.screenshotsSmall && (
        <div className="mt-4 px-6 absolute left-0 right-0 w-screen py-6 flex gap-2.5 overflow-scroll">
          {game.screenshotsSmall.map((screenshot) => (
            <img
              key={screenshot.id}
              src={screenshot.url}
              className="w-52 xl:w-60 h-auto shadow-lg rounded-md hover:z-20 hover:scale-125 hover:brightness-110 transition duration-300 ease-in-out cursor-pointer"
              loading="lazy"
            />
          ))}
        </div>
      )}
      <div className={`${game.screenshotsSmall ? "mt-56" : "mt-20"} max-w-2xl`}>
        <p className="text-3xl font-normal text-white">Summary</p>
        <p className="mt-6 text-lg lg:text-xl font-light leading-[1.7] lg:leading-relaxed">
          {game.summary}
        </p>
      </div>

      <div className="mt-20">
        <p className="text-3xl font-normal text-white">Links</p>
        <div className="flex mt-6 gap-x-8 sm:gap-x-10 gap-y-6 flex-wrap items-center font-normal text-lg overflow-hidden">
          {game.websites &&
            game.websites.map((website) => (
              <Link key={website.id} href={website.url} target="_blank">
                {websiteCategories[website.category].icon ||
                  websiteCategories[website.category].name}
              </Link>
            ))}
        </div>
      </div>

      <p className="mt-20 text-3xl font-normal text-white">More Like This</p>
      <div className="mt-10 grid gap-x-6 gap-y-8 xl:gap-y-14 md:gap-y-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        {game.similarGamesWithCover &&
          game.similarGamesWithCover.map(
            (game) =>
              game.coverUrl && (
                <div key={game.id} className="w-32">
                  <img
                    src={game.coverUrl}
                    className="w-32 lg:w-40 shadow-lg rounded-md"
                    loading="lazy"
                  />
                  <span className="mt-3 text-sm line-clamp-2">{game.name}</span>
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default GameDetailsPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const games = await fetchData(queries.game(id), "games");

  if (games.length === 0) {
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
    formattedCoverUrl = adjustImageUrl(covers[0].url, "t_cover_big_2x");
  }

  let screenshotsSmall = screenshots;
  if (screenshots && screenshots.length !== 0) {
    screenshotsSmall = screenshots.map((screenshot) => {
      return {
        ...screenshot,
        url: adjustImageUrl(screenshot.url, "t_screenshot_med"),
      };
    });
  }

  let screenshotsBig = screenshots;
  if (screenshots && screenshots.length !== 0) {
    screenshotsBig = screenshots.map((screenshot) => {
      return {
        ...screenshot,
        url: adjustImageUrl(screenshot.url, "t_screenshot_huge_2x"),
      };
    });
  }

  let similarGamesWithCover;
  if (similarGames.length !== 0) {
    similarGamesWithCover = similarGames.map((game) => {
      return {
        ...game,
        coverUrl: game.cover
          ? adjustImageUrl(game.cover.url, "t_cover_big")
          : null,
      };
    });
  }

  const gameDetails = {
    ...game,
    coverUrl: formattedCoverUrl,
    genres,
    platforms,
    videos,
    screenshotsSmall,
    screenshotsBig,
    similarGamesWithCover,
    websites: websites.sort((a, b) => (a.category < b.category ? -1 : 1)),
  };

  console.log(gameDetails);

  return { props: { game: gameDetails } };
}
