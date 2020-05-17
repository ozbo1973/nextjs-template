import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { AppDispatch, AppContext } from "../contexts/appContext";

const useIsLoggedIn = (user) => {
  const dispatch = useContext(AppDispatch);
  const router = useRouter();

  const setLogIn = () => {
    dispatch({
      type: "LOG_IN",
      payload: { getUser: user, cbRoute: router.pathname },
    });
  };
  useEffect(() => {
    console.log("render useislogin");
    setLogIn();
  }, []);

  return true;
};

export default useIsLoggedIn;
