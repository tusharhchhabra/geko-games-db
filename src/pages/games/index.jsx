import fetchGames from "@/helpers/fetchDataExample";
import GamesList from "@/components/GameList";
import queries from "@/queryStrings";

const HomePage = ({ setOfGames }) => {
  return (
    <div>
      <GamesList setOfGames={setOfGames} />
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {

  // Top 10 games
  const top10Games = await fetchGames(queries.top10Games, "games");
  const covers = await fetchGames(queries.coverArt(top10Games), "covers");
  const top10GamesWithCovers = queries.gamesWithCoverArt(top10Games, covers)
  top10GamesWithCovers
  const top10GamesObject = {games: top10GamesWithCovers, title: "Top 10"};
  // Action Games
  const actionGames = await fetchGames(queries.actionGames, "games");
  const actionCovers = await fetchGames(queries.coverArt(actionGames), "covers");
  const actionGamesWithCovers = queries.gamesWithCoverArt(actionGames, actionCovers);
  const actionGamesObject = {games: actionGamesWithCovers, title: "Action Games"};

  const setOfGames = [top10GamesObject, actionGamesObject]
 
  return { props: { setOfGames } };
}
