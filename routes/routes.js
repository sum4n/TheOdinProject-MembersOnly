const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// User routes

// Get request for creating a user.
router.get("/user/sign-up", user_controller.user_create_get);

// Post request for creating a user.
router.post("/user/sign-up", user_controller.user_create_post);

// Get request for membership
router.get("/user/:id/membership-status", user_controller.user_membership_get);

// Post request for membership
router.post(
  "/user/:id/membership-status",
  user_controller.user_membership_post
);

// Get request for creating a new message.
router.get(
  "/message/:id/create-new-message",
  message_controller.message_create_get
);

router.post(
  "/message/:id/create-new-message",
  message_controller.message_create_post
);

module.exports = router;
