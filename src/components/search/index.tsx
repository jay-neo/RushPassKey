import PasswordGenerateButton from "./PasswordGenerateButton";
import SearchBar from "./SearchBar";
import SearchParams from "./SearchParams";

export default () => {

  return (
    <>
    <div className="relative w-full ">
          <div className="mt-1 mx-auto max-w-2xl">
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
