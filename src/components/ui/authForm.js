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
  const { email, username, password, confirmPassword } = state;

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //   useEffect(() => {}, [email]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
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
        throw Error(data.errMsg);
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
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
