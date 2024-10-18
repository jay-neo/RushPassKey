import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export const AppLockScreen: React.FC<{
  confirmPassword: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ confirmPassword }) => {
  const [password, setPassword] = useState<string>("");
  const [unlockingStatus, setUnlockingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const inputElement = document.getElementById("password");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockingStatus(true);
    try {
      const success: boolean = await invoke<boolean>("verify_user", { password });
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
              <span>
                Unlocking
                <span className="ellipsis" />
              </span>
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
