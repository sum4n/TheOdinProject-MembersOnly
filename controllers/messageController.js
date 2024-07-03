const Message = require("../models/message");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display message create form on GET
exports.message_create_get = asyncHandler((req, res, next) => {
  res.render("newMessage_form", { title: "Create a new post" });
});

// Handle message create on POST
exports.message_create_post = [
  // Validate and sanitize data.
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Add a title")
    .isLength({ max: 100 })
    .withMessage("Title character limit 100 exceded"),
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Can not post empty message.")
    .isLength({ min: 4 })
    .withMessage("Minimum 4 characters are required.")
    .isLength({ max: 1000 })
    .withMessage("Message character limit 1000 exceded"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    // Get user
    const user = await User.findById(req.params.id).exec();

    // Create message object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      text: req.body.message,
      author: user,
    });

    if (!errors.isEmpty()) {
      // There are errors, render the form again with sanitized values/errors messages.
      res.render("newMessage_form", {
        title: "Create a new message",
        message: message,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Save message
      await message.save();
      // Redirect to home page
      res.redirect("/");
    }
  }),
];

// Display message delete on GET
exports.message_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of the message.
  const message = await Message.findById(req.params.id)
    .populate("author")
    .exec();

  res.render("message_delete", {
    title: "Delete Message",
    message: message,
  });
});

// Handle message delete on POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.messageId);

  res.redirect("/");
});
