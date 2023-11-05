import { useState } from "react";
import AdvancedSearchBar from "./AdvancedSearchBar";
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
  const handleSearchTermChange = (e) => {
    setParams({ ...params, name: e.target.value });
  };

  const handleOptionChange = (selectedOption, paramName) => {
    setParams({
      ...params,
      [paramName]: selectedOption ? selectedOption : null,
    });
  };

  const handleArrayOptionChange = (selectedOption, paramName) => {
    setParams((prevParams) => {
      const existingArray = prevParams[paramName] || [];

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
        [paramName]: updatedArray,
      };
    });
  };

  const handleYearChange = (event) => {
    const year = event.target.value;

    if (!year) {
      setParams((prev) => {
        return { ...prev, fromDate: "", toDate: "" };
      });
    }

    const fromDate = Math.floor(
      new Date(`${year}-01-01T00:00:00Z`).getTime() / 1000
    );

    const toDate = Math.floor(Date.UTC(parseInt(year) + 1, 0, 1) / 1000) - 1;

    console.log(fromDate, toDate);
    setParams((prev) => {
      return { ...prev, fromDate, toDate };
    });
  };

  const getYearFromDates = () => {
    const { fromDate, toDate } = params;
    const fromYear = fromDate ? new Date(fromDate * 1000).getFullYear() : "";
    return toDate ? new Date(toDate * 1000).getFullYear() : fromYear;
  };

  return (
    <div className="w-full">
      <AdvancedSearchBar
        searchTerm={params.name}
        handleSearchTermChange={handleSearchTermChange}
      />
      <div className="font-medium text-center text-gray-400 border-b border-gray-700">
        <ul className="mt-4 flex flex-wrap -mb-px gap-1">
          <AdvancedSearchTab
            name="Genre"
            isSelected={selectedTab === "Genre"}
            setSelected={setSelectedTab}
            selectionCount={params.genres.length}
          />
          <AdvancedSearchTab
            name="Theme"
            isSelected={selectedTab === "Theme"}
            setSelected={setSelectedTab}
            selectionCount={params.themes.length}
          />
          <AdvancedSearchTab
            name="Mode"
            isSelected={selectedTab === "Mode"}
            setSelected={setSelectedTab}
            selectionCount={params.modes.length}
          />
          <AdvancedSearchTab
            name="Rating"
            isSelected={selectedTab === "Rating"}
            setSelected={setSelectedTab}
            selectionCount={params.minRating || params.maxRating ? 1 : 0}
          />
          <AdvancedSearchTab
            name="Platform"
            isSelected={selectedTab === "Platform"}
            setSelected={setSelectedTab}
            selectionCount={params.platforms.length}
          />
          <AdvancedSearchTab
            name="Year Released"
            isSelected={selectedTab === "Year Released"}
            setSelected={setSelectedTab}
            selectionCount={params.fromDate || params.toDate ? 1 : 0}
          />
        </ul>
      </div>
      <div className="mt-6 md:h-28">
        {selectedTab === "Genre" && (
          <div className="flex gap-2 flex-wrap">
            {options.genres.map((option) => (
              <SearchOptionButton
                key={option.id}
                id={option.id}
                label={option.name}
                paramName={"genres"}
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
                id={option.id}
                label={option.name}
                paramName={"themes"}
                isSelected={params.themes.includes(option.id)}
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
                id={option.id}
                label={option.name}
                paramName={"modes"}
                isSelected={params.modes.includes(option.id)}
                handleOptionChange={handleArrayOptionChange}
              />
            ))}
          </div>
        )}
        {selectedTab === "Rating" && (
          <div className="mt-4 flex gap-6 flex-wrap">
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
                id={option.id}
                label={option.name}
                paramName={"platforms"}
                isSelected={params.platforms.includes(option.id)}
                handleOptionChange={handleArrayOptionChange}
              />
            ))}
          </div>
        )}
        {selectedTab === "Year Released" && (
          <div className="mt-4">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-white"
            >
              Select Year
            </label>
            <YearSelector
              selectedYear={getYearFromDates()}
              handleYearChange={handleYearChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedSearchTabGroup;
