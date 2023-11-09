import { useState } from 'react';
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
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);

  const selectPlatform = (platform) => {
    setGameThemesId(extractIdAsAnArray(initialThemes));
    setGameThemes(extractNameAsAnArray(initialThemes));
    setAllDataLoaded(false);
    setSelectedPlatform(platform.id);
    setSelectedPlatformId(platform.id);
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-1 space-y-[2px] lg:space-x-4 lg:space-y-[2px] absolute top-20 sm:top-16 lg:top-32 lg:left-20 md:left-4 md:top-24">
      {platforms && platforms.map((platform, index) => {
        const platformName = platform.name === "PC (Microsoft Windows)" ? "PC" : platform.name;
        const isSelected = selectedPlatformId === platform.id;
        
        return (
          <button
            onClick={() => selectPlatform(platform)}
            key={platform.id}
            className={`
              w-20 h-10 text-[9px] px-4 py-1 font-bold rounded-[5px] transition duration-300 ease-in-out
              ${isSelected ? 'bg-violet-500 border-white border-2' : 'bg-black text-white'}
              hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
              sm:w-52 sm:h-8 sm:text-[15px] lg:w-40 lg:h-16 lg:text-[18px]
              
            `}
          >
            {platformName}
          </button>
        );
      })}
    </div>
  );
};

export default PlatformButton;
