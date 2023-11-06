import extractIdAsAnArray from "@/helpers/extractIdsAsArray";
import extractNameAsAnArray from "@/helpers/extractNameAsArray";

const PlatformButton = ({
  platforms,
  setSelectedPlatform,
  setGameThemesId,
  setGameThemes,
  initialThemes,
  setAllDataLoaded,
}) => {
  const selectPlatform = (platform) => {
    setGameThemesId(extractIdAsAnArray(initialThemes));
    setGameThemes(extractNameAsAnArray(initialThemes));
    setAllDataLoaded(false);
    setSelectedPlatform(platform);
  };

  return (
    <div
      className="
      flex flex-wrap justify-center items-center
      space-x-1 space-y-[2px] lg:space-x-4 lg:space-y-0
      absolute top-28 sm:top-16 lg:top-32 lg:left-20 md:left-4 md:top-24 
    "
    >
      {platforms.map((platform, index) => {
        const platformName =
          platform.name === "PC (Microsoft Windows)" ? "PC" : platform.name;

        return (
          <button
            onClick={() => selectPlatform(platform.id)}
            key={index}
            className="
              w-20 h-7
              text-[7px]
              px-4 py-1
              font-bold
              bg-black text-white rounded-full
              hover:bg-gray-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-black focus:bg-violet-500
              sm:w-52 sm:h-8
              sm:text-[15px]
              lg:w-40 lg:h-16
              lg:text-[18px]
              transition duration-300 ease-in-out

              
              
              "
          >
            {platformName}
          </button>
        );
      })}
    </div>
  );
};

export default PlatformButton;
