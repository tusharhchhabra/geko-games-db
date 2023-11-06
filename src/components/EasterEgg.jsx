import Link from "next/link";

const EasterEgg = () => {
  const handleClick = () => {};

  return (
    <div className="lg:w-[493px] lg:h-[335px] absolute bottom-[-80px] left-16 mt-9">
      <Link href={'/easteregg'}>
        <img src="/assets/whackaBug.png" alt="Game Cover" />
      </Link>
    </div>
  );
};

export default EasterEgg;
