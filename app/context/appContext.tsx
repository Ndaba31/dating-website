'use client'
// First, create a context
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dbError: string;
  setDbError: React.Dispatch<React.SetStateAction<string>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  busy: boolean;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create a custom provider component that wraps your app
interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dbError, setDbError] = useState("");


  return (
    <AppContext.Provider value={{
      loading, setLoading,
      dbError, setDbError,
      isAuth, setIsAuth,
      busy, setBusy
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Create a custom hook to access the context values
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
}
