import fetchData from "@/helpers/fetchData";
import GamesList from "@/components/GameList";
import queries from "@/helpers/queryStrings";
import SearchBar from "@/components/SearchBar";

const HomePage = ({ setOfGames }) => {
  return (
    <div className="p-10">
      <SearchBar />
      <GamesList setOfGames={setOfGames} />
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  // Top 10 games
  const top10Games = await fetchData(queries.top10Games, "games");
  const covers = await fetchData(
    queries.coverArtForGames(top10Games),
    "covers"
  );
  const top10GamesWithCovers = queries.gamesWithCoverArt(
    top10Games,
    covers,
    "t_cover_big"
  );
  top10GamesWithCovers;
  const top10GamesObject = { games: top10GamesWithCovers, title: "Top 10" };

  // Action Games
  const actionGames = await fetchData(queries.actionGames, "games");
  const actionCovers = await fetchData(
    queries.coverArtForGames(actionGames),
    "covers"
  );
  const actionGamesWithCovers = queries.gamesWithCoverArt(
    actionGames,
    actionCovers,
    "t_cover_big"
  );
  const actionGamesObject = {
    games: actionGamesWithCovers,
    title: "Action Games",
  };

  // New and Noteworthy Games
  const newGames = await fetchData(queries.newGames, "games");
  const newCovers = await fetchData(
    queries.coverArtForGames(newGames),
    "covers"
  );
  const newGamesWithCovers = queries.gamesWithCoverArt(
    newGames,
    newCovers,
    "t_cover_big"
  );
  const newGamesObject = {
    games: newGamesWithCovers,
    title: "New and Noteworthy",
  };

  const setOfGames = [top10GamesObject, actionGamesObject, newGamesObject];

  return { props: { setOfGames } };
}
