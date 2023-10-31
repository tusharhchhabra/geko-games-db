import { useRouter } from "next/router";

function PlatformID() {
  const router = useRouter();
  const { id } = router.query;

  return <p className="text-red-500 text-2xl">{id}</p>;
}

export default PlatformID;
