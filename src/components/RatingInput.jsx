function RatingInput({
  label,
  value,
  paramName,
  placeholder,
  handleOptionChange,
}) {
  return (
    <div className="text-sm text-gray-400">
      <label htmlFor="email" className="text-md font-medium">
        {label}
      </label>
      <input
        className="w-20 mt-2 block border-none rounded-md py-2 pl-3 pr-10 text-sm leading-5 bg-gray-700/[0.3] text-white focus:ring-0"
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => handleOptionChange(e.target.value, paramName)}
      />
    </div>
  );
}

export default RatingInput;
