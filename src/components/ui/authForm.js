import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AppContext, AppDispatch } from "../../contexts/appContext";
import Input from "./input";
import Button from "./button";

const authForm = () => {
  const { loginFromPage, defaultAuthFormState } = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  const [state, setState] = useState({ ...defaultAuthFormState });
  const router = useRouter();
  const authType = router.pathname.split("/")[1];

  const isHidden = authType === "login";
  const buttonTxt = authType
    .split("")
    .map((ltr, i) => (i === 0 ? ltr.toUpperCase() : ltr))
    .join("");

  const {
    email,
    username,
    password,
    confirmPassword,
    errMsg,
    hasErrors,
  } = state;

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("render authform");
  }, [hasErrors]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // build user data to post
    const userData =
      authType === "signup"
        ? {
            email,
            username,
            password,
            confirmPassword,
          }
        : { email, password };

    try {
      const { data } = await axios.post(`/auth/${authType}`, userData);

      if (data.errMsg) {
        return setState({ ...state, errMsg: data.errMsg, hasErrors: true });
      }

      dispatch({
        type: "LOG_IN",
        payload: { getUser: data.user, cbRoute: loginFromPage },
      });

      router.push(loginFromPage);
    } catch (error) {
      return setState({
        ...state,
        errMsg: [
          {
            param: "systemError",
            msg: "Unable to perform action. Check network connection",
          },
        ],
        hasErrors: true,
      });
    }
  };

  // handle display errors
  let errors = {};
  for (const err of errMsg) {
    errors[err.param] = err.msg;
  }

  return (
    <form onSubmit={handleOnSubmit}>
      {errors.systemError && <div>{errors.systemError}</div>}
      <Input
        validationError={errors.email}
        icons={{ left: "envelope", right: "check" }}
      >
        <input
          className="input"
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleOnChange}
        />
      </Input>

      <Input
        validationError={errors.username}
        isHidden={isHidden}
        icons={{ left: "user", right: "check" }}
      >
        <input
          className="input"
          type="text"
          placeholder="UserName"
          name="username"
          value={state.username}
          onChange={handleOnChange}
        />
      </Input>

      <Input validationError={errors.password} icons={{ left: "lock" }}>
        <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleOnChange}
        />
      </Input>

      <Input
        validationError={errors.confirmPassword}
        isHidden={isHidden}
        icons={{ left: "lock" }}
      >
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleOnChange}
        />
      </Input>

      <div className="field">
        <p className="control">
          <Button classNames="button is-primary" text={buttonTxt} />
        </p>
      </div>
    </form>
  );
};

export default authForm;
