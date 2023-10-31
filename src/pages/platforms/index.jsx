import GamesList from "@/components/GameList";
import fetchData from "@/helpers/fetchData";
import queries from "@/queryStrings";
import extractId from "@/helpers/extractId";

const Platform = ({ initialGames, initialPlatforms }) => {
  const [platform, setPlatform] = useState(null);
  const [games, setGames] = useState(initialGames);

  const platformsDropdown = initialPlatforms.map((platform) => {
    return platform.name;
  });


  const fetchNextSection = async (platform) => {
    if (platform) {
      const response = await fetch(
        `/api/platforms?platformId=${encodeURIComponent(platform.id)}`
      );
      const results = await response.json();
      setGames(results);
    } else {
      setGames([]);
    }
  };

  useEffect(() => {}, [platform]);

  return (
    <div>
      <h1>Hello</h1>
      <GamesList setOfGames={setOfGames} />
    </div>
  );
};

export default Platform;

export async function getServerSideProps() {

  // Fetch platforms
  const platforms = await fetchData(queries.platforms, "platforms");

  // Fetch initial games (Move rest to call on scroll)
  // (PS5 &  Xbox Series X/S)
  const gamesByPlatform = await fetchData(
    queries.gamesByPlatforms((167, 169)),
    "games"
  );
  const gamesByPlatformCovers = await fetchData(
    queries.coverArt(gamesByPlatform),
    "covers"
  );
  const gamesByPlatformWithCovers = queries.gamesWithCoverArt(
    gamesByPlatform,
    gamesByPlatformCovers,
    "t_cover_big"
  );
  const gamesByPlatformObject = {
    games: gamesByPlatformWithCovers,
    title: "All Platforms",
  };

  const setOfGames = [gamesByPlatformObject];

  return { props: { initialGames: setOfGames, initialPlatforms: platforms } };
}
