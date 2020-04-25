const button = ({ handleClick, classNames, text }) => {
  const handleOnClick = (e) => {
    e.preventDefault;
    handleClick();
  };

  return handleClick ? (
    <button onClick={handleOnClick} className={`button ${classNames}`}>
      {text}
    </button>
  ) : (
    <button className={`button ${classNames}`}>{text}</button>
  );
};

export default button;
