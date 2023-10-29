import adjustImageUrl from "@/helpers/adjustImageUrl";
import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import { useRouter } from "next/router";

function GameID({ gameDetails }) {
  // const router = useRouter();
  // const { id } = router.query;

  return <p className="text-red-500 text-2xl">Game</p>;
}

export default GameID;

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id);

  const games = await fetchData(queries.game(id), "games");
  const game = games[0];

  if (games.length === 0) {
    console.log("No games found for this ID!");
    return;
  }

  const cover = await fetchData(queries.coverArtForGame(game), "covers");

  // const formattedCoverUrl = adjustImageUrl(cover.url, "t_cover_big");

  // console.log(id, game.name, formattedCoverUrl);

  const gameDetails = {};
  return { props: { gameDetails } };
}
