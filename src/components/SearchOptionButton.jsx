function SearchOptionButton({
  id,
  label,
  paramName,
  isSelected,
  handleOptionChange,
}) {
  return (
    <button
      onClick={() => handleOptionChange(id, paramName)}
      className={`px-3 py-1 text-left flex-grow-0 ${
        isSelected ? "bg-violet-600" : "bg-gray-800"
      } rounded-md border-[0.5px] border-gray-700`}
    >
      {label}
    </button>
  );
}

export default SearchOptionButton;
