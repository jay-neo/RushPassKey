import React from "react";
import AccountTab from "./generate-password/AccountTab";
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const GeneratePasswordForm: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;
  const [tab, seTtab] = React.useState<"Account" | "SSH">("Account");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 md:py-6">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>

      {/* Dialog Container */}
      <div className="relative bg-white p-5 md:p-10 md:rounded-lg shadow-lg w-full h-full max-w-full md:max-w-2xl md:max-h-full md:h-auto overflow-auto">
        {/* Close Button */}
        <button
          className="absolute top-2 right-5 font-bold text-gray-600 hover:text-gray-900 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Dialog Content */}
        <div className="relative mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
          <div className="mb-4">
            <div>
              <div className="">
                <div className=""></div>
                <button
                  onClick={() => seTtab("Account")}
                  className={`w-1/2 p-2 ${
                    tab === "Account" ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  Account
                </button>
                <button
                  onClick={() => seTtab("SSH")}
                  className={`w-1/2 p-2 ${
                    tab === "SSH" ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  SSH
                </button>
              </div>
              {tab === "Account" && <AccountTab closeForm={onClose} />}
              {/* {tab === "SSH" && <SSHTab closeForm={onClose} />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePasswordForm;
