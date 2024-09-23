import { useState } from "react";
import GeneratePasswordForm from "src/components/ui/forms/generate-password/form";

const Test = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="">
      <button
        type="button"
        className="flex flex-row px-4 py-2.5 text-black font-semibold rounded-lg transition duration-300 bg-amber-400/80 hover:bg-orange-500"
        onClick={openDialog}
      >
        {/* <img src="generate.svg" width={32} alt="" /> */}
        Generate
      </button>

      <GeneratePasswordForm
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Generate Password"
      />
    </div>
  );
};

export default Test;
