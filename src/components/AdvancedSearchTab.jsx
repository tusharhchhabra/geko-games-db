function AdvancedSearchTab({ name, isSelected, setSelected }) {
  return (
    <li className="mr-2">
      <button
        onClick={() => setSelected(name)}
        className={`p-4 border-b-2 ${
          isSelected
            ? "text-violet-500 border-violet-500"
            : "hover:text-gray-300 hover:border-gray-300"
        } border-transparent rounded-t-lg`}
      >
        {name}
      </button>
    </li>
  );
}

export default AdvancedSearchTab;
