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

  // Top 10 Games
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

  // New and Noteworthy Games
  const newGames = await fetchGames(queries.newGames, "games");
  const newCovers = await fetchGames(queries.coverArt(newGames), "covers");
  const newGamesWithCovers = queries.gamesWithCoverArt(newGames, newCovers);
  const newGamesObject = {games: newGamesWithCovers, title: "New and Noteworthy"};

  const setOfGames = [top10GamesObject, actionGamesObject, newGamesObject]
 
  return { props: { setOfGames } };
}
