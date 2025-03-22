import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex bg-slate-300 items-center rounded-lg px-3">
      <svg
        className="w-5 h-5 text-gray-400 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M12.9 14.32a8 8 0 111.414-1.414l4.348 4.348a1 1 0 01-1.414 1.414l-4.348-4.348zM8 14a6 6 0 100-12 6 6 0 000 12z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="bg-slate-300 w-full ml-2 outline-none"
      />
      <button type="submit" className="text-primary font-bold bg-slate-300 items-center rounded-lg p-3 ml-3">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
