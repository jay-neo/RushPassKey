import { toast } from "sonner";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { extractBaseDomain } from "src/lib/utils";
import { useAccounts } from "src/lib/accounts/AccountsContext";
import { PasswordSettingInnerForm } from "./PasswordSettingInnerForm";

const AccountForm = ({ closeForm }: { closeForm: () => Promise<void> }) => {
  const { setAccounts } = useAccounts();
  const [generatingStatus, setGeneratingStatus] = useState<boolean>(false);
  const [formData, setFormData] = useState<AccountServer>({
    account_name: "",
    website_url: "",
    email: "",
    username: "",
    phone: "",
    alphabet: true,
    number: true,
    symbols: true,
    casing_enabled: true,
    casing: "small",
    min_password_value: 12,
    max_password_value: 16,
  });

  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "website_url"
          ? extractBaseDomain(value)
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.phone && !formData.username) {
      toast.warning(
        "Please fill at least one of the fields: Email, Phone, or Username."
      );
      return;
    }
    setGeneratingStatus(true);
    try {
      const newAccount = await invoke<AccountClient>("new_account", {
        data: formData,
      });
      if (newAccount) {
        setAccounts((prevAccounts) => [newAccount, ...prevAccounts]);
        await closeForm();
        toast.success("Password saved successfully!");
      } else {
        toast.error("Failed to save password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error! We couldn't process your request.");
    }
    setGeneratingStatus(false);
  };

  return (
    <form className="space-y-4 mt-5" onSubmit={formSubmit}>
      <div>
        <label className="block font-semibold text-amber-900">
          Account Name
        </label>
        <input
          type="text"
          name="account_name"
          value={formData.account_name}
          onChange={handleInputChange}
          className="w-full p-2 border border-fuchsia-500/60 rounded-lg"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
      <div>
        <label className="block font-semibold text-amber-900">
          Website URL
        </label>
        <input
          type="text"
          name="website_url"
          value={formData.website_url}
          onChange={handleInputChange}
          className="w-full p-2 border border-fuchsia-500/60 rounded-lg"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
      <div>
        <label className="block font-semibold text-amber-900">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-fuchsia-500/60 rounded-lg"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
      <div>
        <label className="block font-semibold text-amber-900">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full p-2 border border-fuchsia-500/60 rounded-lg"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
      <div>
        <label className="block font-semibold text-amber-900">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border border-fuchsia-500/60 rounded-lg"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      <div className="mt-4">
        <div
          className="block text-blue-600 cursor-pointer items-center"
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          <input
            type="checkbox"
            name="password_settings"
            onChange={() => setShowAdvancedOptions(!showAdvancedOptions)}
            checked={!showAdvancedOptions}
            className="accent-blue-300 cursor-pointer mr-2"
          />
          <span className="font-bold">Default Password Settings</span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showAdvancedOptions ? "max-h-screen" : "max-h-0"
          }`}
        >
          <PasswordSettingInnerForm
            formData={formData}
            setFormData={setFormData as React.Dispatch<React.SetStateAction<AccountPassConfig>>}
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={generatingStatus}
          className={`mt-6 p-2 w-32 text-white rounded-full ${
            generatingStatus ? `bg-purple-700` : `bg-purple-500`
          }`}
        >
          {generatingStatus ? (
            <span>
              Generating
              <span className="ellipsis" />
            </span>
          ) : (
            "Generate"
          )}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
