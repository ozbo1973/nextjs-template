import { useContext } from "react";
import { AppContext } from "../contexts/appContext";
import navConfig from "../configs/nav";

const { signup, login, logout } = navConfig.authConfig;

export default (pageName) => {
  const { isLoggedIn } = useContext(AppContext);

  const isLanding = pageName === "/";
  const isSignup = pageName === "/signup";
  const isLogin = pageName === "/login";

  return {
    signup: `${signup.styles} ${
      (!isLanding && !isLogin) || isLoggedIn ? "is-hidden" : ""
    }`,
    login: `${login.styles} ${
      (!isLanding && !isSignup) || isLoggedIn ? "is-hidden" : ""
    }`,
    logout: `${logout.styles} ${!isLoggedIn ? "is-hidden" : ""}`,
  };
};
