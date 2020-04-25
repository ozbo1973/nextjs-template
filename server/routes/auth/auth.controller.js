const User = require("../../models/users");

const ctl = {};

/* signup */
ctl.signup = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // check to see if user exists
  const user = await User.findOne({ email });

  // if user exists redirect to login
  if (user) {
    return res.redirect("/login");
  }

  // check passwords match
  if (password !== confirmPassword) {
    return res.redirect("/");
  }

  // add user to database and set user
  const newUser = await User.create({ email, username, password });
  req.session.user = {
    email: newUser.email,
    username: newUser.username,
    userId: newUser._id,
  };

  //return logged in
  res.send(req.session.user);
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
