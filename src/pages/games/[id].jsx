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
  const id = context.query;
  console.log(id);

  // const game = fetchData(queries.game())

  const gameDetails = {};
  return { props: { gameDetails } };
}
