function YearSelector({ selectedYear, handleYearChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (v, i) => 1980 + i);

  return (
    <div>
      {/* <label
        for="countries"
        className="block mb-2 text-sm font-medium text-white"
      >
        Select Year
      </label> */}
      <select
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
        className="border text-sm rounded-lg block w-40 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-violet-500 focus:border-violet-500"
      >
        <option value="">No year selected</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearSelector;
