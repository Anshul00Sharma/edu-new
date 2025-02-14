# Technical Specification: React to Next.js Migration

## Project Overview

This document outlines the technical specifications for migrating the `edu` React application to a Next.js application (`edu-new`). The migration focuses on improving code quality and architecture while maintaining identical UI elements.

## Project Structure

- Source Project: `c:\Users\anshu\Desktop\Apps\projects\edu`
- Target Project: `c:\Users\anshu\Desktop\Apps\projects\edu-new`

## Migration Approach

The migration is being done component by component, with a focus on:

1. Maintaining identical UI elements
2. Improving code quality
3. Implementing best practices
4. Following Next.js conventions

## Key Components Migrated

### 1. Context Management

- Implemented proper Context API instead of prop drilling
- Created UserContext for managing user-related state
- TypeScript interfaces for type safety
- Custom hooks for easier context access

### 2. Layout Component

- Server-side rendered layout component
- Next.js Link components for client-side navigation
- Maintained original UI design
- Improved routing implementation

### 3. Components

#### PreFillForm

- Client-side form component
- Age input and validation
- Integration with UserContext
- TypeScript type safety

#### ExploreView

- Client-side component
- Integration with UserContext
- Currently displays basic information (to be expanded)

## Technical Decisions

### 1. Client vs Server Components

- Layout: Server Component for better performance
- PreFillForm: Client Component for interactivity
- ExploreView: Client Component for state management
- Dynamic imports with `ssr: false` for client components

### 2. State Management

- Centralized state management using Context API
- TypeScript for type safety
- Custom hooks for better code organization

### 3. Routing

- Using Next.js App Router
- Client-side navigation with Link component
- Maintained original route structure

## Best Practices Implemented

1. Proper separation of concerns
2. Type safety with TypeScript
3. Client/Server component separation
4. Clean code architecture
5. Reusable components
6. Performance optimizations
7. Modern Next.js patterns

## Chat History (Explore Mode)

- chat history is stored in the user's browser
- implemented using localStorage
- as you search in explore mode, the user input and the response is stored as a session in the localStorage
- the session also can have follow up questions , so each session is an array of user input and the response
- make sure that the user input and the response structure matches Message interface
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
