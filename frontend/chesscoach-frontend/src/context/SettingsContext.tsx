// src/context/SettingsContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface SettingsContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  showSnow: boolean;
  setShowSnow: (value: boolean) => void;
  toggleSnow: () => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnow, setShowSnow] = useState(true);

  const toggleSnow = () => setShowSnow((prev) => !prev);

  return (
    <SettingsContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, showSnow, setShowSnow, toggleSnow }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
