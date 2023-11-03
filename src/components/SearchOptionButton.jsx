function SearchOptionButton({ name, option, isSelected, handleOptionChange }) {
  return (
    <button
      onClick={() => handleOptionChange(option, "genre")}
      className={`px-3 py-1 ${
        isSelected ? "bg-violet-500" : "bg-gray-800"
      } rounded-md`}
    >
      {name}
    </button>
  );
}

export default SearchOptionButton;
