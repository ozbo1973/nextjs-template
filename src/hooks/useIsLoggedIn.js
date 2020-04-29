import { useState, useEffect, useContext } from "react";
import { AppDispatch, AppContext } from "../contexts/appContext";

const useIsLoggedIn = (getUser) => {
  const { isLoggedIn, user } = useContext(AppContext);
  const { userId = null } = getUser;
  const dispatch = useContext(AppDispatch);

  useEffect(() => {
    if (getUser.userId) {
      dispatch({ type: "LOG_IN", payload: getUser });
    } else {
      dispatch({ type: "LOG_OUT" });
    }
  }, [userId]);

  return { isLoggedIn, user };
};

export default useIsLoggedIn;
