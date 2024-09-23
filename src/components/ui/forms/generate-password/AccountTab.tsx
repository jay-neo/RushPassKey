import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { invoke } from "@tauri-apps/api/core";

const AccountForm = ({ closeForm }: { closeForm: () => void }) => {
  const [formData, setFormData] = useState<AccountServer>({
    accountName: "",
    websiteUrl: "https://",
    email: "",
    username: "",
    phone: "",
    alphabet: true,
    number: true,
    symbols: true,
    casingEnabled: true,
    casing: "small",
    minPasswordValue: 12,
    maxPasswordValue: 16,
  });

  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCasingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      casing: e.target.value as "small" | "capital",
    });
  };

  const handlePasswordLengthChange = (e: {
    minValue: number;
    maxValue: number;
  }) => {
    setFormData({
      ...formData,
      minPasswordValue: e.minValue,
      maxPasswordValue: e.maxValue,
    });
  };
  // const [s, setS] = useState<boolean | null>(null);

  // useEffect(() => {
  //   if (s === true) {
  //     alert("Password saved successfully!");
  //     closeForm();
  //   } else if (s === false) {
  //     alert("Failed to save password.");
  //   }
  // }, [s]);

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.phone && !formData.username) {
      alert(
        "Please fill at least one of the fields: Email, Phone, or Username."
      );
      return;
    }
    try {
      const success = await invoke<boolean>("new_account", {
        data: {
          account_name: formData.accountName,
          website_url: formData.websiteUrl,
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          alphabet: formData.alphabet,
          number: formData.number,
          symbols: formData.symbols,
          casing_enabled: formData.casingEnabled,
          casing: formData.casing,
          min_password_value: formData.minPasswordValue,
          max_password_value: formData.maxPasswordValue,
        },
      });

      if (success) {
        alert("Password saved successfully!");
      } else {
        alert("Failed to save password.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
    closeForm();
  };

  return (
    <form className="space-y-4 mt-5" onSubmit={formSubmit}>
      <div>
        <label className="block font-semibold text-amber-900">
          Account Name
        </label>
        <input
          type="text"
          name="accountName"
          value={formData.accountName}
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
          type="url"
          name="websiteUrl"
          value={formData.websiteUrl}
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
          <span className="font-bold">
            {showAdvancedOptions ? "▼" : ">"} Advanced Options
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showAdvancedOptions ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="mt-6">
            <label className="block font-semibold text-purple-700">
              Password Length
            </label>
            <div className="flex items-center justify-center mt-2 md:w-3/4 w-full mx-auto">
              <MultiRangeSlider
                min={0}
                max={50}
                step={1}
                ruler={false}
                label={true}
                minValue={formData.minPasswordValue}
                maxValue={formData.maxPasswordValue}
                onInput={handlePasswordLengthChange}
                barLeftColor="#ddd"
                barInnerColor="#0ff"
                barRightColor="#ddd"
                thumbLeftColor="#000"
                thumbRightColor="#000"
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-slate-700 text-sm mt-1 md:w-3/4 w-full mx-auto">
              <span>Minimum Length: {formData.minPasswordValue}</span>
              <span>Maximum Length: {formData.maxPasswordValue}</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="sr-only">Character Options</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="alphabet"
                checked={formData.alphabet}
                onChange={handleInputChange}
                className={`mr-2 accent-fuchsia-300 cursor-pointer`}
              />
              <span
                className={`font-semibold ${
                  formData.alphabet ? "text-fuchsia-700" : ""
                }`}
              >
                Alphabet
              </span>
            </div>

            <div className="mt-2">
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="casingEnabled"
                  checked={formData.casingEnabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      casingEnabled: e.target.checked,
                    })
                  }
                  className={`mr-2 accent-lime-300 cursor-pointer`}
                />
                <span
                  className={`font-semibold ${
                    formData.casingEnabled ? "text-lime-700" : ""
                  }`}
                >
                  All Casing
                </span>
              </div>
              <div
                className={`ml-6 mt-1 ${
                  formData.casingEnabled ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center mt-1">
                  <input
                    type="radio"
                    name="casing"
                    value="small"
                    checked={formData.casing === "small"}
                    onChange={handleCasingChange}
                    disabled={formData.casingEnabled}
                    className="mr-2 accent-orange-600 cursor-pointer"
                  />
                  <span
                    className={`mr-1 font-medium ${
                      formData.casing === "small" ? "text-orange-600" : ""
                    }`}
                  >
                    Small
                  </span>
                  <input
                    type="radio"
                    name="casing"
                    value="capital"
                    checked={formData.casing === "capital"}
                    onChange={handleCasingChange}
                    disabled={formData.casingEnabled}
                    className="ml-4 mr-2 accent-emerald-600 cursor-pointer"
                  />
                  <span
                    className={`mr-1 font-medium ${
                      formData.casing === "capital" ? "text-emerald-600" : ""
                    }`}
                  >
                    Capital
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="number"
                checked={formData.number}
                onChange={handleInputChange}
                className="mr-2 accent-pink-300 cursor-pointer"
              />
              <span
                className={`mr-1 font-medium ${
                  formData.number ? "text-pink-600" : ""
                }`}
              >
                Number
              </span>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="symbols"
                checked={formData.symbols}
                onChange={handleInputChange}
                className="mr-2 accent-amber-300 cursor-pointer"
              />
              <span
                className={`mr-1 font-medium ${
                  formData.symbols ? "text-amber-600" : ""
                }`}
              >
                Symbols
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="mt-6 p-2 w-32 bg-purple-500 text-white rounded-full"
          //   onSubmit={closeForm}
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
