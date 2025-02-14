"use client";

interface RelatedQuestionsProps {
  questions: Array<{
    question: string;
    type: string;
    context: string;
  }>;
  onQuestionClick: (question: string) => void;
}

export function RelatedQuestions({ questions, onQuestionClick }: RelatedQuestionsProps) {
  if (!questions || questions.length === 0) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'curiosity': return '🤔';
      case 'mechanism': return '⚙️';
      case 'causality': return '🔄';
      case 'innovation': return '💡';
      case 'insight': return '✨';
      default: return '•';
    }
  };

  return (
    <div className="mt-6 border-t border-gray-800 pt-3">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Curious to Learn More?</h3>
      <div className="space-y-1">
        {questions.map((item, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(item.question)}
            className="w-full text-left hover:bg-gray-800/50 rounded-lg px-2.5 py-1.5
              transition-all duration-200 group"
            title={item.context}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-500 group-hover:text-primary transition-colors">
                {getTypeIcon(item.type)}
              </span>
              <p className="text-sm text-gray-200 group-hover:text-primary 
                transition-colors flex-1">
                {item.question}
              </p>
              <span className="text-gray-500 group-hover:text-primary transition-colors text-lg">
                +
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
