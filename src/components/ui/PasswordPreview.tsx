import React from "react";

interface CardProps {
  title: string;
  url: string;
  lastUpdated: string;
  lastUsed: string;
  username?: string;
  phone?: string;
  email?: string;
  password: string;
}

const Card: React.FC<CardProps> = ({
  title,
  url,
  lastUpdated,
  lastUsed,
  username,
  phone,
  email,
  password,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center my-3 justify-between p-5 bg-green-100 border-dotted border-black border-2 rounded-lg">
      <button className="absolute top-2 right-2 text-white px-2 py-1 rounded hover:bg-yellow-500/40">
        <img src="update.svg" alt="Update" />
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-8 w-full">
        <div className="flex items-center space-x-4 w-full md:w-4/12">
          <div className="bg-blue-200 border-black border-2 rounded-full px-7 py-5">
            <span className="text-2xl font-bold">{title.charAt(0)}</span>
          </div>
          <div className="flex flex-col md:flex-wrap w-8/12">
            <span className="text-3xl font-bold truncate w-full">{title}</span>
            <a
              href={`https://${url}`}
              className="text-blue-600 font-serif italic subpixel-antialiased truncate w-full"
            >
              {url}
            </a>
          </div>
        </div>

        <div className="hidden md:block md:border-l-2 md:border-black h-16 mx-1" />

        <div className="w-full md:w-3/12">
          <p className="font-bold truncate w-full">
            {"Last Updated: "}
            <span className="font-normal font-mono">{lastUpdated}</span>
          </p>
          <p className="font-bold truncate w-full">
            {"Last Used: "}
            <span className="font-normal font-mono">{lastUsed}</span>
          </p>
        </div>

        <div className="hidden md:block md:border-l-2 md:border-black h-16 mx-1" />

        <div className="w-full md:w-3/12 md:pr-12">
          {username && (
            <div>
              <button className="text-fuchsia-600 hover:underline hover:shadow-sm truncate text-right w-full">
                {username}
              </button>
            </div>
          )}
          {phone && (
            <div>
              <button className="text-purple-600 hover:underline hover:shadow-sm truncate text-right w-full">
                {phone}
              </button>
            </div>
          )}
          {email && (
            <div>
              <button className="text-pink-600 hover:underline hover:shadow-sm truncate text-right w-full">
                {email}
              </button>
            </div>
          )}
          <button className="text-blue-600 hover:underline hover:shadow-sm truncate text-right w-full">
            Click to copy password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
