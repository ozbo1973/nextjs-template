import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Input from "../components/ui/input";
import Button from "../components/ui/button";

const defaultState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const signup = () => {
  const [state, setState] = useState({ ...defaultState });
  const router = useRouter();
  const { email, username, password, confirmPassword } = state;

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, [email]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/signup", {
        email,
        username,
        password,
        confirmPassword,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-half">
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

            <Input icons={{ left: "user", right: "check" }}>
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

            <Input icons={{ left: "lock" }}>
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
                <Button classNames="button is-primary" text="Signup" />
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default signup;
