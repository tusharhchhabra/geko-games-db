import { Combobox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getYearFromUnixTimestamp } from "../helpers/findTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LazyImage from "./LazyImage";

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
        <div className="relative w-full cursor-default rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 md:text-sm">
          <Combobox.Input
            className="w-full rounded-lg py-2 pl-8 pr-10 text-md leading-5 bg-zinc-700 md:bg-zinc-500/[0.2] md:backdrop-blur-md text-white focus:ring-0"
            displayValue={query}
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-2.5 left-2.5 text-zinc-400"
          />
        </div>
        {(games.length !== 0 || canShowEmptyState) && query !== "" && (
          <Transition
            as={Fragment}
            enter="transition ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Combobox.Options className="absolute mt-1 py-2 max-h-96 w-full overflow-auto rounded-md bg-zinc-700 text-base shadow-lg ring-1 ring-black/5 focus:outline-none md:text-sm fade-down">
              {games.length === 0 && query !== "" && canShowEmptyState ? (
                <div className="relative cursor-default select-none py-3 px-4 text-gray-400">
                  Nothing found.
                </div>
              ) : (
                games.map((game) => (
                  <Combobox.Option
                    key={game.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-teal-600" : "text-white"
                      }`
                    }
                    value={game}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex gap-4">
                          <div className="w-[60px] h-[80px] relative shrink-0">
                            {game.coverUrl ? (
                              <LazyImage
                                src={game.coverUrl}
                                alt={game.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-[60px] h-[80px] shrink-0 flex overflow-hidden bg-gray-800 rounded-md hover:scale-110 hover:brightness-125 transition duration-300 ease-in-out">
                                <img
                                  src="/placeholder.png"
                                  className="object-contain rotate-[-30deg] scale-110"
                                />
                              </div>
                            )}
                          </div>
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
}
