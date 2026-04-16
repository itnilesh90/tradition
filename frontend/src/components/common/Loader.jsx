const Loader = ({ message = "Loading...", label }) => {
  const text = label || message;
  return (
    <div className="flex min-h-[160px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
        <p className="mt-3 text-sm text-stone-600">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
