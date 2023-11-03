import AdvancedSearchTab from "./AdvancedSearchTab";
import SearchOptionButton from "./SearchOptionButton";

function AdvancedSearchTabGroup({
  selectedTab,
  setSelectedTab,
  params,
  setParams,
  options,
}) {
  const handleOptionChange = (selectedOption, name) => {
    setParams({
      ...params,
      [name]: selectedOption ? selectedOption.value : null,
    });
  };

  return (
    <div>
      <div className="font-medium text-center text-gray-400 border-b border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <AdvancedSearchTab
            name="Genre"
            isSelected={selectedTab === "Genre"}
            setSelected={setSelectedTab}
          />
          <AdvancedSearchTab
            name="Theme"
            isSelected={selectedTab === "Theme"}
            setSelected={setSelectedTab}
          />
          <AdvancedSearchTab
            name="Mode"
            isSelected={selectedTab === "Mode"}
            setSelected={setSelectedTab}
          />
          <AdvancedSearchTab
            name="Rating"
            isSelected={selectedTab === "Rating"}
            setSelected={setSelectedTab}
          />
          <AdvancedSearchTab
            name="Platform"
            isSelected={selectedTab === "Platform"}
            setSelected={setSelectedTab}
          />
          <AdvancedSearchTab
            name="Year Released"
            isSelected={selectedTab === "Year Released"}
            setSelected={setSelectedTab}
          />
        </ul>
      </div>
      {selectedTab === "Genre" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {options.genres.map((option) => (
            <SearchOptionButton
              key={option.id}
              name={option.name}
              option={option}
              isSelected={params.genres.includes(option.id)}
              handleOptionChange={handleOptionChange}
            />
          ))}
        </div>
      )}
      {selectedTab === "Theme" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {options.themes.map((option) => (
            <SearchOptionButton
              key={option.id}
              name={option.name}
              option={option}
              isSelected={params.genres.includes(option.id)}
              handleOptionChange={handleOptionChange}
            />
          ))}
        </div>
      )}
      {selectedTab === "Mode" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {options.modes.map((option) => (
            <SearchOptionButton
              key={option.id}
              name={option.name}
              option={option}
              isSelected={params.modes.includes(option.id)}
              handleOptionChange={handleOptionChange}
            />
          ))}
        </div>
      )}
      {selectedTab === "Rating" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          <div>
            <label htmlFor="email" className="text-md font-medium">
              Min Rating
            </label>
            <input
              className="w-20 mt-2 block border-none rounded-md py-2 pl-3 pr-10 text-sm leading-5 bg-gray-700/[0.3] text-white focus:ring-0"
              value={options.minRating}
              placeholder="0"
              onChange={(event) =>
                handleOptionChange(options.minRating, "minRating")
              }
            />
          </div>
        </div>
      )}
      {selectedTab === "Platform" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {options.genres.map((option) => (
            <SearchOptionButton
              key={option.id}
              name={option.name}
              option={option}
              isSelected={params.genres.includes(option.id)}
              handleOptionChange={handleOptionChange}
            />
          ))}
        </div>
      )}
      {selectedTab === "Year Released" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {options.genres.map((option) => (
            <SearchOptionButton
              key={option.id}
              name={option.name}
              option={option}
              isSelected={params.genres.includes(option.id)}
              handleOptionChange={handleOptionChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdvancedSearchTabGroup;
