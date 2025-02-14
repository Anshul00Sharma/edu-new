"use client";

import { ChatSession } from "@/lib/storage/chatStorage";
import { cn } from "@/lib/utils";

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
}

export function ChatHistory({ sessions, currentSessionId, onSessionSelect }: ChatHistoryProps) {
  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => onSessionSelect(session.id)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-lg transition-colors",
            "hover:bg-accent/50",
            currentSessionId === session.id ? "bg-accent" : "bg-transparent"
          )}
        >
          <p className="text-sm font-medium truncate">{session.title}</p>
          <p className="text-xs text-gray-400">
            {new Date(session.updatedAt).toLocaleDateString()}
          </p>
        </button>
      ))}
    </div>
  );
}
