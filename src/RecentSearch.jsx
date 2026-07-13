const RecentSearch = ({ results }) => {
  return (
    <div className="text-white py-2 text-left px-4 ">
      <h1 className=" text-lg font-bold">Recent Searches</h1>
      <div className="mt-2">
        {results.map((result) => (
          <p className="truncate">{result.question}</p>
        ))}
      </div>
    </div>
  );
};

export default RecentSearch;
