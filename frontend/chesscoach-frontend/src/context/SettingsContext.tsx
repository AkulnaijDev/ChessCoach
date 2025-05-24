import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SettingsContextType {
  showSnow: boolean;
  setShowSnow: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [showSnow, setShowSnow] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SettingsContext.Provider value={{ showSnow, setShowSnow, isLoggedIn, setIsLoggedIn }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
