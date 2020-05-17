const User = require("../../models/users");
const { validationResult } = require("express-validator");

const reqUser = (user) => ({
  userId: user._id,
  email: user.email,
  username: user.username,
});

const ctl = {};

/* signup */
ctl.signup = async (req, res) => {
  const { email, username, password } = req.body;
  const { errors } = validationResult(req);
  let errMgs = [];

  if (errors.length > 0) {
    errMgs = errors.map((err) => ({ param: err.param, msg: err.msg }));
    return res.send({ errMsg: [...errMgs] });
  }

  // create new User
  try {
    const newUser = new User({ email, username, password });
    await newUser.save();
    req.session.user = { ...reqUser(newUser) };
    res
      .status(201)
      .send({ success: "You are logged in", user: req.session.user });
  } catch (error) {
    res.status(400).send({
      errMsg: [...errMgs, { param: error.path, msg: error.message }],
    });
  }
};

/* login */
ctl.login = async (req, res) => {
  const { errors } = validationResult(req);
  let errMgs = [];

  if (errors.length > 0) {
    errMgs = errors.map((err) => ({ param: ersr.param, msg: err.msg }));
    return res.send({ errMsg: [...errMgs] });
  }

  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (user.errMsg) {
      return res.send({
        errMsg: [
          ...errMgs,
          { param: "email", msg: "Email or Password incorrect." },
        ],
      });
    }

    req.session.user = { ...reqUser(user) };
    res.send({ success: "You are logged in", user: req.session.user });
  } catch (error) {
    res.status(401).send({
      errMsg: [...errMgs, { param: error.path, msg: error.message }],
    });
  }
};

/* logout */
ctl.logout = (req, res) => {
  req.session = null;
  res.send({ success: "logged out" });
};

module.exports = ctl;
