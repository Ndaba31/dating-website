'use client'
// First, create a context
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  success: string;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  dbError: string;
  setDbError: React.Dispatch<React.SetStateAction<string>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  busy: boolean;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create a custom provider component that wraps your app
interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [success, setSuccess] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [dbError, setDbError] = useState("");


  return (
    <AppContext.Provider value={{
      success, setSuccess,
      dbError, setDbError,
      isAuth, setIsAuth,
      busy, setBusy,
      sidebar, setSidebar,
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
