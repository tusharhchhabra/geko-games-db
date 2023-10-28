import fetchData from "@/helpers/fetchData";
import { useEffect, useState } from "react";

function GamesList() {
  const [json, setJson] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const games = await fetchData();
      console.log(games);
      if (games && games.length > 0) setJson(games);
    };

    fetch();
  }, []);

  return (
    <div>
      {json.length > 0 && json.map((game) => <p key={game.id}>{game.name}</p>)}
    </div>
  );
}

export default GamesList;
