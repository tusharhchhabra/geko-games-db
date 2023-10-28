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

const query = "fields name; limit 10;";
const endpoint = "games"

export async function getServerSideProps() {
  const games = await fetchGames(query, endpoint);
  return { props: { games } };
}
