import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import queries from "@/helpers/queryStrings";
import websiteCategores from "@/helpers/websiteCategories";
import Image from "next/image";
import Link from "next/link";

function GameDetailsPage({ game }) {
  return (
    <div key={game.id} className="px-6 xl:px-0 max-w-3xl text-zinc-200">
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
        {/* {game.screenshotsBig ? (
          <img
            src={game.screenshotsBig[0].url}
            alt={game.name + " Screenshot"}
            className="absolute w-full -z-20 object-cover object-center max-h-[50vh]"
          ></img>
        ) : (
          <div className="absolute w-full -z-20 h-[50vh] bg-indigo-950"></div>
        )} */}
        <div class="absolute w-full h-[50vh] max-h-[50vh] bg-gradient-to-t from-neutral-900 via-transparent to-zinc-900" />
      </div>
      <div className="flex mt-[20vh] gap-6 md:gap-9">
        {game.coverUrl && (
          <img
            loading="lazy"
            className="w-40 h-auto object-cover lg:w-56 rounded-lg shadow-lg"
            src={game.coverUrl}
            alt={game.name}
          />
        )}
        <div className="mt-auto">
          <p className="font-semibold text-3xl py-0.5 text-white line-clamp-2 max-w-md xl:text-4xl">
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
        <div className="mt-4 px-6 absolute left-0 right-0 w-screen py-5 flex gap-2.5 overflow-scroll">
          {game.screenshotsSmall.map((screenshot) => (
            <img
              key={screenshot.id}
              src={screenshot.url}
              className="w-40 xl:w-56 h-auto shadow-lg rounded-md hover:z-20 hover:scale-125 hover:brightness-125 transition duration-300 ease-in-out cursor-pointer"
              loading="lazy"
            />
          ))}
        </div>
      )}
      <div
        className={`${
          game.screenshotsSmall ? "mt-44  xl:mt-52" : "mt-20"
        } max-w-xl`}
      >
        <p className="text-3xl font-normal">Summary</p>
        <p className="mt-6">{game.summary}</p>
      </div>

      <div className="mt-14">
        <p className="text-3xl font-normal">Links</p>
        <div className="flex mt-6 gap-6 flex-wrap overflow-hidden">
          {game.websites &&
            game.websites.map((website) => (
              <Link key={website.id} href={website.url} target="_blank">
                {websiteCategores[website.category].name}
              </Link>
            ))}
        </div>
      </div>

      <p className="mt-14 text-3xl font-normal">More Like This</p>
      <div className="mt-6 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        {game.similarGamesWithCover &&
          game.similarGamesWithCover.map(
            (game) =>
              game.coverUrl && (
                <div key={game.id} className="w-full w-32 lg:w-40">
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
    websites,
  };

  console.log(similarGamesWithCover);

  return { props: { game: gameDetails } };
}
