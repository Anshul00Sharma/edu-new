"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "../shared/SearchBar";
import { LoadingAnimation } from "../shared/LoadingAnimation";
import { useUserContext } from "@/context/UserContext";
// import {
//   Trophy,
//   Timer,
//   Target,
//   Award,
//   Pause,
//   Play,
//   CheckCircle,
//   XCircle,
//   Lightbulb,
// } from "lucide-react";
import { Question } from "@/types";
import { apiClient } from "@/lib/client/apiClient";
import { StatsBar } from "./StatsBar";
import { QuestionCard } from "./QuestionCard";

interface Stats {
  questions: number;
  accuracy: number;
  streak: number;
  bestStreak: number;
  avgTime: number;
}

// interface TopicProgress {
//   totalAttempts: number;
//   successRate: number;
//   averageTime: number;
//   lastLevel: number;
//   masteryScore: number;
// }

export default function PlaygroundView() {
  const { userContext } = useUserContext();
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionTime, setCurrentQuestionTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [nextQuestionCountdown, setNextQuestionCountdown] = useState<
    number | null
  >(null);

  // const [sessionStats, setSessionStats] = useState({
  //   totalQuestions: 0,
  //   sessionLimit: 25,
  //   isSessionComplete: false,
  // });

  const [stats, setStats] = useState<Stats>({
    questions: 0,
    accuracy: 0,
    streak: 0,
    bestStreak: 0,
    avgTime: 0,
  });

  // const [topicProgress, setTopicProgress] = useState<TopicProgress>(() => {
  //   const saved = localStorage.getItem(`topic-progress-${query}`);
  //   return saved
  //     ? JSON.parse(saved)
  //     : {
  //         totalAttempts: 0,
  //         successRate: 0,
  //         averageTime: 0,
  //         lastLevel: 1,
  //         masteryScore: 0,
  //       };
  // });

  const startQuestionTimer = (): void => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const interval = setInterval(() => {
      setCurrentQuestionTime((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopQuestionTimer = (): void => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      setIsInitialLoading(true);
      setQuery(searchQuery);
      const response = await apiClient.getQuestion(searchQuery, userContext!);
      setCurrentQuestion(response);
      startQuestionTimer();
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    stopQuestionTimer();
    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === currentQuestion.correctAnswer;

    // Update stats
    setStats((prev) => {
      const newStats = {
        questions: prev.questions + 1,
        accuracy:
          (prev.accuracy * prev.questions + (isCorrect ? 100 : 0)) /
          (prev.questions + 1),
        streak: isCorrect ? prev.streak + 1 : 0,
        bestStreak: isCorrect
          ? Math.max(prev.streak + 1, prev.bestStreak)
          : prev.bestStreak,
        avgTime:
          (prev.avgTime * prev.questions + currentQuestionTime) /
          (prev.questions + 1),
      };
      return newStats;
    });

    // Start countdown for next question
    const countdown = setTimeout(() => {
      handleNextQuestion();
    }, 5000);

    setNextQuestionCountdown(5);
    const countdownInterval = setInterval(() => {
      setNextQuestionCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => {
      clearTimeout(countdown);
      clearInterval(countdownInterval);
    };
  };

  const handleNextQuestion = async () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestionTime(0);
    setNextQuestionCountdown(null);

    try {
      const response = await apiClient.getQuestion(query, userContext!);
      setCurrentQuestion(response);
      startQuestionTimer();
    } catch (error) {
      console.error("Error fetching next question:", error);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (isPaused) {
      startQuestionTimer();
    } else {
      stopQuestionTimer();
    }
  };

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return (
    <div className="min-h-screen bg-[#0c1222] text-white flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Practice Mode
          </h1>
          <p className="text-gray-400">
            Test your knowledge with interactive questions
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {isInitialLoading ? (
          <LoadingAnimation />
        ) : currentQuestion ? (
          <div className="space-y-8">
            <StatsBar
              stats={stats}
              isPaused={isPaused}
              onPauseToggle={togglePause}
            />
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              onAnswerSelect={handleAnswerSelect}
              questionTime={currentQuestionTime}
              nextQuestionCountdown={nextQuestionCountdown}
            />
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12">
            Enter a topic to start practicing
          </div>
        )}
      </div>
    </div>
  );
}
