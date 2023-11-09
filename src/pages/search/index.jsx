import AdvancedSearchTabGroup from "@/components/AdvancedSearchTabGroup";
import SearchedGamesList from "@/components/SearchedGamesList";
import fetchData from "@/helpers/fetchData";
import queries from "@/helpers/queryStrings";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

const AdvancedSearchPage = (props) => {
  const router = useRouter();

  const [searchParams, setSearchParams] = useState({
    name: "",
    genres: [],
    themes: [],
    platforms: [],
    modes: [],
    fromDate: "",
    toDate: "",
    developers: [],
    publishers: [],
    limit: 30,
    offset: 0,
  });

  const [selectedTab, setSelectedTab] = useState("Genre");

  const [searchResults, setSearchResults] = useState([]);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchParams = useDebounce(searchParams, 400);

  useEffect(() => {
    const handleSearch = async (params) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/advanced-search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchParams: params }),
        });
        router.replace(
          {
            pathname: "/search",
            query: debouncedSearchParams,
          },
          undefined,
          { shallow: true }
        );
        const data = await response.json();
        setSearchResults(data.games);
      } catch (error) {
        console.error("Error fetching games", error);
      }
    };
    setIsLoading(false);
    setError(null);

    if (isMounted.current) {
      handleSearch(debouncedSearchParams);
    } else {
      isMounted.current = true;
    }
  }, [debouncedSearchParams]);

  useEffect(() => {
    if (router.isReady) {
      const queryFilters = router.query;

      let paramsCopy = { ...searchParams };

      Object.keys(searchParams).forEach((key) => {
        if (queryFilters[key]) {
          if (["themes", "modes", "genres", "platforms"].includes(key)) {
            paramsCopy[key] = Array.isArray(queryFilters[key])
              ? queryFilters[key].map((val) => parseInt(val))
              : [parseInt(queryFilters[key])];
          } else {
            paramsCopy[key] = queryFilters[key];
          }
        }
      });

      setSearchParams(paramsCopy);
    }
  }, []);

  return (
    <div className="mt-10 mb-20 max-w-4xl w-full px-6 xl:px-0">
      <p className="text-2xl sm:text-4xl font-semibold tracking-tight">
        Advanced Search
      </p>
      <div className="">
        <AdvancedSearchTabGroup
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          params={searchParams}
          setParams={setSearchParams}
          options={props}
        />
        <div className="-mt-4 sm:mt-0">
          <SearchedGamesList games={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;

export async function getServerSideProps() {
  const [genresPromise, themesPromise, modesPromise, platformsPromise] =
    await Promise.allSettled([
      fetchData(queries.genresForSearch, "genres"),
      fetchData(queries.themesForSearch, "themes"),
      fetchData(queries.modesForSearch, "game_modes"),
      fetchData(queries.platforms, "platforms"),
    ]);

  const [genres, themes, modes, platforms] = [
    genresPromise.value,
    themesPromise.value,
    modesPromise.value,
    platformsPromise.value,
  ];

  return { props: { genres, themes, modes, platforms } };
}
