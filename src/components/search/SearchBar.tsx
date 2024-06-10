import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearch(term: string) {
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }

  return (
    <>
      <div className="flex-shrink-0 inline-flex items-center pl-4 pr-2 text-sm font-medium text-center rounded-l-3xl bg-stone-600/50">
        <div className="">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </div>
      </div>

      <div className="relative w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          id="search-dropdown"
          className="focus-visible:outline-none focus-visible:ring-0 block p-3 w-full truncate z-20 a rounded-r-lg bg-stone-600/50 text-teal-900 font-semibold placeholder:text-black placeholder:italic placeholder:font-thin"
          placeholder="Search your passwords"
          autoComplete="off"
          defaultValue={location.search.match("query")?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
    </>
  );
};
