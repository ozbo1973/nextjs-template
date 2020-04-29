const User = require("../../models/users");

const ctl = {};

/* signup */
ctl.signup = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // check passwords match
  if (password !== confirmPassword) {
    return res.send({ errMsg: "Passwords do not match" });
  }

  // create new User
  try {
    const newUser = new User({ email, username, password });
    await newUser.save();

    // add user to session
    req.session.user = {
      email: newUser.email,
      username: newUser.username,
      userId: newUser._id,
    };

    res.send({ data: "You are logged in" });
  } catch (error) {
    res.send({ errMsg: error });
  }
};

/* login */
ctl.login = async (req, res) => {
  const { email, password } = req.body;

  // get user
  const user = await User.findByCredentials(email, password);

  if (user.errMsg) {
    const { ReferenceError = null } = user.errMsg;

    return res.send({ errMsg: ReferenceError ? ReferenceError : user.errMsg });
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
