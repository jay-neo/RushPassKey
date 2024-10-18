import { useLocation } from "react-router-dom";
import { useAccounts } from "src/lib/accounts/AccountsContext";
import { AccountPreview } from "./AccountPreview";

export const AccountsList = () => {
  const { accounts } = useAccounts();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentTopic = searchParams.get("topic") || "All";
  const currentQuery = searchParams.get("query");

  let filteredAccounts: AccountClient[] = [];

  if (currentQuery) {
    filteredAccounts = accounts.filter((account) => {
      switch (currentTopic) {
        case "Website":
          return account.website_url.toLowerCase().includes(currentQuery);
        case "Email":
          return account.email.toLowerCase().includes(currentQuery);
        case "Username":
          return account.username.toLowerCase().includes(currentQuery);
        case "Phone":
          return account.phone.toLowerCase().includes(currentQuery);
        case "All":
        default:
          return (
            account.account_name.toLowerCase().includes(currentQuery) ||
            account.website_url.toLowerCase().includes(currentQuery) ||
            account.email.toLowerCase().includes(currentQuery) ||
            account.username.toLowerCase().includes(currentQuery) ||
            account.phone.toLowerCase().includes(currentQuery)
          );
      }
    });
  } else if (!currentQuery && currentTopic) {
    filteredAccounts = accounts.filter((account) => {
      switch (currentTopic) {
        case "Website":
          return account.website_url && account.website_url.trim() !== "";
        case "Email":
          return account.email && account.email.trim() !== "";
        case "Username":
          return account.username && account.username.trim() !== "";
        case "Phone":
          return account.phone && account.phone.trim() !== "";
        case "All":
        default:
          return (
            (account.account_name && account.account_name.trim() !== "") ||
            (account.website_url && account.website_url.trim() !== "") ||
            (account.email && account.email.trim() !== "") ||
            (account.username && account.username.trim() !== "") ||
            (account.phone && account.phone.trim() !== "")
          );
      }
    });
  } else {
    filteredAccounts = accounts;
  }

  return (
    <>
      {filteredAccounts?.length > 0 ? (
        filteredAccounts.map((account, index) => (
          <AccountPreview
            key={index}
            id={account?.id}
            account_name={account?.account_name}
            website_url={account?.website_url}
            last_updated={account.last_updated}
            last_used={account?.last_used}
            username={account?.username}
            email={account?.email}
            phone={account?.phone}
          />
        ))
      ) : (
        <div className="flex  justify-center">
          <p className="font-bold text-2xl font-serif">No accounts found</p>
        </div>
      )}
    </>
  );
};
