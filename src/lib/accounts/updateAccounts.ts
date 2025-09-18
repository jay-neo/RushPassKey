export const updateAccount = async (
  accounts: AccountClient[],
  setAccounts: React.Dispatch<React.SetStateAction<AccountClient[]>>,
  id: string,
  updatedData: AccountClient,
) => {
  const updatedAccounts = accounts.map((account) => {
    if (account.id === id) {
      return {
        ...account,
        ...updatedData,
      };
    }
    return account;
  });
  setAccounts(updatedAccounts);
};
