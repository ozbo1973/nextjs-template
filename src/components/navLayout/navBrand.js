import Link from "next/link";

const navBrand = ({ imgSrc }) => {
  return (
    <div className="navbar-brand">
      <Link href="/">
        <a className="navbar-item">
          <img src={imgSrc} width="112" height="28" />
        </a>
      </Link>

      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  );
};

export default navBrand;
