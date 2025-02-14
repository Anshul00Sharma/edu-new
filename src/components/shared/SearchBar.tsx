"use client";

import { useState, KeyboardEvent } from "react";
import { Loader2, Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (value.trim() && !isLoading) {
      onSearch(value.trim());
      setValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full group">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${
          isFocused ? "opacity-75" : ""
        }`}
      />
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter what you want to explore..."
          className="w-full px-6 py-4 bg-gray-900/90 backdrop-blur-sm text-gray-100 rounded-xl border border-gray-700/50 focus:outline-none focus:border-blue-500/50 transition-all duration-300 placeholder:text-gray-500"
          autoComplete="off"
          spellCheck="false"
          disabled={isLoading}
        />
        {isLoading ? (
          <div className="px-4 absolute right-3 py-2 rounded-lg transition-all duration-300 bg-gray-800 text-gray-600 cursor-not-allowed">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className={`absolute right-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              value.trim()
                ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white opacity-90 hover:opacity-100"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
