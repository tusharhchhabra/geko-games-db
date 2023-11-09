import { useScrollPosition } from "@/hooks/useScrollPosition";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const { openModal, user, logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
  };

  const handleWindowResize = () => {
    if (window.innerWidth > 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-20 w-full bg-transparent transition-colors duration-300 ${
        scrollPosition > 0
          ? "border-b-[0.5px] border-gray-700 bg-zinc-900/[0.45] backdrop-blur-lg"
          : "border-gray-800"
      }`}
    >
      <div className="mx-auto flex max-w-full flex-wrap items-baseline justify-between px-6 py-2">
        <Link href="/" className="flex items-center gap-1.5 translate-y-0.5">
          <Image
            src="/logo.png"
            className="w-full h-auto translate-y-0.5"
            width={24}
            height={24}
            alt="logo"
          ></Image>
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            geko
          </span>
        </Link>

        <div className="flex">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 text-xl items-center justify-center rounded-lg bg-transparent p-2 -mr-2 text-white hover:bg-slate-800/[0.1] focus:outline-none md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
          </button>
        </div>
        <div
          className={`${
            isOpen
              ? "block bg-zinc-800 absolute w-full top-14 left-0 pb-8 md:static fade-down"
              : "hidden"
          } w-full md:items-center md:justify-between md:static md:ml-auto md:gap-x-4 md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="mt-2 flex flex-col text-lg md:text-base rounded-lg p-4 font-normal md:mt-0 md:flex-row md:gap-x-4 lg:gap-x-8 xl:gap-x-12 md:border-0 md:p-0 ">
            <li>
              <Link
                href="/platforms"
                className="block rounded-md py-2 pl-3 pr-4 text-white hover:bg-violet-800 md:p-0 md:hover:bg-transparent md:hover:text-violet-500"
              >
                Platforms
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="block rounded-md py-2 pl-3 pr-4 text-white hover:bg-violet-800 md:p-0 md:hover:bg-transparent md:hover:text-violet-500"
              >
                Advanced Search
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href={`/favourites/${user.id}`}
                  className="block rounded-md py-2 pl-3 pr-4 text-white hover:bg-violet-800 md:p-0 md:hover:bg-transparent md:hover:text-violet-500"
                >
                  Favourites
                </Link>
              </li>
            )}
          </ul>
          <div className="px-7 lg:pl-7">
            <SearchBar setNavMenuIsOpen={setIsOpen} />
          </div>
          <div className={`${isOpen ? "mt-6" : "mt-0"} px-7 md:p-0`}>
            {user ? (
              <button onClick={handleLogoutClick}>Log Out</button>
            ) : (
              <button
                type="button"
                onClick={openModal}
                className="btn btn-secondary bg-white/90 self-center"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
