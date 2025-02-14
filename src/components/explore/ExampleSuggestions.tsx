"use client";

interface ExampleSuggestionsProps {
  onSearch: (query: string) => void;
}

export function ExampleSuggestions({ onSearch }: ExampleSuggestionsProps) {
  const suggestions = [
    {
      text: "Quantum Physics",
      icon: "⚛",
      query: "Explain Quantum Physics",
      color: "purple"
    },
    {
      text: "Machine Learning",
      icon: "🤖",
      query: "What is Machine Learning?",
      color: "blue"
    },
    {
      text: "World History",
      icon: "🌍",
      query: "Tell me about World History",
      color: "green"
    }
  ];

  return (
    <div className="mt-8">
      <div className="text-gray-400 text-sm mb-4">Try:</div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSearch(suggestion.query)}
            className={`px-4 py-2 rounded-full bg-${suggestion.color}-500/20 
              text-${suggestion.color}-300 hover:bg-${suggestion.color}-500/30 
              transition-colors duration-200 flex items-center gap-2`}
          >
            <span className="text-lg">{suggestion.icon}</span> {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}
