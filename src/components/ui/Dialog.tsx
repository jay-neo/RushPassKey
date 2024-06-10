import React, { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

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
          <div className="mb-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
