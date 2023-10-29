import { Combobox, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MyCombobox({
  query,
  setQuery,
  games,
  selected,
  setSelected,
}) {
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {games.length === 0 && query !== "" ? (
              <p></p>
            ) : (
              // <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              //   Nothing found.
              // </div>
              games.map((game) => (
                <Combobox.Option
                  key={game.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={game}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block font-semibold truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {game.name}
                      </span>
                      <span className="italic">
                        {getYearFromUnixTimestamp(game.first_release_date)}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

function getYearFromUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  if (isNaN(year)) return "";
  return year;
}
