import fetchData from "@/helpers/fetchData";
import SearchBar from "../components/SearchBar";

function GamesList({ games }) {
  return (
    <div className="p-10">
      <SearchBar></SearchBar>
      <div>
        {games &&
          games.length > 0 &&
          games.map((game) => <p key={game.id}>{game.name}</p>)}
      </div>
    </div>
  );
}

export default GamesList;

const query = "fields name; limit 10;";
const endpoint = "games";

export async function getServerSideProps() {
  const games = await fetchData(query, endpoint);
  return { props: { games } };
}
