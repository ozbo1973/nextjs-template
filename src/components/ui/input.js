import { useState } from "react";
const Icon = ({ placement, icon }) => {
  return (
    <span className={`icon is-small ${placement ? `is-${placement}` : ""}`}>
      <i className={`fas fa-${icon}`}></i>
    </span>
  );
};
const input = ({ icons, children }) => {
  const [state, setState] = useState("");
  const { right = "", left = "" } = icons;
  // const { type, plcHold, name } = input;

  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="field">
      <p
        className={`control ${right ? "has-icons-right" : ""} ${
          left ? "has-icons-left" : ""
        }`}
      >
        {/* <input
          className="input"
          type={type}
          placeholder={plcHold}
          name={name}
          value={state.value}
          onChange={handleChange}
        /> */}
        {children}
        {left && <Icon placement="left" icon={left} />}
        {right && <Icon placement="right" icon={right} />}
      </p>
    </div>
  );
};

export default input;
