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
        isSelected ? "bg-violet-600" : "bg-zinc-800"
      } rounded-md border-[0.5px] border-zinc-600 hover:brightness-125 hover:scale-[1.02] active:scale-95 transition-transform duration-200`}
    >
      {label}
    </button>
  );
}

export default SearchOptionButton;
