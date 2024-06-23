const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display User create form on GET
exports.user_create_get = (req, res, next) => {
  res.render("signUp_form", { title: "Sign Up" });
};

// Handle User create on POST
exports.user_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: User create POST");
});
