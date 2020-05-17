export default (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      const { getUser, cbRoute } = action.payload;
      const isLoggedIn = getUser.userId ? true : false;
      return {
        ...state,
        isLoggedIn,
        loginFromPage: cbRoute,
        user: getUser,
      };

    case "LOG_OUT":
      return { ...state, isLoggedIn: false, user: {}, loginFromPage: "/" };

    default:
      return { ...state };
  }
};
