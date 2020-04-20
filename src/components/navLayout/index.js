import NavbarBrand from "./navBrand";
import NavbarStart from "./navStart";
import NavbarEnd from "./navEnd";
import navConfig from "../../configs/nav";

const index = () => {
  const { linkItemsConfig, authConfig, moreItemsConfig, branding } = navConfig;

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <NavbarBrand imgSrc={branding.imgSrc} />
      <div id="navbarBasicExample" className="navbar-menu">
        <NavbarStart linkItems={linkItemsConfig} moreItems={moreItemsConfig} />
        <NavbarEnd authConfig={authConfig} />
      </div>
    </nav>
  );
};

export default index;
