import { Message } from "@/types";

const STORAGE_KEY = 'edu_chat_history';

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatHistory {
  sessions: ChatSession[];
  currentSessionId?: string;
}

// Initialize storage with default values
export function initStorage(): ChatHistory {
  const defaultHistory: ChatHistory = {
    sessions: [],
    currentSessionId: undefined
  };

  if (typeof window === 'undefined') return defaultHistory;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHistory));
      return defaultHistory;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to initialize chat history:', error);
    return defaultHistory;
  }
}

// Create a new session
export function createSession(firstMessage: string): ChatSession {
  const session: ChatSession = {
    id: Date.now().toString(),
    title: firstMessage,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  const history = getHistory();
  history.sessions.push(session);
  history.currentSessionId = session.id;
  saveHistory(history);

  return session;
}

// Get all chat history
export function getHistory(): ChatHistory {
  if (typeof window === 'undefined') return { sessions: [] };
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initStorage();
  } catch (error) {
    console.error('Failed to get chat history:', error);
    return { sessions: [] };
  }
}

// Save message to current session
export function saveMessage(message: Message): void {
  const history = getHistory();
  const currentSession = history.sessions.find(s => s.id === history.currentSessionId);
  
  if (!currentSession) {
    const session = createSession(message.content);
    session.messages.push(message);
    const newHistory = getHistory();
    newHistory.sessions[newHistory.sessions.length - 1] = session;
    saveHistory(newHistory);
    return;
  }

  currentSession.messages.push(message);
  currentSession.updatedAt = Date.now();
  saveHistory(history);
}

// Save entire history
function saveHistory(history: ChatHistory): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
}

// Delete a session
export function deleteSession(sessionId: string): void {
  const history = getHistory();
  history.sessions = history.sessions.filter(s => s.id !== sessionId);
  if (history.currentSessionId === sessionId) {
    history.currentSessionId = history.sessions[0]?.id;
  }
  saveHistory(history);
}

// Get current session
export function getCurrentSession(): ChatSession | undefined {
  const history = getHistory();
  return history.sessions.find(s => s.id === history.currentSessionId);
}

// Set current session
export function setCurrentSession(sessionId: string): void {
  const history = getHistory();
  if (history.sessions.some(s => s.id === sessionId)) {
    history.currentSessionId = sessionId;
    saveHistory(history);
  }
}
