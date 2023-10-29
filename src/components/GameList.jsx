import GamesListItem from "@/components/GameListItem";

const GamesList = ({ combinedData }) => {
  return (
    <div>
      <GamesListItem combinedData={combinedData} />
    </div>
  );
}

export default GamesList;
