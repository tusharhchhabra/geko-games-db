function AdvancedSearchBar({
  searchTerm,
  setSearchTerm,
  handleSearchTermChange,
}) {
  const onChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearchTermChange(e.target.value);
  };

  return (
    <div className="mt-6 text-sm text-gray-300">
      <label htmlFor="email" className="text-md font-medium">
        Search Term
      </label>
      <input
        className="w-full max-w-sm mt-2 block border-none rounded-md py-2 pl-3 pr-10 text-sm leading-5 bg-gray-700/[0.3] text-white focus:ring-0"
        value={searchTerm || ""}
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
}

export default AdvancedSearchBar;
