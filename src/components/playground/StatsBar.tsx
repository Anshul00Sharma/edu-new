"use client";

import { Trophy, Timer, Target, Award, Pause, Play } from "lucide-react";

interface Stats {
  questions: number;
  accuracy: number;
  streak: number;
  bestStreak: number;
  avgTime: number;
}

interface StatsBarProps {
  stats: Stats;
  isPaused: boolean;
  onPauseToggle: () => void;
}

export function StatsBar({ stats, isPaused, onPauseToggle }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <div>
          <div className="text-sm text-gray-400">Questions</div>
          <div className="text-lg font-semibold">{stats.questions}</div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
        <Target className="w-5 h-5 text-green-400" />
        <div>
          <div className="text-sm text-gray-400">Accuracy</div>
          <div className="text-lg font-semibold">{stats.accuracy.toFixed(1)}%</div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
        <Award className="w-5 h-5 text-purple-400" />
        <div>
          <div className="text-sm text-gray-400">Streak</div>
          <div className="text-lg font-semibold">{stats.streak}</div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
        <Trophy className="w-5 h-5 text-blue-400" />
        <div>
          <div className="text-sm text-gray-400">Best Streak</div>
          <div className="text-lg font-semibold">{stats.bestStreak}</div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
        <Timer className="w-5 h-5 text-red-400" />
        <div>
          <div className="text-sm text-gray-400">Avg Time</div>
          <div className="text-lg font-semibold">{stats.avgTime.toFixed(1)}s</div>
        </div>
      </div>

      <button
        onClick={onPauseToggle}
        className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 
          transition-colors"
      >
        {isPaused ? (
          <Play className="w-5 h-5 text-green-400" />
        ) : (
          <Pause className="w-5 h-5 text-yellow-400" />
        )}
      </button>
    </div>
  );
}
