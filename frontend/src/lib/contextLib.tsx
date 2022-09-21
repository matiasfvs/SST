import { useContext, createContext } from "react";

export const AppContext = createContext(null);

//console.log('APP CONTEXT', AppContext )
export function useAppContext() {
  return useContext(AppContext);
  
}