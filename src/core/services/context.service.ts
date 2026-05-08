import { createContext, useContext } from "react";
import type { AppContextType } from "@/core/models/context.model";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useContext must be used within an ContextProvider");
  }
  return context;
};
