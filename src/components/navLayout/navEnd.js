import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../ui/button";
import { AppContext } from "../../contexts/appContext";
import useAuthClick from "../../hooks/useAuthClick";
import styles from "../../styles/nav";

const navEnd = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AppContext);
  const { toLogin, toSignup, toLogout } = useAuthClick();
  const { signup, login, logout } = styles(router.pathname);

  useEffect(() => {
    console.log("render nav-end");
  }, [isLoggedIn, router.pathname]);

  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className={"buttons"}>
          <Button handleClick={toSignup} text="Sign up" classNames={signup} />
          <Button handleClick={toLogin} text="Log in" classNames={login} />
          <Button handleClick={toLogout} text="Log out" classNames={logout} />
        </div>
      </div>
    </div>
  );
};

export default navEnd;
