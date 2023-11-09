import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import Image from "next/image";
import { useRouter } from "next/router";
import LazyImage from "./LazyImage";

function SearchedGamesList({ games }) {
  const router = useRouter();

  const handleGameClick = (game) => {
    router.push(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="grid gap-x-8 gap-y-10 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-5 place-items-start">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => handleGameClick(game)}
            className="w-[136px] text-sm font-medium text-left"
          >
            <div className="w-[136px] h-[181px] relative rounded-lg border border-gray-700 hover:scale-110 hover:brightness-110 hover:-translation-y-0.5 active:scale-95 transition duration-300 ease-in-out">
              {game.cover ? (
                <LazyImage
                  className="object-cover object-center rounded-lg"
                  src={game.cover.url}
                  alt={game.name}
                />
              ) : (
                <div className="w-[136px] h-[181px] flex overflow-hidden bg-gray-800 rounded-lg fade-in">
                  <img
                    src="/placeholder.png"
                    className="object-contain rotate-[-30deg] scale-110"
                  />
                </div>
              )}
            </div>
            <p className="mt-4 line-clamp-2">{game.name}</p>
            <p className="mt-1 text-gray-500 font-normal">
              {getYearFromUnixTimestamp(game.first_release_date)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchedGamesList;
