import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import { useRouter } from "next/router";

function GameDetailsPage({ game }) {
  return (
    <div key={game.id}>
      <p className="font-bold text-4xl line-clamp-2">{game.name}</p>
      {game.coverUrl && (
        <img loading="lazy" src={game.coverUrl} alt={game.name} />
      )}
    </div>
  );
}

export default GameDetailsPage;

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id);

  const games = await fetchData(queries.game(id), "games");
  const game = games[0];

  if (games.length === 0) {
    console.log("No games found for this ID!");
    return;
  }

  const covers = await fetchData(queries.coverArtForGame(game), "covers");
  if (covers.length === 0) {
    console.log("No covers found for this game!");
    return;
  }

  const formattedCoverUrl = adjustImageUrl(covers[0].url, "t_cover_big");

  const gameDetails = { ...game, coverUrl: formattedCoverUrl };

  return { props: { game: gameDetails } };
}
