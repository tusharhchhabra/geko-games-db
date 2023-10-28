import { useRouter } from "next/router";

function GameID() {
  const router = useRouter();
  const { id } = router.query;

  return <p className="text-red-500 text-2xl">{id}</p>;
}

export default GameID;
