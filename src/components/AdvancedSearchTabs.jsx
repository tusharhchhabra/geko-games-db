function AdvancedSearchTabs() {
  return (
    <div className="font-medium text-center text-gray-400 border-b border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-300 hover:border-gray-300"
          >
            Genre
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 text-violet-500 border-b-2 border-violet-500 rounded-t-lg active"
            aria-current="page"
          >
            Theme
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-300 hover:border-gray-300"
          >
            Rating
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-300 hover:border-gray-300"
          >
            Platform
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-300 hover:border-gray-300"
          >
            Year Released
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AdvancedSearchTabs;
