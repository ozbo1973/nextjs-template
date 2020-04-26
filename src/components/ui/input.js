const Icon = ({ placement, icon }) => {
  return (
    <span className={`icon is-small ${placement ? `is-${placement}` : ""}`}>
      <i className={`fas fa-${icon}`}></i>
    </span>
  );
};

const input = ({ icons, children, isHidden }) => {
  const { right = "", left = "" } = icons;

  return (
    <div className={`${!isHidden ? "field" : "is-hidden"} `}>
      <p
        className={`control ${right ? "has-icons-right" : ""} ${
          left ? "has-icons-left" : ""
        }`}
      >
        {children}

        {left && <Icon placement="left" icon={left} />}
        {right && <Icon placement="right" icon={right} />}
      </p>
    </div>
  );
};

export default input;
