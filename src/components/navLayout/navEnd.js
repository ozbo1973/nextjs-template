import { useRouter } from "next/router";
import Button from "../ui/button";

const navEnd = ({ authConfig: { signup, login, logout } }) => {
  const router = useRouter();

  const isLanding = router.pathname === "/";
  const isSignup = router.pathname === "/signup";
  const isLogin = router.pathname === "/login";

  const styles = {
    signup: `${signup.styles} ${!isLanding && !isLogin && "is-hidden"}`,
    login: `${login.styles} ${!isLanding && !isSignup && "is-hidden"}`,
    logout: `${logout.styles} ${
      (isLanding || isLogin || isSignup) && "is-hidden"
    }`,
  };

  const authClick = {
    signUp: () => router.push(signup.path),
    login: () => router.push(login.path),
    logout: () => {
      //clear out user
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
