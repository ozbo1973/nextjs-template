const navConfig = {};

navConfig.linkItemsConfig = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
];

navConfig.moreItemsConfig = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact", divider: true },
  { name: "Other", href: "/other" },
];

navConfig.authConfig = {
  signup: { styles: "is-primary", path: "/signup" },
  login: { styles: "is-light", path: "/login" },
  logout: { styles: "is-danger", path: "/" },
};

navConfig.branding = {
  imgSrc: "https://bulma.io/images/bulma-logo.png",
};

export default navConfig;
