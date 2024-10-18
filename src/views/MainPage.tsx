import { useEffect } from "react";
import Search from "src/components/accounts/AccountsSearch";
import { invoke } from "@tauri-apps/api/core";
import { Navbar } from "src/components/accounts/AccountsNavbar";
import { useAccounts } from "src/lib/accounts/AccountsContext";
import { AccountsList } from "src/components/accounts/AccountsList";

export const MainPage: React.FC<{
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ password, setPassword }) => {
  const { setAccounts } = useAccounts();

  useEffect(() => {
    (async () => {
      try {
        const accounts = await invoke<AccountClient[]>("get_all_accounts", {
          password,
        });
        setAccounts(accounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="max-w-[80rem] relactive w-full md:mx-auto">
        <Navbar setPassword={setPassword} />
      </div>
      <Search />
      <div className="mt-4 p-4 max-w-[80rem] relactive w-full md:mx-auto">
        <AccountsList />
      </div>
    </div>
  );
};
