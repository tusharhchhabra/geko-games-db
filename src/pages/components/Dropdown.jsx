import { Combobox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getYearFromUnixTimestamp } from "../../helpers/findTime";

export default function MyCombobox({
  query,
  setQuery,
  games,
  selected,
  setSelected,
  canShowEmptyState,
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
        {(games.length !== 0 || canShowEmptyState) && query !== "" && (
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 py-2 max-h-96 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {games.length === 0 && query !== "" && canShowEmptyState ? (
                <div className="relative cursor-default select-none py-3 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
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
                        <div className="flex gap-4">
                          {game.coverUrl ? (
                            <img
                              loading="lazy"
                              src={game.coverUrl}
                              alt={game.name}
                              width="60px"
                              height="80px"
                              className="rounded-md"
                            />
                          ) : (
                            <div className="w-[60px] h-[80px] bg-gray-300 rounded-md"></div>
                          )}
                          <div>
                            <p
                              className={`block font-semibold truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {game.name}
                            </p>
                            <p className="italic">
                              {getYearFromUnixTimestamp(
                                game.first_release_date
                              )}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        )}
      </div>
    </Combobox>
  );
};