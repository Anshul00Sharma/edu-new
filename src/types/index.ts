export interface UserContext {
  age: number;
  location?: string;
  studyingFor?: string;
  topicProgress?: {
    totalAttempts: number;
    successRate: number;
    averageTime: number;
    lastLevel: number;
    masteryScore: number;
  };
}

export interface Message {
  type: "user" | "ai";
  content: string;
  topics?: Array<{
    topic: string;
    type: string;
    reason: string;
  }>;
  questions?: Array<{
    question: string;
    type: string;
    context: string;
  }>;
}

export interface ExploreResponse {
  content: string;
  topics?: Array<{
    topic: string;
    type: string;
    reason: string;
  }>;
  questions?: Array<{
    question: string;
    type: string;
    context: string;
  }>;
}

export interface RelatedTopic {
  query: string;
  type: 'prerequisite' | 'extension' | 'application' | 'parallel' | 'deeper';
  context: string;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: {
    correct: string;
    incorrect: string[];
  };
  difficulty: number;
  topic: string;
  subtopic: string;
}

export interface SearchBarProps {
  key?: string;
  onSearch: (query: string) => Promise<void> | void;
  placeholder: string;
  centered?: boolean;
  title?: string;
  className?: string;
  suggestions?: Array<{
    text: string;
    icon: string;
  }>;
  buttonText?: string; 
  initialValue?: string;
  onSubmit?: (query: string) => void;
}

export interface QuestionHistory {
  usedQuestions: Set<string>;
  lastLevel: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  topicStrength: number;
  usedContexts: Set<string>;
  usedConcepts: Set<string>;
  usedApplications: Set<string>;
  usedExamples: Set<string>;
}

export interface MarkdownComponentProps {
  children: React.ReactNode;
  inline?: boolean;
  className?: string;
  // HTML attributes commonly used in markdown components
  id?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  role?: string;
  tabIndex?: number;
  title?: string;
  'aria-label'?: string;
}

export interface StreamContent {
  text?: string;
  topics?: Array<{
    topic: string;
    type: string;
    reason: string;
  }>;
  questions?: Array<{
    question: string;
    type: string;
    context: string;
  }>;
}

export interface ParsedTopic {
  name: string;
  type: string;
  detail: string;
}

export interface ParsedQuestion {
  text: string;
  type: string;
  context: string;
}

// Add other shared types here 