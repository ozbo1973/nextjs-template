const mongoose = require("mongoose");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Must have an email address"],
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    unique: [true, "Must input a User Name."],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, "Must be at least 6 chars."],
  },
});

const comparePassword = async (saved, supplied) => {
  const [hashed, salt] = saved.split(".");
  const hashSupplied = await scrypt(supplied, salt, 64);
  return hashed === hashSupplied;
};

userSchema.statics.findByCredentials = async (email, suppliedPassword) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("unable to login");
    }

    const isMatch = comparePassword(user.password, suppliedPassword);
    if (!isMatch) {
      throw new Error("unable to login");
    }

    return user;
  } catch (error) {
    return { errMsg: error };
  }
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = crypto.randomBytes(8).toString("hex");
    const buff = await scrypt(user.password, salt, 64);

    user.password = `${buff.toString("hex")}.${salt}`;
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
