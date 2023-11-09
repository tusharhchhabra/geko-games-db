import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdvancedSearchBar({ searchTerm, handleSearchTermChange }) {
  return (
    <div className="mt-6 text-sm text-zinc-300">
      <label htmlFor="email" className="text-md font-medium">
        Search Term
      </label>
      <div className="relative">
        <input
          className="w-full max-w-sm mt-2 block border-none rounded-md py-2 pl-8 pr-10 text-sm leading-5 bg-zinc-700/[0.4] text-white focus:ring-0"
          value={searchTerm || ""}
          placeholder="Type something..."
          onChange={handleSearchTermChange}
        />
        <FontAwesomeIcon
          icon={faSearch}
          width={14}
          className="absolute top-[11px] left-[11px] text-zinc-400"
        />
      </div>
    </div>
  );
}

export default AdvancedSearchBar;
