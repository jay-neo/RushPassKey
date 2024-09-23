import { useState } from "react";
import Search from "src/components/search";
import { invoke } from "@tauri-apps/api/core";
import AccountPreview from "src/components/ui/AccountPreview";

export default () => {
  const [accounts, setAccounts] = useState<Array<AccountClient>>([]);

  async function fetchAccounts() {
    try {
      const accountsJson = await invoke<string>("get_all_accounts");
      const accountsData = JSON.parse(accountsJson);
      console.log(accountsData);
      setAccounts(accountsData);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }

  async function initAccounts() {
    try {
      const res = await invoke<string>("verify_user");
      console.log(res);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }

  return (
    <div className={`flex-1 lg:mt-2xl transition-all duration-300 mt-3`}>
      <Search />
      <div className="mt-4 p-4 max-w-[80rem] relactive w-full md:mx-auto">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={fetchAccounts}
            className="p-2 bg-red-300 rounded-md"
          >
            Fetch Accounts
          </button>
          <button
            type="button"
            onClick={initAccounts}
            className="p-2 bg-green-300 rounded-md"
          >
            Init Accounts into Cache
          </button>
        </div>
        {accounts?.length > 0 ? (
          accounts.map((account, index) => (
            <AccountPreview
              key={index}
              account_name={account?.account_name}
              website_url={account?.website_url}
              last_updated={new Date()}
              username={account?.username}
              email={account?.email}
              password={account?.password}
              phone={account?.phone}
            />
          ))
        ) : (
          <p>No accounts available</p>
        )}
      </div>
    </div>
  );
};
