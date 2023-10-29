import GamesListItem from "@/components/GameListItem";

const GamesList = ({ top10Games, actionGames }) => {

  return (
    <div>
      <GamesListItem top10Games={top10Games} actionGames={actionGames}/>
    </div>
  );
}

export default GamesList;
