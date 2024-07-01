const express = require("express");
const router = express.Router();

const home_page_controller = require("../controllers/homePageController");
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// Home page routes
router.get("/", home_page_controller.home_page_get);

// User routes
// Get request for creating a user.
router.get("/user/sign-up", user_controller.user_create_get);

// Post request for creating a user.
router.post("/user/sign-up", user_controller.user_create_post);

// GET request for log in
router.get("/user/log-in", user_controller.user_login_get);

// POST request for log in
// handled at app.js

// Get request for membership
router.get("/user/:id/membership-status", user_controller.user_membership_get);

// Post request for membership
router.post(
  "/user/:id/membership-status",
  user_controller.user_membership_post
);

// GET request for admin
router.get("/user/:id/admin-status", user_controller.user_admin_get);
// POST request for admin
router.get("/user/:id/admin-status", user_controller.user_admin_post);

// Message routes
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
