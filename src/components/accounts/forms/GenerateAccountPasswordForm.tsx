import type React from "react";
import AccountTab from "./AccountTab";
interface DialogProps {
  isOpen: boolean;
  onClose: () => Promise<void>;
  title?: string;
}

export const GenerateAccountPasswordForm: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;
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
          <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
          <div className="mb-4">
            <div>
              <AccountTab closeForm={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
