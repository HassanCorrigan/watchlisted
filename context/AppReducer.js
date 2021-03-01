const AppReducer = (state, action) => {
  switch (action.type) {
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
