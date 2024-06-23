const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

// User routes

// Get request for creating a user.
router.get("/sign-up", user_controller.user_create_get);

// Post request for creating a user.
router.post("/sign-up", user_controller.user_create_post);

module.exports = router;
