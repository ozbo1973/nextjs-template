const User = require("../../models/users");

const ctl = {};

/* signup */
ctl.signup = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // check to see if user exists
  const user = await User.findOne({ email });

  // if user exists redirect to login
  if (user) {
    return res.send({ errMsg: "Email address already in use." });
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
ctl.login = async (req, res) => {
  const { email, password } = req.body;

  // get user
  const user = await User.findOne({ email });

  if (!user) {
    return res.send({ errMsg: "Email not found" });
  }

  // match passwords
  if (password !== user.password) {
    return res.send({ errMsg: "Incorrect Email or Password" });
  }

  // update session user
  req.session.user = {
    email: user.email,
    username: user.username,
    userId: user._id,
  };

  res.send({ success: "You are logged in" });
};

/* logout */
ctl.logout = (req, res) => {
  req.session = null;
  res.send("logged out");
};

module.exports = ctl;
