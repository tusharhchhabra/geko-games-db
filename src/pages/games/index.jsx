import fetchGames from "@/helpers/fetchDataExample";

function GamesList({ games }) {
  return (
    <div>
      {games &&
        games.length > 0 &&
        games.map((game) => <p key={game.id}>{game.name}</p>)}
    </div>
  );
}

export default GamesList;

export async function getServerSideProps() {
  const games = await fetchGames();
  return { props: { games } };
}
