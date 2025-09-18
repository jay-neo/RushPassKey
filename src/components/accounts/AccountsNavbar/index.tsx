import { Logo } from "./Logo";

export const Navbar = ({
  setPassword,
}: {
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <>
      <nav className="lg:rounded-b-xl bg-teal-500/50 dark:bg-[#212146] md:border-b md:border-black md:dark:border-black px-5">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-2">
          <Logo />
          <div className="flex items-center md:order-2 space-x-5 dark:invert">
            <button
              type="button"
              className="hover:text-orange-600"
              onClick={() => setPassword(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
