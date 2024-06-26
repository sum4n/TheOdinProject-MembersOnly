const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Display User create form on GET
exports.user_create_get = (req, res, next) => {
  res.render("signUp_form", { title: "Sign Up" });
};

// Handle User create on POST
exports.user_create_post = [
  // Validate and sanitize fields.
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
  body("email")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be of correct format e.g. example@email.com"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Password must be specified.")
    .isLength({ min: 6 })
    .withMessage("Password must have 6 characters or more"),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("The passwords you provided did not match."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create User object with escaped and trimmed data.
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      // There are errors. Render the form again with sanitized values/errors messages.
      res.render("signUp_form", {
        title: "Sign Up",
        user: user,
        confirm_password: req.body.confirm_password,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Convert password into hash and save user with hashed password.
      try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            return next(error);
          }
          user.password = hashedPassword;

          // Save user.
          await user.save();

          // TODO: Redirect to login page.
          res.send(
            `<h1>User: ${req.body.first_name} ${req.body.last_name} saved.`
          );
        });
      } catch (err) {
        return next(err);
      }
    }
  }),
];

// Display membership status and form on GET
exports.user_membership_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  res.render("membershipStatus_form", {
    title: "Membership Status",
    user: user,
  });
});

// Handle membership form POST
exports.user_membership_post = [
  // Validate input.
  body("membership_code")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Membership code must be specified")
    .custom((value, { req }) => {
      return value === "Membership";
    })
    .withMessage("Wrong code. Try again."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Get the user.
    const user = await User.findById(req.params.id);

    if (!errors.isEmpty()) {
      res.render("membershipStatus_form", {
        title: "Membership Status",
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      await User.findByIdAndUpdate(req.params.id, { membership_status: true });
      res.redirect(`/user/${user.id}/membership`);
    }
  }),
];
