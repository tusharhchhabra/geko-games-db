import renderGames from "@/helpers/renderGames";

const GameListItem = ({ top10Games, actionGames }) => {
 
const top10GamesElements = renderGames(top10Games);
const actionGamesElements = renderGames(actionGames);

  return (
    <div>
      {top10GamesElements}
      {actionGamesElements}
    </div>
  );
}

export default GameListItem;
