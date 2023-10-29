import fetchData from "@/helpers/fetchData";
import GamesList from "@/components/GameList";
import queries from "@/queryStrings";
import SearchBar from "../components/SearchBar";

const HomePage = ({ top10GamesWithCovers, actionGamesWithCovers }) => {
  return (
    <div className="p-10">
      <SearchBar></SearchBar>
      <GamesList
        top10Games={top10GamesWithCovers}
        actionGames={actionGamesWithCovers}
      />
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  // Top 10 games
  const top10Games = await fetchData(queries.top10Games, "games");
  const covers = await fetchData(queries.coverArt(top10Games), "covers");
  const top10GamesWithCovers = queries.gamesWithCoverArt(top10Games, covers);

  // Action Games
  const actionGames = await fetchData(queries.actionGames, "games");
  const actionCovers = await fetchData(queries.coverArt(actionGames), "covers");
  const actionGamesWithCovers = queries.gamesWithCoverArt(
    actionGames,
    actionCovers
  );

  return { props: { top10GamesWithCovers, actionGamesWithCovers } };
}
