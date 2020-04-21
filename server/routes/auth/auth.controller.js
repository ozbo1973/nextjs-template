const ctl = {};

/* signup */
ctl.signup = (req, res) => {
  res.send("Signup Route");
};

/* login */
ctl.login = (req, res) => {
  res.send("login");
};

/* logout */
ctl.logout = (req, res) => {
  res.send("logout");
};

module.exports = ctl;
