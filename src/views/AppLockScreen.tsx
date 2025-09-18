import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Dialog from "../components/ui/Dialog";
import { toast } from "sonner";
import { Loader } from "src/components/ui/Loader";

export const AppLockScreen: React.FC<{
  confirmPassword: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ confirmPassword }) => {
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [unlockingStatus, setUnlockingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  useEffect(() => {
    const inputElement = document.getElementById("password");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result: string = await invoke<string>("check_new_user");
        console.log("check_new_user result:", result);
        if (result && typeof result == "string") {
          setNewUserPassword(result);
          setShowPasswordModal(true);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    })();
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockingStatus(true);
    try {
      const success: boolean = await invoke<boolean>("verify_user", {
        password,
      });
      if (success) {
        confirmPassword(password);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
    setUnlockingStatus(false);
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(newUserPassword);
      toast.success("Password copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy password");
      console.error("Failed to copy password:", err);
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setNewUserPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Dialog
        isOpen={showPasswordModal}
        onClose={handleClosePasswordModal}
        title="Welcome! Here's Your Password"
      >
        <div className="text-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-600 mb-2">
              Please save this password securely:
            </p>
            <div className="bg-white p-3 rounded border-2 border-indigo-200 font-mono text-lg break-all">
              {newUserPassword}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCopyPassword}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Copy Password
            </button>

            <button
              onClick={handleClosePasswordModal}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              I've Saved My Password
            </button>
          </div>

          <p className="text-xs text-gray-500">
            ⚠️ This password will only be shown once. Make sure to save it
            somewhere safe!
          </p>
        </div>
      </Dialog>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>
        <h2 className="mt-2 text-2xl font-semibold mb-4">Enter your key</h2>
        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={unlockingStatus}
            className={`w-full text-white py-2 rounded-lg ${
              unlockingStatus
                ? `bg-indigo-800`
                : `bg-indigo-600 hover:bg-indigo-700 transition duration-300`
            }`}
          >
            {unlockingStatus ? (
              <div className="flex items-center justify-center text-white">
                Unlocking
                <Loader />
              </div>
            ) : (
              "Unlock"
            )}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
};
