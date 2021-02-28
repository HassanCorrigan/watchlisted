import { createContext, useContext, useReducer, useEffect } from 'react';
import AppReducer from 'context/AppReducer';
import { getToken } from 'helpers/token';

const initialState = {
  user: {
    authenticated: getToken() !== null,
    token: getToken(),
  },
  app: {
    theme: 'system',
  },
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /** If theme exists in localstorage, set global app theme */
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    theme && setTheme(theme);
  }, []);

  /**
   *
   * @param {object} user - accepts a user object with authenticated state and token
   */
  const setUser = user => {
    dispatch({
      type: 'SET_USER',
      payload: user,
    });
  };

  /**
   * Set the app theme - accepts: light, dark or system.
   * @param {string} theme - accepts a string value
   */
  const setTheme = theme => {
    dispatch({
      type: 'SET_THEME',
      payload: theme,
    });
  };

  return (
    <AppContext.Provider value={{ user: state.user, app: state.app, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
