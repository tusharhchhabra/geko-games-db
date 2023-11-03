function YearSelector({ selectedYear, handleYearChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (v, i) => 1980 + i);

  return (
    <div className="relative">
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
        className="block border appearance-none text-sm rounded-lg w-40 p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-violet-500 focus:border-violet-500"
      >
        <option value="">No year selected</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-32 flex items-center px-2 text-gray-200">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

export default YearSelector;
