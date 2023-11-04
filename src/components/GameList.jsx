import React, { useRef } from "react";
import GamesListItem from "@/components/GameListItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const GamesList = ({ setOfGames }) => {
  const sliderRefs = useRef(new Array(setOfGames.length).fill(null));

  const slide = (index, direction) => {
    const slider = sliderRefs.current[index];
    if (slider) {
      const scrollAmount = direction === "left" ? -400 : 400;
      let newScrollPosition = slider.scrollLeft + scrollAmount;

      if (
        direction === "right" &&
        newScrollPosition + slider.clientWidth > slider.scrollWidth
      ) {
        newScrollPosition = 0;
      }

      if (direction === "left" && newScrollPosition < 0) {
        newScrollPosition = 1200;
      }

      slider.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {setOfGames.map((gameSet, index) => (
        <div key={index}>
          <h2 className="text-violet-500 font-bold p-4 ml-10 mt-5 text-4xl [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-black ">
            {gameSet.title}
          </h2>

          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide(index, "left")}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 left-[-37px] text-black"
              size={70}
            />
            <div
              ref={(el) => (sliderRefs.current[index] = el)}
              className="flex flex-row overflow-x-hidden overflow-y-hidden p object-fill"
            >
              <GamesListItem games={gameSet.games} />
            </div>
            <MdChevronRight
              onClick={() => slide(index, "right")}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 left-[1579px] text-black"
              size={70}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default GamesList;
