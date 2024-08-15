const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const passport = require("passport");
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

const validateSignUpForm = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Username must be at least 3 characters long.")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .custom(async (username) => {
      const res = await pool.query(
        "SELECT user_id FROM users WHERE username = $1",
        [username]
      );
      if (res.rows.length > 0) {
        return Promise.reject("Username already in use.");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long."),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

exports.log_in_get = asyncHandler(async (req, res) => {
  res.render("pages/log-in");
});

exports.log_in_post = asyncHandler(async (req, res) => {
  res.send("POST log-in: WIP");
});

exports.sign_up_get = asyncHandler(async (req, res) => {
  res.render("pages/sign-up");
});

exports.sign_up_post = [
  validateSignUpForm,
  asyncHandler(async (req, res) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    };

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/errors messages.
      // console.log(errors.array());
      res.render("pages/sign-up", {
        title: "Sign-Up",
        data: data,
        errors: errors.array(),
      });
      return;
    } else {
      res.send(data);
    }
  }),
];
