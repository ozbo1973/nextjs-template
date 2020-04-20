import React from "react";

const button = ({ handleClick, classNames, text }) => {
  const handleOnClick = (e) => {
    e.preventDefault;
    handleClick();
  };

  return (
    <a onClick={handleOnClick} className={`button ${classNames}`}>
      {text}
    </a>
  );
};

export default button;
