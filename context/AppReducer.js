const AppReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      /** Set user from the passed in payload. */
      return {
        ...state,
        user: action.payload,
      };

    /** Set theme from the passed in payload. */
    case 'SET_THEME':
      return {
        ...state,
        app: {
          theme: action.payload,
        },
      };

    default:
      return state;
  }
};

export default AppReducer;
