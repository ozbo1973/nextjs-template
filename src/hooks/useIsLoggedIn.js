import { useState, useEffect, useContext } from "react";
import { AppDispatch, AppContext } from "../contexts/appContext";

const useIsLoggedIn = (getUser) => {
  const { isLoggedIn, user } = useContext(AppContext);

  const dispatch = useContext(AppDispatch);

  useEffect(() => {
    !isLoggedIn && getUser && dispatch({ type: "LOG_IN", payload: getUser });
  }, [isLoggedIn]);

  return { isLoggedIn, user };
};

export default useIsLoggedIn;
