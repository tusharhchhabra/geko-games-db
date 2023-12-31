import Gallery from "@/components/Gallery";
import LazyImage from "@/components/LazyImage";
import Rating from "@/components/Rating";
import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import queries from "@/helpers/queryStrings";
import websiteCategories from "@/helpers/websiteCategories";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect, useContext } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavouritesContext from "@/context/FavouritesContext";
import { AuthContext } from "@/context/AuthContext";
import GalleryVideo from "@/components/GalleryVideo";

function GameDetailsPage({ game }) {
  const lightGallery = useRef(null);
  const { toggleFavourite, state } = useContext(FavouritesContext);
  const { user } = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavoriteClicked = () => {
    toggleFavourite(game.id)
      .then(() => setIsFavourite((prev) => !prev))
      .catch((error) => {
        console.error("Error toggling favourite:", error);
      });
  };

  const scroll = (direction) => {
    lightGallery.current.el.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const updateArrowVisibility = () => {
    const carousel = lightGallery.current.el;
    if (carousel) {
      const isOverflowing = carousel.scrollWidth > carousel.clientWidth;
      const arrows = document.querySelectorAll(".nav");

      arrows.forEach((arrow) => {
        arrow.style.display = isOverflowing ? "block" : "none";
      });
    }
  };

  useEffect(() => {
    updateArrowVisibility();

    const handleResize = () => updateArrowVisibility();
    window.addEventListener("resize", handleResize);

    lightGallery.current.el.classList.add("last:pr-32");

    return () => window.removeEventListener("resize", handleResize);
  }, [game.id]);

  useEffect(() => {
    setIsFavourite(
      state.favourites.some((favourite) => favourite.game_id === game.id)
    );
  }, [state, game.id]);

  return (
    <div
      key={game.id}
      className="px-6 xl:px-0 w-full max-w-3xl mb-28 text-zinc-300"
    >
      <div className={`absolute left-0 right-0 -z-10 h-[48vh] lg:h-[50vh]`}>
        <div className="absolute left-0 right-0 -z-10 h-[48vh] lg:h-[50vh]">
          <div className="relative left-0 right-0 h-[48vh] lg:h-[50vh]">
            {game.screenshots.length > 0 && (
              <LazyImage
                src={game.screenshots[0].bigUrl}
                alt={game.name + " Background"}
                className="object-cover w-full h-full"
                fadeDuration={1}
              />
            )}
          </div>
        </div>
        <div className="absolute w-full h-[48vh] max-h-[48vh] lg:h-[50vh] lg:max-h-[50vh] bg-gradient-to-t from-neutral-900 via-transparent to-zinc-900" />
      </div>
      <div className="flex w-full mt-[10vh] sm:mt-[20vh] items-center flex-col sm:flex-row gap-6 sm:gap-9">
        {game.coverUrl && (
          <div
            className={`w-40 h-[213px] lg:w-56 lg:h-[298px] shrink-0 relative rounded-lg shadow-2xl shadow-black/[0.5] overflow-hidden hover:brightness-125 transition duration-[1.5s] fade-up`}
          >
            <LazyImage
              src={game.coverUrl}
              alt={game.name + " Cover"}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="mt-auto w-full flex flex-col items-center text-center text-zinc-100 sm:items-start sm:text-left">
          <p className="font-semibold leading-tight tracking-tight max-w-md py-0.5 text-white text-3xl xl:text-4xl text-center sm:text-left [text-shadow:_0_1px_9px_rgb(0_0_0_/_80%)]">
            {game.name}
          </p>
          <div className="mt-2.5 flex gap-4 items-baseline font-medium">
            <span className="">
              {getYearFromUnixTimestamp(game.first_release_date)}
            </span>
            {game.first_release_date && game.total_rating && (
              <div className="h-[18px] w-[0.5px] bg-zinc-300 self-center -translate-y-px" />
            )}
            {game.total_rating && (
              <Rating count={Math.round(game.total_rating) / 10} />
            )}
            {game.total_rating && user && (
              <div className="h-[18px] w-[0.5px] bg-zinc-300 self-center -translate-y-px" />
            )}
            {user && (
              <button
                onClick={handleFavoriteClicked}
                className={`w-8 h-8 -my-2 translate-y-0.5 flex items-center justify-center bg-zinc-100/20 backdrop-blur-md rounded-full ${
                  isFavourite
                    ? "text-red-600 hover:text-red-600"
                    : "text-zinc-100/60 hover:text-zinc-100/80"
                } hover:bg-zinc-100/30 hover:scale-110 active:scale-95 transition duration-150 ease-in-out cursor-pointer`}
              >
                <FontAwesomeIcon icon={faHeart} className="text-lg" />
              </button>
            )}
          </div>
          {game.genres && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {game.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="px-2.5 py-[3px] rounded-full text-sm font-medium bg-zinc-200/20 backdrop-blur-md sm:-ml-1 border-[0.5px] border-neutral-500"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}
          {game.platforms && (
            <div className="mt-3 leading-relaxed">
              {game.platforms
                .map((platform) => platform.abbreviation)
                .join(", ")}
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-20 md:-left-5 lg:top-[90px] z-30 w-10 h-10 nav bg-zinc-600/50 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl shadow-zinc-900 hover:bg-zinc-500/50 active:scale-90 transition duration-150"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-lg"
          />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 sm:right-0 lg:-right-14 top-20 lg:top-[90px] z-30 w-10 h-10 nav bg-zinc-600/50 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl shadow-zinc-900 hover:bg-zinc-500/50 active:scale-90 transition duration-150"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-white text-lg"
          />
        </button>
        <div className="mask-sides -mx-6 px-6 lg:pr-20 lg:-mr-20">
          {game.screenshots && (
            <Gallery
              onInit={onInit}
              className="mt-4 py-10 flex px-6 -mx-6 lg:pr-20 lg:-mr-20 gap-2.5 overflow-x-scroll no-scrollbar"
            >
              {game.videos &&
                game.videos.map((video) => (
                  <GalleryVideo key={video.id} videoId={video.video_id} />
                ))}
              {game.screenshots.map((screenshot) => (
                <a
                  key={screenshot.id}
                  href={screenshot.bigUrl}
                  className="w-52 h-[117px] lg:w-60 lg:h-[135px] lg:mr-0.5 shrink-0 rounded-lg shadow-xl-center shadow-black/[0.3] border border-zinc-700/70 hover:border-none hover:z-10 hover:scale-[1.15] active:scale-90 hover:brightness-110 transition duration-[0.25s] ease-in-out cursor-pointer overflow-hidden relative"
                >
                  <LazyImage
                    alt={game.name + " Screenshot " + screenshot.id}
                    src={screenshot.smallUrl}
                    className="object-cover rounded-lg"
                  />
                </a>
              ))}
            </Gallery>
          )}
        </div>
      </div>
      <div className={`${game.screenshots ? "mt-4" : "mt-20"} max-w-2xl`}>
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

      {game.similarGamesWithCover.length > 0 && (
        <p className="mt-20 text-3xl font-normal text-white">More Like This</p>
      )}
      <div className="mt-10 grid gap-x-6 gap-y-8 xl:gap-y-14 md:gap-y-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {game.similarGamesWithCover &&
          game.similarGamesWithCover.map(
            (game) =>
              game.coverUrl && (
                <Link
                  key={game.id}
                  className="w-40 text-center fade-in rounded-lg"
                  href={`/games/${game.id}`}
                >
                  <div className="rounded-lg border border-zinc-800 shadow-lg shadow-black/[0.5] hover:z-20 hover:border-zinc-800 hover:scale-105 hover:-translate-y-0.5 hover:brightness-110  active:scale-95 transition duration-300 ease-in-out cursor-pointer">
                    <img
                      src={game.coverUrl}
                      alt={game.name}
                      className="w-40 shadow-lg rounded-lg"
                      loading="lazy"
                    />
                  </div>
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

  let screenshots = game.screenshots;
  if (game.screenshots) {
    screenshots = game.screenshots.map((screenshot) => {
      return {
        ...screenshot,
        thumbUrl: adjustImageUrl(screenshot.url, "t_thumb"),
        smallUrl: adjustImageUrl(screenshot.url, "t_screenshot_med_2x"),
        bigUrl: adjustImageUrl(screenshot.url, "t_screenshot_huge_2x"),
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
    screenshots: screenshots || [],
    similarGamesWithCover: similarGamesWithCover || [],
    websites: game.websites
      ? game.websites.sort((a, b) => (a.category < b.category ? -1 : 1))
      : null,
  };

  return { props: { game: gameDetails } };
}
