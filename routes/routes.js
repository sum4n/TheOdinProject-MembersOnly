const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

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

module.exports = router;
