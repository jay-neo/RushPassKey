import React, { useState } from "react";
import { toast } from "sonner";
import { invoke } from "@tauri-apps/api/core";
import { RegenerateAccountPasswordForm } from "./forms/RegenerateAccountPasswordForm";
import { writeText } from '@tauri-apps/plugin-clipboard-manager';

export const AccountPreview: React.FC<AccountClient> = ({
  id,
  account_name,
  website_url,
  username,
  phone,
  email,
  last_used,
  last_updated,
}) => {
  const [lastUsedState, setLastUsedState] = useState(last_used);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const closeUpdateForm = async () => setIsUpdateFormOpen(false);

  const copyToClipboard = async () => {
    try {
      const {password, last_used: lastUsed} = await invoke<PasswordResult>("copy_account_password", {
        id,
      });
      if (password) {
        // navigator.clipboard
        //   .writeText(password)
        //   .then(() => {
        //     toast.success("Password copied to clipboard!");
        //   })
        //   .catch((err) => {
        //     console.error("Failed to copy password: ", err);
        //     toast.error("Failed to copy password!");
        //   });
        await writeText(password);
        setLastUsedState(lastUsed);
        toast.success('Password copied to clipboard!');
      } else {
        toast.error("Failed to copy password.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      console.error("Error:", error?.message);
      toast.error("Error! We couldn't process your request.");
    }
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row items-center my-3 justify-between p-5 bg-green-100 border-dotted border-black border-2 rounded-lg">
        <button
          className="absolute top-2 right-2 text-white px-2 py-1 rounded hover:bg-yellow-500/40"
          onClick={() => setIsUpdateFormOpen(true)}
        >
          <img src="update.svg" alt="Update" />
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-8 w-full">
          <div className="flex items-center space-x-4 w-full md:w-4/12">
            <div className="bg-blue-200 border-black border-2 rounded-full px-7 py-5">
              <span className="text-2xl font-bold">
                {account_name.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col md:flex-wrap w-8/12">
              <span className="text-3xl font-bold truncate w-full">
                {account_name}
              </span>
              <a
                href={`https://${website_url}`}
                target="_blank"
                className="text-blue-600 font-serif italic subpixel-antialiased truncate w-full"
              >
                {website_url}
              </a>
            </div>
          </div>

          <div className="hidden md:block md:border-l-2 md:border-black h-16 mx-1" />

          <div className="w-full md:w-3/12">
            <p className="font-bold truncate w-full">
              {"Last Updated: "}
              <span className="font-normal font-mono">{last_updated}</span>
            </p>
            <p className="font-bold truncate w-full">
              {"Last Used: "}
              <span className="font-normal font-mono">{lastUsedState}</span>
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
            <button
              className="text-blue-600 hover:underline hover:shadow-sm truncate text-right w-full"
              type="button"
              onClick={copyToClipboard}
            >
              Click to copy password
            </button>
          </div>
        </div>
      </div>
      <RegenerateAccountPasswordForm
        onClose={closeUpdateForm}
        isOpen={isUpdateFormOpen}
        id={id}
        header={
          <div>
            <div>
              <span className="text-2xl font-semibold mr-2">Account Name:</span>
              <span className="text-2xl font-bold text-lime-600">
                {account_name}
              </span>
            </div>
            <span className="text-xl font-semibold text-lime-500"></span>
            <span className="text-xl font-semibold"></span>
            {email && <div>Email: {email}</div>}
            {username && <div>Username: {username}</div>}
            {phone && <div>Phone: {phone}</div>}
          </div>
        }
      />
    </>
  );
};
