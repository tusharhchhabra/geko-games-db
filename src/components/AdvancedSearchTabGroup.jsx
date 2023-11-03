import AdvancedSearchTab from "./AdvancedSearchTab";
import RatingInput from "./RatingInput";
import SearchOptionButton from "./SearchOptionButton";
import YearSelector from "./YearSelector";

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
      [name]: selectedOption ? selectedOption : null,
    });
  };

  const handleArrayOptionChange = (selectedOption, name) => {
    setParams((prevParams) => {
      const existingArray = prevParams[name] || [];

      let updatedArray;
      if (existingArray.includes(selectedOption)) {
        updatedArray = existingArray.filter(
          (option) => option !== selectedOption
        );
      } else {
        updatedArray = [...existingArray, selectedOption];
      }

      return {
        ...prevParams,
        [name]: updatedArray,
      };
    });
  };

  const handleYearChange = (event) => {
    const year = event.target.value;

    const yearStartTimestamp = year
      ? Math.floor(new Date(`${year}-01-01T00:00:00Z`).getTime() / 1000)
      : null;
    onYearChange(yearStartTimestamp);
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
              handleOptionChange={handleArrayOptionChange}
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
              handleOptionChange={handleArrayOptionChange}
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
              handleOptionChange={handleArrayOptionChange}
            />
          ))}
        </div>
      )}
      {selectedTab === "Rating" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          <RatingInput
            label="Min Rating"
            value={params.minRating}
            placeholder={"0"}
            paramName={"minRating"}
            handleOptionChange={handleOptionChange}
          />
          <RatingInput
            label="Max Rating"
            value={params.maxRating}
            placeholder={"10"}
            paramName={"maxRating"}
            handleOptionChange={handleOptionChange}
          />
        </div>
      )}
      {selectedTab === "Platform" && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {options.platforms.map((option) => (
            <SearchOptionButton
              key={option.id}
              name={option.name}
              option={option}
              isSelected={params.genres.includes(option.id)}
              handleOptionChange={handleArrayOptionChange}
            />
          ))}
        </div>
      )}
      {selectedTab === "Year Released" && (
        <div className="mt-4">
          <YearSelector
            selectedYear={params}
            handleYearChange={handleYearChange}
          />
        </div>
      )}
    </div>
  );
}

export default AdvancedSearchTabGroup;
