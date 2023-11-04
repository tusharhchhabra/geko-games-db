import Image from "next/image";

function SearchedGamesList({ games }) {
  return (
    <div className="container mx-auto -mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="w-[132px] h-[187px] text-sm mt-16 font-medium"
          >
            {game.cover ? (
              <Image
                width={132}
                height={187}
                className="w-full h-full object-cover object-center transform rounded-lg border border-gray-700 cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                src={game.cover.url}
                alt={game.name}
              />
            ) : (
              <div className="w-[132px] h-[187px] bg-gray-800 rounded-md cursor-pointer hover:scale-110 transition duration-300 ease-in-out"></div>
            )}
            <p className="mt-4 line-clamp-2">{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchedGamesList;
