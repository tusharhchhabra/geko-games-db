import renderGames from "@/helpers/renderGames";

const GameListItem = ({ games }) => {
const gamesElements = renderGames(games);

  return (
    <div>
      {gamesElements}
    </div>
  );
}

export default GameListItem;
