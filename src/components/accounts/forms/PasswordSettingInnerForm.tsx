import MultiRangeSlider from "multi-range-slider-react";

export const PasswordSettingInnerForm = ({
  formData,
  setFormData,
}: {
  formData: typeof AccountPassConfig;
  setFormData: React.Dispatch<React.SetStateAction<typeof AccountPassConfig>>;
}) => {
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
      min_password_value: e.minValue,
      max_password_value: e.maxValue,
    });
  };

  return (
    <div>
      <div>
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
              minValue={formData.min_password_value}
              maxValue={formData.max_password_value}
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
            <span>Minimum Length: {formData.min_password_value}</span>
            <span>Maximum Length: {formData.max_password_value}</span>
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
                name="casing_enabled"
                checked={formData.casing_enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    casing_enabled: e.target.checked,
                  })
                }
                className={`mr-2 accent-lime-300 cursor-pointer`}
              />
              <span
                className={`font-semibold ${
                  formData.casing_enabled ? "text-lime-700" : ""
                }`}
              >
                All Casing
              </span>
            </div>
            <div
              className={`ml-6 mt-1 ${
                formData.casing_enabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center mt-1">
                <input
                  type="radio"
                  name="casing"
                  value="small"
                  checked={formData.casing === "small"}
                  onChange={handleCasingChange}
                  disabled={formData.casing_enabled}
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
                  disabled={formData.casing_enabled}
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
  );
};
