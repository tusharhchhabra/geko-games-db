import extractIdAsAnArray from "@/helpers/extractIdsAsArray";
import extractNameAsAnArray from "@/helpers/extractNameAsArray";

const PlatformButton = ({ platforms, setSelectedPlatform, setGameThemesId, setGameThemes, initialThemes }) => {
  const selectPlatform = (platform) => {
    setGameThemesId(extractIdAsAnArray(initialThemes));
    setGameThemes(extractNameAsAnArray(initialThemes));
    setSelectedPlatform(platform);
  };


  return (
    <div className="flex space-x-4">
      {platforms.map((platform, index) => (
        <button
          onClick={() => selectPlatform(platform.id)}
          key={index}
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          {platform.name}
        </button>
      ))}
    </div>
  );
};

export default PlatformButton;
