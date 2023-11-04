import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";

function SearchedGamesList({ games }) {
  const router = useRouter();
  const { user, openModal } = useContext(AuthContext);

  const handleGameClick = (game) => {
    if (!user) {
      openModal();
      return;
    }
    router.push(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto -mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => handleGameClick(game)}
            className="w-[132px] h-[187px] text-sm mt-16 font-medium"
          >
            {game.cover ? (
              <Image
                width={132}
                height={187}
                className="w-full h-full object-cover object-center transform rounded-lg border border-gray-700 cursor-pointer hover:scale-110 hover:brightness-125 transition duration-300 ease-in-out"
                src={game.cover.url}
                alt={game.name}
              />
            ) : (
              <div className="w-[132px] h-[187px] bg-gray-800 rounded-md cursor-pointer hover:scale-110 hover:brightness-125 transition duration-300 ease-in-out"></div>
            )}
            <p className="mt-4 line-clamp-2">{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchedGamesList;
