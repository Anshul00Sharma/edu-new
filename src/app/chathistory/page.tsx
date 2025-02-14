"use client";

import { useRouter } from "next/navigation";
import { useChatContext } from "@/context/ChatContext";
import { Plus, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ChatHistoryPage() {
  const router = useRouter();
  const { sessions, createNewSession, switchSession, currentSession } =
    useChatContext();

  const handleNewThread = () => {
    createNewSession("New Thread");
    router.push("/");
  };

  const handleSessionClick = (sessionId: string) => {
    switchSession(sessionId);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A]">
      <div className="flex-1 overflow-y-auto p-4">
        {/* New Thread Button */}
        <button
          onClick={handleNewThread}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
            bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 
            active:scale-95 transition-all duration-200 mb-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create New Thread</span>
        </button>

        {/* Chat History List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sessions.map((session, index) => (
            <button
              key={session.id}
              onClick={() => handleSessionClick(session.id)}
              className={cn(
                "w-full flex flex-col gap-3 p-4 rounded-xl transition-all duration-200 animate-slide-up",
                "backdrop-blur-sm border shadow-lg",
                session.id === currentSession?.id
                  ? "bg-accent/80 border-primary/50 shadow-primary/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-black/20",
                "opacity-0"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  session.id === currentSession?.id
                    ? "bg-primary/20"
                    : "bg-white/10"
                )}>
                  <MessageSquare className={cn(
                    "w-5 h-5",
                    session.id === currentSession?.id
                      ? "text-primary"
                      : "text-white/70"
                  )} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={cn(
                    "font-medium line-clamp-1",
                    session.id === currentSession?.id
                      ? "text-white"
                      : "text-white/90"
                  )}>{session.title}</h3>
                  {session.messages.length > 0 && (
                    <p className="text-sm text-white/50 line-clamp-2 mt-0.5">
                      {session.messages[session.messages.length - 1].content}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>{session.messages.length} messages</span>
                <span>•</span>
                <span>Last updated {new Date().toLocaleDateString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
