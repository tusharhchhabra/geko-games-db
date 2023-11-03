import React, { useRef } from 'react';
import GamesListItem from "@/components/GameListItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const GamesList = ({ setOfGames }) => {

  const sliderRefs = useRef(new Array(setOfGames.length));

  const slide = (index, direction) => {
    const slider = sliderRefs.current[index];
    if (slider) {
      const scrollAmount = direction === 'left' ? -500 : 1000;
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <>
      {setOfGames.map((gameSet, index) => (
        <div key={index}>
          <h2 className="text-white font-bold md:text-xl p-4">
            {gameSet.title}
          </h2>
          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide(index, 'left')}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 left-0" size={40} />
            <div
              ref={el => sliderRefs.current[index] = el}
              className="flex flex-row overflow-x-hidden overflow-y-hidden whitespace-nowrap" 
            >
              <GamesListItem games={gameSet.games} />
            </div>
            <MdChevronRight
              onClick={() => slide(index, 'right')}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 right-0" size={40} />
          </div>
        </div>
      ))}
    </>
  );
};

export default GamesList;
