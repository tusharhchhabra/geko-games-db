import { useScrollPosition } from "@/hooks/useScrollPosition";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const { openModal, user, logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-20 w-full bg-transparent transition-colors duration-300 ${
        scrollPosition > 0
          ? "border-b-[0.5px] border-gray-700 bg-slate-900/[0.4] backdrop-blur-lg"
          : "border-gray-800"
      }`}
    >
      <div className="mx-auto flex max-w-full flex-wrap items-baseline justify-between px-6 py-2">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            geko
          </span>
        </Link>
        <div className="flex">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-transparent p-2 text-sm text-white hover:bg-slate-800/[0.1] focus:outline-none focus:ring-1 focus:ring-slate-700 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between md:mr-auto md:ml-8 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-slate-100 p-4 font-normal md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 ">
            <li>
              <Link
                href="/platforms"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-slate-100 md:p-0 md:hover:bg-transparent md:hover:text-violet-500"
              >
                Browse by Platform
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-slate-100 md:p-0 md:hover:bg-transparent md:hover:text-violet-500"
              >
                Advanced Search
              </Link>
            </li>
          </ul>
        </div>
        <SearchBar />
        {user ? (
          <button onClick={handleLogoutClick}>Log Out</button>
        ) : (
          <button
            type="button"
            onClick={openModal}
            className="btn btn-secondary bg-white/90"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
