import RenderGames from "@/components/RenderGames";

const GameListItem = ({ games }) => {
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 flex flex-row ">
      <RenderGames games={games} />
    </div>
  );
};

export default GameListItem;
