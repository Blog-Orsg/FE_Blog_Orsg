"use client";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch(""); 
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 mb-4 max-w-md mx-auto"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search articles..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="px-2 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;
