import React, { useRef } from "react";
import GamesListItem from "@/components/GameListItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const GamesList = ({ setOfGames }) => {
  const sliderRefs = useRef(new Array(setOfGames.length).fill(null));

  const slide = (index, direction) => {
    const slider = sliderRefs.current[index];
    if (slider) {
      let scrollAmount = direction === "left" ? -200 : 200;
      if (slider.clientWidth < 600) {
        scrollAmount = direction === "left" ? -125 : 125;
      } else if (slider.clientWidth >= 600 && slider.clientWidth < 1024) {
        scrollAmount = direction === "left" ? -180 : 180;
      } else if (slider.clientWidth >= 1024) {
        scrollAmount = direction === "left" ? -200 : 200;
      } else if (slider.clientWidth >= 1500) {
        console.log("slider.clientWidth", slider.clientWidth);
        scrollAmount = direction === "left" ? -25 : 25;
      }
  
      let newScrollPosition = slider.scrollLeft + scrollAmount;
      if (direction === "right" && newScrollPosition + slider.clientWidth > slider.scrollWidth) {
        newScrollPosition = 0;
      }
      if (direction === "left" && newScrollPosition < 0) {
        newScrollPosition = slider.scrollWidth - slider.clientWidth;
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
          <h2 className="text-violet-500 font-bold   [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-black
          lg:text-4xl lg:ml-10 lg:mt-5 lg:p-2
          md:text-3xl md:ml-5 md:mt-5 md:p-2
          sm:text-2xl sm:ml-5 sm:mt-5 sm:p-1
          text-xl ml-5 mt-0 p-0
          ">
            {gameSet.title}
          </h2>

          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide(index, "left")}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 text-black 
              xl:w-[80px] xl:h-[80px] xl:left-[0px] xl:top-[40%]
              lg:w-[70px] lg:h-[70px] lg:left-[0px] lg:top-[40%]
              md:w-[50px] md:h-[50px] md:left-[0px] md:top-[45%]
              sm:w-[30px] sm:h-[30px] sm:left-[0px] sm:top-[45%]
              w-[20px] h-[20px] left-[0px] top-[45%]
              "
              
            />
            <div
              ref={(el) => (sliderRefs.current[index] = el)}
              className="flex flex-row overflow-x-hidden overflow-y-hidden p object-fill whitespace-nowrap"
            >
              <GamesListItem games={gameSet.games} />
            </div>
            <MdChevronRight
              onClick={() => slide(index, "right")}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 text-black
              xl:w-[80px] xl:h-[80px] xl:right-[70px] xl:top-[40%]
              lg:w-[70px] lg:h-[70px] lg:right-[0px] lg:top-[40%]
              md:w-[50px] md:h-[50px] md:right-[0px] md:top-[45%]
              sm:w-[30px] sm:h-[30px] sm:right-[0px] sm:top-[45%]
              w-[20px] h-[20px] right-[0px] top-[45%]

              "
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default GamesList;
