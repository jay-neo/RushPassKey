import { useState } from "react";
import { GenerateAccountPasswordForm } from "src/components/accounts/forms/GenerateAccountPasswordForm";

const Test = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = async () => setIsDialogOpen(false);

  return (
    <div className="">
      <button
        type="button"
        className="flex flex-row px-4 py-2.5 text-black font-semibold rounded-lg transition duration-300 bg-amber-400/80 hover:bg-orange-500"
        onClick={() => setIsDialogOpen(true)}
      >
        Generate
      </button>

      <GenerateAccountPasswordForm
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Generate Password"
      />
    </div>
  );
};

export default Test;
