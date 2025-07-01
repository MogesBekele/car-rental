const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-40">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-primary text-lg font-semibold">Loading...</span>
    </div>
  );
};

export default Loading;
