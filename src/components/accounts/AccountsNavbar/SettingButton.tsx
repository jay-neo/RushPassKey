import { useState, useEffect, useRef, MutableRefObject } from "react";

export default () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div className="flex items-center justify-between">
        <button onClick={toggleSidebar} className="p-2 bg-yellow-200 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {isSidebarOpen && (
          <>
            <div
              className="absolute mt-20 w-48  divide-gray-100 rounded shadow bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
              role="menu"
              ref={dropdownRef}
              aria-orientation="vertical"
            >
              <ul className="py-1">
                <li role="menuitem">
                  <button className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white">
                    App Lock
                  </button>
                </li>
                <li role="menuitem">
                  <button className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white">
                    Change Theme
                  </button>
                </li>
                <li role="menuitem">
                  <button className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white">
                    Setting
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};
