'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContext {
  age: number;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<{
  userContext: UserContext | null;
  setUserContext: (context: UserContext | null) => void;
}>({
  userContext: null,
  setUserContext: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userContext, setUserContext] = useState<UserContext | null>(null);

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}
