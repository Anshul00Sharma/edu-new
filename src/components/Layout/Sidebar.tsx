"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useChatContext } from "@/context/ChatContext";
import { ChatHistory } from "../explore/ChatHistory";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { sessions, currentSession, createNewSession, switchSession } =
    useChatContext();

  const handleNewThread = () => {
    createNewSession("New Thread");
  };

  return (
    <div
      className={cn(
        "z-50 fixed left-0 top-0 h-screen bg-background/95 backdrop-blur-lg border-r border-border/40 flex flex-col transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[240px]",
        "hidden md:flex"
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
              <path
                fill="currentColor"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-white">educasm</span>
          )}
        </Link>
      </div>

      {/* New Thread Button */}
      <div className="px-2 py-2">
        <button
          onClick={handleNewThread}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-full border border-border/40",
            "hover:bg-accent/50 active:scale-95 transition-all duration-200",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">New Thread</span>}
        </button>
      </div>

      {/* Chat History */}
      {!isCollapsed && (
        <div className="mt-4 flex-1 overflow-y-auto">
          <ChatHistory
            sessions={sessions}
            currentSessionId={currentSession?.id}
            onSessionSelect={switchSession}
          />
        </div>
      )}

      {/* Navigation */}
      {/* <nav className="flex-1 px-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-2 py-2 rounded-lg transition-colors",
              "hover:bg-accent/50",
              pathname === item.href && "bg-accent",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav> */}

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="h-10 mx-2 mb-4 flex items-center justify-center rounded-lg hover:bg-accent/50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
