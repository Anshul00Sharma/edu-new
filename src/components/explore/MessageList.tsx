"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { LoadingAnimation } from "../shared/LoadingAnimation";
import { RelatedTopics } from "../RelatedTopics";
import { RelatedQuestions } from "../RelatedQuestions";
import { Message, MarkdownComponentProps } from "@/types";

import { User } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onTopicClick: (topic: string) => void;
  onQuestionClick: (question: string) => void;
}

const MarkdownComponents: Record<string, React.FC<MarkdownComponentProps>> = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-xl sm:text-2xl font-bold text-gray-100 mt-4 mb-2"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-lg sm:text-xl font-semibold text-gray-100 mt-3 mb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-base sm:text-lg font-medium text-gray-200 mt-2 mb-1"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-sm sm:text-base text-gray-300 my-1.5 leading-relaxed break-words"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside my-2 text-gray-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside my-2 text-gray-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="my-1 text-gray-300" {...props}>
      {children}
    </li>
  ),
  code: ({ children, inline, ...props }) =>
    inline ? (
      <code
        className="px-1 py-0.5 bg-gray-700/50 rounded text-gray-200"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className="block p-4 bg-gray-700/50 rounded-lg text-gray-200 overflow-x-auto"
        {...props}
      >
        {children}
      </code>
    ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="pl-4 border-l-4 border-gray-600 text-gray-400 italic my-2"
      {...props}
    >
      {children}
    </blockquote>
  ),
};

export function MessageList({
  messages,
  isLoading,
  onTopicClick,
  onQuestionClick,
}: MessageListProps) {
  return (
    <div className="space-y-8">
      {messages.map((message, index) => (
        <div
          key={index}
          className="space-y-4 animate-[fadeIn_0.5s_ease-in-out]"
        >
          {message.type === "user" ? (
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-gray-300 flex-1 mt-1">{message.content}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {message.content && (
                <div className="bg-gray-800/50 p-4 rounded-lg prose prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={MarkdownComponents}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
              {message.topics && (
                <RelatedTopics
                  topics={message.topics}
                  onTopicClick={onTopicClick}
                />
              )}
              {message.questions && (
                <RelatedQuestions
                  questions={message.questions}
                  onQuestionClick={onQuestionClick}
                />
              )}
            </div>
          )}
        </div>
      ))}

      {isLoading && <LoadingAnimation />}
    </div>
  );
}
