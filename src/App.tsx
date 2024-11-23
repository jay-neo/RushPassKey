import { useState } from "react";
import { MainPage } from "src/views/MainPage";
import { AppLockScreen } from "./views/AppLockScreen";
import { AccountsProvider } from "./lib/accounts/AccountsContext";
import { Toaster } from "./lib/sonner";

export default () => {
  const [password, setPassword] = useState<null | string>(null);

  if (!password) {
    return (
      <>
        <AppLockScreen confirmPassword={setPassword} />
        <Toaster />
      </>
    );
  } else if (password) {
    return (
      <AccountsProvider>
        <MainPage password={password} setPassword={setPassword} />
        <Toaster />
      </AccountsProvider>
    );
  }
};
