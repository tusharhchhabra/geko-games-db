import GamesList from "@/components/GameList";
import fetchData from "@/helpers/fetchData";
import queries from "@/queryStrings";
import extractId from "@/helpers/extractId";

const Platform = ( {gamesByPlatformFamiliesObject} ) => {
  const [platformFamily, setPlatformFamily] = useState();
  const [platform, setPlatform] = useState();

  useEffect(() => {}, [platformFamily, platform]);

  return (
    // 1. 4 Dropdowns (Xbox, Playstation, Nintendo, PC)
    // 2. Display Grid of Games from all Platforms
    // 3. User selects a platform or platform family => changes grid of games
    <div>
      <h1>Hello</h1>
      <GamesList setOfGames={setOfGames} />
    </div>
  );
};

export default Platform;

export async function getServerSideProps() {
  // Fetch all platform family IDs
  // Fetch all platform IDs
  // Fetch all games by platform family
  // Set initial games to render as query for all games from all platform families
  //
  const platformFamilies = await fetchData(queries.platformFamilies, "platform_families");


  const gamesByPlatformFamilies = await fetchData(
    extractId(queries.gamesByPlatformFamilies),
    "games"
  );
  const gamesByPlatformFamiliesCovers = await fetchData(
    queries.coverArt(gamesByPlatformFamilies),
    "covers"
  );
  const gamesByPlatformFamiliesWithCovers = queries.gamesWithCoverArt(
    gamesByPlatformFamilies,
    gamesByPlatformFamiliesCovers,
    "t_cover_big"
  );
  const gamesByPlatformFamiliesObject = {
    games: gamesByPlatformFamiliesWithCovers,
    title: "All Games - All Platforms",
  };

  const setOfGames = [gamesByPlatformFamiliesObject];

  return { props: { setOfGames } };
}
