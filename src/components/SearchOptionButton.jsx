function SearchOptionButton({
  id,
  label,
  paramName,
  isSelected,
  handleOptionChange,
}) {
  console.log(isSelected);

  return (
    <button
      onClick={() => handleOptionChange(id, paramName)}
      className={`px-3 py-1 text-left flex-grow-0 ${
        isSelected ? "bg-violet-500" : "bg-gray-800"
      } rounded-md`}
    >
      {label}
    </button>
  );
}

export default SearchOptionButton;
