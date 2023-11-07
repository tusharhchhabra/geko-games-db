import Rating from "@/components/Rating";
import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import queries from "@/helpers/queryStrings";
import websiteCategories from "@/helpers/websiteCategories";
import Link from "next/link";

function GameDetailsPage({ game }) {
  return (
    <div
      key={game.id}
      className="px-6 xl:px-0 w-full max-w-3xl mb-28 text-zinc-300"
    >
      <div
        className={`absolute left-0 right-0 -z-10 h-[50vh] bg-cover bg-[center_top_20%] ${
          game.screenshotsBig ? "opacity-90" : "bg-indigo-950"
        }`}
        style={{
          backgroundImage: game.screenshotsBig
            ? `url(${game.screenshotsBig[0].url})`
            : "",
        }}
      >
        <div className="absolute w-full h-[50vh] max-h-[50vh] bg-gradient-to-t from-neutral-900 via-transparent to-zinc-900" />
      </div>
      <div className="flex w-full mt-[10vh] sm:mt-[20vh] items-center flex-col sm:flex-row gap-6 sm:gap-9">
        {game.coverUrl && (
          <img
            loading="lazy"
            className="w-40 h-auto object-cover lg:w-56 rounded-lg shadow-2xl shadow-black/[0.5]"
            src={game.coverUrl}
            alt={game.name}
          />
        )}
        <div className="mt-auto w-full flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="font-semibold leading-snug tracking-tight max-w-md py-0.5 text-white text-4xl xl:text-4xl text-center sm:text-left [text-shadow:_0_1px_40px_rgb(0_0_0_/_70%)]">
            {game.name}
          </p>
          <div className="mt-2.5 flex gap-4 items-baseline font-medium">
            <span className="text-neutral-300">
              {getYearFromUnixTimestamp(game.first_release_date)}
            </span>
            {game.total_rating && (
              <Rating count={Math.round(game.total_rating) / 10} />
            )}
          </div>
          {game.genres && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {game.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="px-2.5 py-[3px] rounded-full text-sm font-medium bg-white/20 backdrop-blur-md sm:-ml-1"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}
          {game.platforms && (
            <div className="mt-3 text-neutral-300 leading-relaxed">
              {game.platforms
                .map((platform) => platform.abbreviation)
                .join(", ")}
            </div>
          )}
        </div>
      </div>
      {game.screenshotsSmall && (
        <div className="mt-4 px-6 py-10 absolute left-0 right-0 w-screen flex gap-2.5 overflow-scroll">
          {game.screenshotsSmall.map((screenshot) => (
            <img
              key={screenshot.id}
              src={screenshot.url}
              className="w-52 xl:w-60 h-auto shadow-xl-center shadow-black/[0.3] border border-zinc-800 hover:border-none rounded-lg hover:z-20 hover:scale-125 hover:brightness-110 transition duration-300 ease-in-out cursor-pointer"
              loading="lazy"
            />
          ))}
        </div>
      )}
      <div
        className={`${
          game.screenshotsSmall ? "mt-56 xl:mt-60" : "mt-20"
        } max-w-2xl`}
      >
        <p className="text-3xl font-normal text-white">Summary</p>
        <p className="mt-6 text-lg lg:text-lg font-light leading-[1.7] lg:leading-relaxed">
          {game.summary}
        </p>
      </div>

      <div className="mt-20">
        {game.websites && (
          <p className="text-3xl font-normal text-white">Links</p>
        )}
        <div className="flex mt-8 gap-x-8 sm:gap-x-10 gap-y-8 flex-wrap items-center font-normal text-lg">
          {game.websites &&
            game.websites.map((website) => (
              <Link
                key={website.id}
                href={website.url}
                target="_blank"
                className="hover:brightness-110 hover:scale-110 transition duration-200 ease-in-out"
              >
                {websiteCategories[website.category].icon ||
                  websiteCategories[website.category].name}
              </Link>
            ))}
        </div>
      </div>

      {game.similarGames && (
        <p className="mt-20 text-3xl font-normal text-white">More Like This</p>
      )}
      <div className="mt-10 grid gap-x-6 gap-y-8 xl:gap-y-14 md:gap-y-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {game.similarGamesWithCover &&
          game.similarGamesWithCover.map(
            (game) =>
              game.coverUrl && (
                <Link
                  key={game.id}
                  className="w-40 text-center"
                  href={`/games/${game.id}`}
                >
                  <img
                    src={game.coverUrl}
                    className="w-40 shadow-lg rounded-lg border border-zinc-800 shadow-lg shadow-black/[0.5] hover:z-20 hover:border-zinc-800 hover:scale-105 hover:brightness-110 transition duration-200 ease-in-out cursor-pointer"
                    loading="lazy"
                  />
                  <span className="mt-4 text-sm line-clamp-2">{game.name}</span>
                </Link>
              )
          )}
      </div>
    </div>
  );
}

export default GameDetailsPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const gameData = await fetchData(queries.gameDetails(id), "games");
  if (!gameData) {
    return { props: { gameDetails: {} } };
  }
  const game = gameData[0];

  let formattedCoverUrl = null;
  if (game.cover) {
    formattedCoverUrl = adjustImageUrl(game.cover.url, "t_cover_big_2x");
  }

  let screenshotsSmall = game.screenshots;
  if (game.screenshots) {
    screenshotsSmall = game.screenshots.map((screenshot) => {
      return {
        ...screenshot,
        url: adjustImageUrl(screenshot.url, "t_screenshot_med"),
      };
    });
  }

  let screenshotsBig = game.screenshots;
  if (game.screenshots) {
    screenshotsBig = game.screenshots.map((screenshot) => {
      return {
        ...screenshot,
        url: adjustImageUrl(screenshot.url, "t_screenshot_huge_2x"),
      };
    });
  }

  let similarGamesWithCover = game.similar_games;
  if (game.similar_games) {
    similarGamesWithCover = game.similar_games.map((game) => {
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
    screenshotsSmall,
    screenshotsBig,
    similarGamesWithCover,
    websites: game.websites
      ? game.websites.sort((a, b) => (a.category < b.category ? -1 : 1))
      : null,
  };

  return { props: { game: gameDetails } };
}
