"use client";

import { Message } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import {
  ChatSession,
  getHistory,
  saveMessage,
  createSession,
  deleteSession,
  setCurrentSession as setStorageCurrentSession,
  getCurrentSession,
} from "@/lib/storage/chatStorage";

interface ChatContextType {
  sessions: ChatSession[];
  currentSession?: ChatSession;
  addMessage: (message: Message) => void;
  createNewSession: (title: string) => void;
  switchSession: (sessionId: string) => void;
  removeSession: (sessionId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | undefined>();

  // Initialize from localStorage
  useEffect(() => {
    const history = getHistory();
    setSessions(history.sessions);
    setCurrentSession(getCurrentSession());
  }, []);

  const addMessage = (message: Message) => {
    saveMessage(message);
    const history = getHistory();
    setSessions(history.sessions);
    setCurrentSession(getCurrentSession());
  };

  const createNewSession = (title: string) => {
    createSession(title);
    const history = getHistory();
    setSessions(history.sessions);
    setCurrentSession(getCurrentSession());
  };

  const switchSession = (sessionId: string) => {
    setStorageCurrentSession(sessionId);
    const history = getHistory();
    setSessions(history.sessions);
    const newCurrentSession = history.sessions.find(s => s.id === sessionId);
    setCurrentSession(newCurrentSession);
  };

  const removeSession = (sessionId: string) => {
    deleteSession(sessionId);
    const history = getHistory();
    setSessions(history.sessions);
    setCurrentSession(getCurrentSession());
  };

  return (
    <ChatContext.Provider
      value={{
        sessions,
        currentSession,
        addMessage,
        createNewSession,
        switchSession,
        removeSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
