const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display User create form on GET
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: User create GET");
});

// Handle User create on POST
exports.user_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: User create POST");
});
