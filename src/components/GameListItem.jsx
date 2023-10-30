import RenderGames from "@/components/RenderGames";

const GameListItem = ({ games }) => {
  return (
    <div>
      <RenderGames games={games} />
    </div>
  );
};

export default GameListItem;
