"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useChatContext } from "@/context/ChatContext";
import { SearchBar } from "./shared/SearchBar";
import { Message } from "@/types";
import { apiClient } from "@/lib/client/apiClient";
import { Header } from "./explore/Header";
import { ExampleSuggestions } from "./explore/ExampleSuggestions";
import { MessageList } from "./explore/MessageList";
import { cn } from "@/lib/utils";
import { WarningBanner } from "./shared/WarningBanner";

interface APIError {
  status: number;
  message: string;
}

export default function ExploreView() {
  const { userContext } = useUserContext();
  const { currentSession, addMessage, createNewSession } = useChatContext();
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialMessage, setHasInitialMessage] = useState(false);
  const [rateLimitWarning, setRateLimitWarning] = useState<string | null>(
    "Rate limit exceeded. Please try again later. "
  );

  useEffect(() => {
    if (currentSession?.messages.length) {
      setHasInitialMessage(true);
    } else {
      setHasInitialMessage(false);
    }
  }, [currentSession]);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);

      // Create new session if none exists
      if (!currentSession) {
        createNewSession(query);
      }

      // Add user message
      const userMessage: Message = { type: "user", content: query };
      addMessage(userMessage);

      // Get all messages except the last one (which we just added)
      const previousMessages = currentSession?.messages || [];

      const response = await apiClient.explore(
        query,
        userContext!,
        previousMessages
      );

      // Add AI response
      const aiMessage: Message = {
        type: "ai",
        content: response.content,
        topics: response.topics,
        questions: response.questions,
      };
      addMessage(aiMessage);
      setHasInitialMessage(true);
    } catch (error) {
      console.error("Search error:", error);

      // Check if error is an APIError
      const apiError = error as APIError;
      if (apiError.status === 429) {
        setRateLimitWarning(
          apiError.message || "Rate limit exceeded. Please try again later."
        );
      } else {
        addMessage({
          type: "ai",
          content:
            "Sorry, I encountered an error while processing your request. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh)] bg-[#0F172A]">
      {rateLimitWarning && (
        <WarningBanner
          message={rateLimitWarning}
          onClose={() => setRateLimitWarning(null)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className={cn(
            "transition-all duration-500 ease-in-out",
            hasInitialMessage
              ? "opacity-0 -translate-y-full h-0"
              : "opacity-100 translate-y-0"
          )}
        >
          <div className="max-w-3xl mx-auto px-4 py-8">
            {!currentSession?.messages.length && !isLoading && (
              <>
                <Header title="What do you want to explore?" />
                <ExampleSuggestions onSearch={handleSearch} />
              </>
            )}
          </div>
        </div>

        {/* Messages */}
        <div
          className={cn(
            "max-w-3xl mx-auto px-4 overflow-y-auto mt-4 custom-scrollbar",
            hasInitialMessage ? "h-[calc(100vh-8rem)]" : "h-0"
          )}
        >
          <MessageList
            messages={currentSession?.messages || []}
            isLoading={isLoading}
            onTopicClick={handleSearch}
            onQuestionClick={handleSearch}
          />
        </div>

        {/* Search Bar - Fixed at bottom when has messages */}
        <div
          className={cn(
            "w-full max-w-3xl mx-auto px-4 transition-all duration-500 ease-in-out mb-10",
            hasInitialMessage ? "fixed bottom-8 left-1/2 -translate-x-1/2" : ""
          )}
        >
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
