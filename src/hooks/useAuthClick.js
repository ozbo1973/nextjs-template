import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AppDispatch } from "../contexts/appContext";
import navConfig from "../configs/nav";

export default () => {
  const router = useRouter();
  const { signup, login, logout } = navConfig.authConfig;
  const dispatch = useContext(AppDispatch);

  const toSignup = () => router.push(signup.path);
  const toLogin = () => router.push(login.path);
  const toLogout = async () => {
    //clear out user
    await axios.get("/auth/logout");
    dispatch({ type: "LOG_OUT" });
    router.pathname === "/" ? router.reload() : router.push(logout.path);
  };

  return { toSignup, toLogin, toLogout };
};
