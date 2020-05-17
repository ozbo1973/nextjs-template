const { checkSchema } = require("express-validator");
const User = require("../models/users");

module.exports = {
  requireAuth: (req, res, next) => {
    if (!req.session.user) {
      return res.send({ errMsg: "Please Authenticate" });
    }
    next();
  },
  validateSignup: checkSchema({
    email: {
      in: ["body"],
      trim: true,
      escape: true,
      normalizeEmail: true,
      notEmpty: {
        errorMessage: "Must input an Email address.",
      },
      isEmail: {
        errorMessage: "Must be in email format",
      },
      custom: {
        options: async (submittedEmail) => {
          const email = submittedEmail.toLowerCase();
          const user = await User.findOne({ email });

          if (user) {
            throw new Error("Email already exists");
          }
          return true;
        },
      },
    },
    username: {
      in: ["body"],
      trim: true,
      escape: true,
      notEmpty: {
        errorMessage: "Must input username.",
      },
      custom: {
        options: async (submittedUsername) => {
          const username = submittedUsername.toLowerCase();
          const user = await User.findOne({ username });

          if (user) {
            throw new Error("Username already exists");
          }
          return true;
        },
      },
    },
    password: {
      in: ["body"],
      trim: true,
      escape: true,
      notEmpty: {
        errorMessage: "Must input a password",
      },
      isLength: {
        errorMessage: "Password must be at least 6 chars and no more than 25",
        options: { min: 6, max: 25 },
      },
      custom: {
        options: (val, { req }) => {
          if (val !== req.body.confirmPassword) {
            throw new Error("Passwords Do not Match");
          }
          return true;
        },
      },
    },
  }),
  validateLogin: checkSchema({
    email: {
      in: ["body"],
      trim: true,
      normalizeEmail: true,
      notEmpty: {
        errorMessage: "Must input email.",
      },
    },
    password: {
      in: ["body"],
      trim: true,
      notEmpty: {
        errorMessage: "Must provide password",
      },
    },
  }),
};
