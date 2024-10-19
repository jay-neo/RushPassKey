export const deleteAccount = async (
  accounts: AccountClient[],
  setAccounts: React.Dispatch<React.SetStateAction<AccountClient[]>>,
  id: string
) => {
  const updatedAccounts = accounts.filter((account) => account.id !== id);
  setAccounts(updatedAccounts);
};
