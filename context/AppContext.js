import { createContext, useContext } from 'react';
import { getToken } from 'helpers/token';

const AppContext = createContext();

const AppWrapper = ({ children }) => {
  const state = {
    user: {
      authenticated: getToken() !== null,
      token: getToken(),
    },
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppWrapper, useAppContext };
