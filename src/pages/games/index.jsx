import fetchGames from "@/helpers/fetchDataExample";
import GamesList from "@/components/GameList";
import extractId from "@/helpers/extractId";
import adjustImageUrl from "@/helpers/adjustImageUrl";

const HomePage = ({ combinedData }) => {
  return (
    <div>
      <GamesList combinedData={combinedData} />
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {

  // API call to get the games
  const query1 = "fields name, id; where total_rating_count >= 100; sort total_rating desc; limit 12;";
  const games = await fetchGames(query1, "games");

  // API call to get the covers
  const query2 = `fields game, url; where game = ${extractId(games)};`;
  const covers = await fetchGames(query2, "covers");

  // Combine the data
  const combinedData = games.map(game => {
    const cover = covers.find(cover => cover.game === game.id);
    const coverUrl = cover ? adjustImageUrl(cover.url) : null;
    return {
      ...game,
      coverUrl
    };

  });
  
  return { props: { combinedData } };
}
