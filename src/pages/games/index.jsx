import fetchGames from "@/helpers/fetchDataExample";
import GamesList from "@/components/GameList";
import queries from "@/queryStrings";

const HomePage = ({ top10GamesWithCovers, actionGamesWithCovers }) => {
  return (
    <div>
      <GamesList top10Games={top10GamesWithCovers} actionGames={actionGamesWithCovers} />
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {

  // Top 10 games
  const top10Games = await fetchGames(queries.top10Games, "games");
  const covers = await fetchGames(queries.coverArt(top10Games), "covers");
  const top10GamesWithCovers = queries.gamesWithCoverArt(top10Games, covers)
  
  // Action Games
  const actionGames = await fetchGames(queries.actionGames, "games");
  const actionCovers = await fetchGames(queries.coverArt(actionGames), "covers");
  const actionGamesWithCovers = queries.gamesWithCoverArt(actionGames, actionCovers);
 
  return { props: { top10GamesWithCovers, actionGamesWithCovers } };
}
