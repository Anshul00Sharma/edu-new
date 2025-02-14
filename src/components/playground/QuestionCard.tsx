"use client";

import { CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Question } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onAnswerSelect: (index: number) => void;
  questionTime: number;
  nextQuestionCountdown: number | null;
}

export function QuestionCard({
  question,
  selectedAnswer,
  showExplanation,
  onAnswerSelect,
  questionTime,
  nextQuestionCountdown,
}: QuestionCardProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div className="text-sm text-gray-400">Question</div>
          <div className="text-sm text-gray-400">
            {formatTime(questionTime)}
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {question.text}
          </ReactMarkdown>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedAnswer === null
                ? "bg-gray-800/30 hover:bg-gray-700/30"
                : selectedAnswer === index
                ? index === question.correctAnswer
                  ? "bg-green-500/20 border-2 border-green-500/30"
                  : "bg-red-500/20 border-2 border-red-500/30"
                : index === question.correctAnswer
                ? "bg-green-500/20 border-2 border-green-500/30"
                : "bg-gray-800/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedAnswer !== null && (
                <div className="mt-1">
                  {index === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : selectedAnswer === index ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : null}
                </div>
              )}
              <div className="flex-1">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {option}
                </ReactMarkdown>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <div className="text-sm text-gray-400">Explanation</div>
          </div>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {question.explanation.correct}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Next Question Countdown */}
      {nextQuestionCountdown !== null && (
        <div className="text-center text-sm text-gray-400">
          Next question in {nextQuestionCountdown}s...
        </div>
      )}
    </div>
  );
}
