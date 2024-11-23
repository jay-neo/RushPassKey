export const Loader = () => {
  return (
    <span className="animate-spin rounded-full h-4 w-4 border-b-2 ml-1"></span>
  );
};

export const Loader2 = () => {
  return (
    <div
      className="ml-1 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent motion-reduce:animate-[spin_1.4s_linear_infinite]"
      role="status"
    ></div>
  );
};
