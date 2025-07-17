import { createContext, useContext } from "react";
import type { ReactNode } from "react";


// 1. Define the context value type
interface AppContextType {
  // Add your context values here, example:
  // user: User | null;
}

// 2. Create the context with an initial value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Define the props type for the provider
interface AppProviderProps {
  children: ReactNode;
}

// 4. Create the provider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const contextValue: AppContextType = {
    // Populate with actual values
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
 return useContext(AppContext)
};