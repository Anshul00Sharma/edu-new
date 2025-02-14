"use client";

import { cn } from "@/lib/utils";

interface ExampleSuggestionsProps {
  onSearch: (query: string) => void;
}

export function ExampleSuggestions({ onSearch }: ExampleSuggestionsProps) {
  const suggestions = [
    {
      text: "Quantum Physics",
      icon: "⚛",
      query: "Explain Quantum Physics",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      hoverBg: "hover:bg-purple-500/20",
      border: "border-purple-500/30",
    },
    {
      text: "Machine Learning",
      icon: "🤖",
      query: "What is Machine Learning?",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      hoverBg: "hover:bg-blue-500/20",
      border: "border-blue-500/30",
    },
    {
      text: "World History",
      icon: "🌍",
      query: "Tell me about World History",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      hoverBg: "hover:bg-emerald-500/20",
      border: "border-emerald-500/30",
    },
  ];

  return (
    <div className="mt-8">
      <div className="text-gray-400 text-sm mb-4">Try:</div>
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSearch(suggestion.query)}
            className={cn(
              "px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 border",
              suggestion.bgColor,
              suggestion.border,
              suggestion.hoverBg,
              "text-gray-300 hover:text-white"
            )}
          >
            <span className={cn("text-xl", suggestion.iconColor)}>
              {suggestion.icon}
            </span>
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}
