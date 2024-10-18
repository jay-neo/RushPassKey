import PasswordGenerateButton from "./PasswordGenerateButton";
import SearchBar from "./SearchBar";
import SearchParams from "./SearchParams";

export default () => {
  return (
    <>
      <div className="relative w-full mt-2 p-1">
        <div className="mt-1 mx-auto max-w-4xl">
          <div className="flex overflow-hidden mx-1">
            <SearchBar />
            <div className="pl-2">
              <PasswordGenerateButton />
            </div>
          </div>
        </div>
        <SearchParams />
      </div>
    </>
  );
};
