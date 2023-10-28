import fetchData from "@/helpers/fetchData";

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
  const games = await fetchData();
  return { props: { games } };
}
