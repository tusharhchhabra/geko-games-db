import Link from "next/link";

const EasterEgg = () => {
  return (
    <div>
      <h2 className="text-violet-500 font-bold p-2 ml-10 mt-5 text-4xl [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-black ">
        Easter 🥚
      </h2>

      <div className="w-[440px] h-[352px] absolute bottom-[-200px] left-[-91px] mt-9 rounded-xl">
        <Link href={"/easteregg"}>
          <img src="/assets/whackaBug.png" alt="Game Cover" />
        </Link>
      </div>
    </div>
  );
};

export default EasterEgg;
