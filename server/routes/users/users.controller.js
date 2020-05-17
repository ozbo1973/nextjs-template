const User = require("../../models/users");

const ctl = {};

ctl.myProfile = async (req, res) => {
  const { userId } = req.session.user;
  const user = await User.findById(userId, "-password");

  if (!user) {
    throw new Error("No User Found.");
  }

  res.send(req.session.user);
};

module.exports = ctl;
