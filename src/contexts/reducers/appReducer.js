export default (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      const { userId } = action.payload;
      const isLoggedIn = userId ? true : false;
      return { ...state, isLoggedIn, user: action.payload };

    case "LOG_OUT":
      return { ...state, isLoggedIn: false, user: {} };
    default:
      return { ...state };
  }
};
