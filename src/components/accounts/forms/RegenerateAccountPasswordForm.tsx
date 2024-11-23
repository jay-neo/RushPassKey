import { toast } from "sonner";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useAccounts } from "src/lib/accounts/AccountsContext";
import { deleteAccount } from "src/lib/accounts/deleteAccount";
import { updateAccount } from "src/lib/accounts/updateAccounts";
import { PasswordSettingInnerForm } from "./PasswordSettingInnerForm";
import { Loader } from "src/components/ui/Loader";

interface DialogProps {
  isOpen: boolean;
  onClose: () => Promise<void>;
  id?: string;
  header?: React.ReactNode;
}

export const RegenerateAccountPasswordForm: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  header,
  id,
}) => {
  if (!isOpen) return null;

  const { accounts, setAccounts } = useAccounts();
  const [generatingStatus, setGeneratingStatus] = useState<boolean>(false);
  const [deletingStatus, setDeletingStatus] = useState<boolean>(false);
  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  const [formData, setFormData] = useState<AccountPassConfig>({
    alphabet: true,
    number: true,
    symbols: true,
    casing_enabled: true,
    casing: "small",
    min_password_value: 12,
    max_password_value: 16,
  });

  const regenerateAccountPasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingStatus(true);
    try {
      const updatedAccount: AccountClient = await invoke<AccountClient>(
        "regenerate_account_password",
        {
          id,
          passwordConfig: formData,
        },
      );
      if (updatedAccount && id) {
        await updateAccount(accounts, setAccounts, id, updatedAccount);
        toast.success("Password regenerated successfully!");
      } else {
        toast.error("Failed to save password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error! We couldn't process your request.");
    }
    await onClose();
    setGeneratingStatus(false);
  };

  const deleteAccountHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeletingStatus(true);

    try {
      const success: boolean = await invoke<boolean>("delete_account", {
        id,
      });

      if (success && id) {
        await deleteAccount(accounts, setAccounts, id);
        await onClose();
        toast.success("Account deleted successfully!");
      } else {
        toast.error("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error! We couldn't process your request.");
    }
    setDeletingStatus(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 md:py-6 bg-black/70">
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-yellow-50 p-5 md:p-10 scrollbar-hide md:rounded-lg shadow-lg w-full h-full max-w-full md:max-w-2xl md:max-h-full md:h-auto overflow-auto">
        <button
          className="absolute top-2 right-5 font-bold text-gray-600 hover:text-gray-900 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="relative mt-2">
          <h2 className="text-center mb-4">{header}</h2>
          <div className="mb-4">
            <div>
              <form
                className="space-y-4 mt-5 border border-blue-600 rounded p-2"
                onSubmit={regenerateAccountPasswordHandler}
              >
                <div
                  className={` my-2 ${
                    showAdvancedOptions ? `` : `flex w-full`
                  }`}
                >
                  <div
                    className={`text-blue-600 cursor-pointer ${
                      showAdvancedOptions
                        ? ""
                        : "flex items-center justify-center w-3/5"
                    }`}
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  >
                    <input
                      type="checkbox"
                      name="password_settings"
                      onChange={() =>
                        setShowAdvancedOptions(!showAdvancedOptions)
                      }
                      checked={!showAdvancedOptions}
                      className="accent-blue-300 cursor-pointer mr-2"
                    />
                    <span className="font-bold">Default Password Settings</span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      showAdvancedOptions ? "max-h-screen" : "max-h-0 w-0"
                    }`}
                  >
                    <PasswordSettingInnerForm
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div
                    className={` ${
                      showAdvancedOptions
                        ? "mt-6 flex items-center justify-center"
                        : ""
                    }`}
                  >
                    <button
                      type="submit"
                      disabled={generatingStatus}
                      className={`md:h-10 py-1 px-3 font-semibold rounded-full ${
                        generatingStatus
                          ? `bg-purple-700`
                          : `text-black hover:text-white bg-purple-500/90 hover:bg-purple-600 transition-all duration-200`
                      }
                    `}
                    >
                      {generatingStatus ? (
                        <div className="flex items-center justify-center text-white">
                          Regenerating
                          <Loader />
                        </div>
                      ) : (
                        <div>Password Regenerate</div>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <form className="mt-4 p-2" onSubmit={deleteAccountHandler}>
                <div className="flex items-center justify-center">
                  <button
                    className={`h-9 px-4 font-semibold rounded-full ${
                      deletingStatus
                        ? `bg-red-600/70 w-36`
                        : `bg-red-400/80 hover:text-white hover:bg-red-500 transition-all duration-200`
                    }`}
                    disabled={deletingStatus}
                  >
                    {deletingStatus ? (
                      <div className="flex items-center justify-center text-white">
                        Deleting
                        <Loader />
                      </div>
                    ) : (
                      "Delete Account"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
