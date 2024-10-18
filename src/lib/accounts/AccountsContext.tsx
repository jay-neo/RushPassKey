import React, { createContext, useContext, useState } from "react";

const AccountsContext = createContext<{
  accounts: Array<AccountClient>;
  setAccounts: React.Dispatch<React.SetStateAction<Array<AccountClient>>>;
} | null>(null);

export const AccountsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<Array<AccountClient>>([]);
  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountsProvider");
  }
  return context;
};
