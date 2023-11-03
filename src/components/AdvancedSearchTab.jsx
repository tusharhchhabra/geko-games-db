function AdvancedSearchTab({ name, isSelected, setSelected, selectionCount }) {
  return (
    <li className="sm:mr-0 md:mr-2">
      <button
        onClick={() => setSelected(name)}
        className={`py-4 pr-2 border-b-2 flex justify-center items-center gap-2 ${
          isSelected
            ? "text-violet-500 border-violet-500"
            : "hover:text-gray-300 hover:border-gray-300"
        } border-transparent rounded-t-lg`}
      >
        {name}
        <div
          className={`${
            selectionCount > 0 ? "" : "invisible"
          } text-xs font-mono font-bold px-2 pt-[1.5px] pb-[1.5px]] bg-gray-800 text-violet-400 rounded-full border border-gray-700`}
        >
          {selectionCount}
        </div>
      </button>
    </li>
  );
}

export default AdvancedSearchTab;
