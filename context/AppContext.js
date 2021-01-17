import { createContext, useContext } from 'react';
import { auth } from 'helpers/auth';

const AppContext = createContext();

const AppWrapper = ({ children }) => {
  let state = auth();

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppWrapper, useAppContext };
