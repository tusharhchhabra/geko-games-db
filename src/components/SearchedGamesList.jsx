import { getYearFromUnixTimestamp } from "@/helpers/findTime";
import Image from "next/image";
import { useRouter } from "next/router";

function SearchedGamesList({ games }) {
  const router = useRouter();

  const handleGameClick = (game) => {
    router.push(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-5 gap-8">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => handleGameClick(game)}
            className="w-[132px] h-[187px] text-sm mt-16 font-medium text-left"
          >
            {game.cover ? (
              <Image
                width={132}
                height={187}
                className="w-full h-full object-cover object-center transform  rounded-lg border border-gray-700 hover:scale-110 hover:brightness-125 transition duration-300 ease-in-out"
                src={game.cover.url}
                alt={game.name}
              />
            ) : (
              <div className="w-[132px] h-[187px] flex overflow-hidden bg-gray-800 rounded-md hover:scale-110 hover:brightness-125 transition duration-300 ease-in-out">
                <img
                  src="/logo.png"
                  className="object-contain rotate-[-30deg] scale-110 opacity-20"
                />
              </div>
            )}
            <p className="mt-4 line-clamp-2">{game.name}</p>
            <p className="mt-2 text-gray-500 font-normal">
              {getYearFromUnixTimestamp(game.first_release_date)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchedGamesList;
