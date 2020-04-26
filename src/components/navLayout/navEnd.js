import { useRouter } from "next/router";
import { useContext } from "react";
import axios from "axios";
import Button from "../ui/button";
import { AppContext, AppDispatch } from "../../contexts/appContext";

const navEnd = ({ authConfig: { signup, login, logout } }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AppContext);
  const dispatch = useContext(AppDispatch);

  const isLanding = router.pathname === "/";
  const isSignup = router.pathname === "/signup";
  const isLogin = router.pathname === "/login";

  const styles = {
    signup: `${signup.styles} ${
      (!isLanding && !isLogin) || isLoggedIn ? "is-hidden" : ""
    }`,
    login: `${login.styles} ${
      (!isLanding && !isSignup) || isLoggedIn ? "is-hidden" : ""
    }`,
    logout: `${logout.styles} ${!isLoggedIn ? "is-hidden" : ""}`,
  };

  const authClick = {
    signUp: () => router.push(signup.path),
    login: () => router.push(login.path),
    logout: async () => {
      //clear out user
      const { data } = await axios.get("/auth/logout");

      dispatch({ type: "LOG_OUT" });
      router.push(logout.path);
    },
  };

  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className={"buttons"}>
          <Button
            handleClick={authClick.signUp}
            text="Sign up"
            classNames={styles.signup}
          />
          <Button
            handleClick={authClick.login}
            text="Log in"
            classNames={styles.login}
          />
          <Button
            handleClick={authClick.logout}
            text="Log out"
            classNames={styles.logout}
          />
        </div>
      </div>
    </div>
  );
};

export default navEnd;
