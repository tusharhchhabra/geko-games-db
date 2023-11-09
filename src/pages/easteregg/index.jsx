import Link from "next/link";

const Game = () => {
  return (
    <div>
      <Link href={'easteregg/game'}>
        <img src="/assets/HomeScreen.png" alt="Home Screen" className="fade-in" />
      </Link>
    </div>
  );
};

export default Game;
