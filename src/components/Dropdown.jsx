import { Combobox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getYearFromUnixTimestamp } from "../helpers/findTime";

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
        <div className="relative w-full cursor-default rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 md:text-sm">
          <Combobox.Input
            className="w-full rounded-md py-2 pl-3 pr-10 text-md leading-5 bg-zinc-700 md:bg-zinc-700/[0.2] md:backdrop-blur-md text-white focus:ring-0"
            displayValue={query}
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {(games.length !== 0 || canShowEmptyState) && query !== "" && (
          <Transition
            as={Fragment}
            enter="transition ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 py-2 max-h-96 w-full overflow-auto rounded-md bg-zinc-700 text-base shadow-lg ring-1 ring-black/5 focus:outline-none md:text-sm">
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
                            <div className="w-[60px] h-[80px] shrink-0 flex overflow-hidden bg-gray-800 rounded-md hover:scale-110 hover:brightness-125 transition duration-300 ease-in-out">
                              <img
                                src="/placeholder.png"
                                className="object-contain rotate-[-30deg] scale-110"
                              />
                            </div>
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
}
