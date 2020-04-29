import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Input from "./input";
import Button from "./button";

const defaultState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const authForm = ({ authType }) => {
  const [state, setState] = useState({ ...defaultState });
  const router = useRouter();
  const isHidden = router.pathname === "/login";
  const buttonTxt = authType
    .split("")
    .map((ltr, i) => (i === 0 ? ltr.toUpperCase() : ltr))
    .join("");
  const { email, username, password, confirmPassword, errMsg = null } = state;

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, [errMsg]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // check to see if passwords match
    if (authType === "signup" && password !== confirmPassword) {
      return setState({ ...state, errMsg: "Passwords do not match." });
    }

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

      // if errMsg is present update state and return.
      if (data.errMsg) {
        return setState({ ...state, errMsg: data.errMsg });
      }

      // go to home page.
      router.push("/");
    } catch (error) {
      return setState({ ...state, errMsg: error });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {errMsg && <p className="has-text-danger">{errMsg}</p>}
      <Input icons={{ left: "envelope", right: "check" }}>
        <input
          className="input"
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleOnChange}
        />
      </Input>

      <Input isHidden={isHidden} icons={{ left: "user", right: "check" }}>
        <input
          className="input"
          type="text"
          placeholder="UserName"
          name="username"
          value={state.username}
          onChange={handleOnChange}
        />
      </Input>

      <Input icons={{ left: "lock" }}>
        <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleOnChange}
        />
      </Input>

      <Input isHidden={isHidden} icons={{ left: "lock" }}>
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
