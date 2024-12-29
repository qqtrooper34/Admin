import React, { createContext, useContext, useState } from 'react';
import type { AuthServer } from '../types';

interface AuthServerContextType {
  selectedServer: AuthServer | null;
  setSelectedServer: (server: AuthServer | null) => void;
}

const AuthServerContext = createContext<AuthServerContextType | undefined>(undefined);

export function AuthServerProvider({ children }: { children: React.ReactNode }) {
  const [selectedServer, setSelectedServer] = useState<AuthServer | null>(null);

  return (
    <AuthServerContext.Provider value={{ selectedServer, setSelectedServer }}>
      {children}
    </AuthServerContext.Provider>
  );
}

export function useAuthServer() {
  const context = useContext(AuthServerContext);
  if (context === undefined) {
    throw new Error('useAuthServer must be used within an AuthServerProvider');
  }
  return context;
}