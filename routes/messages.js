const express = require("express");
const router = express.Router();

const { isAuth } = require("../middlewares/authMiddleware");
const messageController = require("../controllers/messageController");

router.get("/", messageController.allMessages_get);

router.get("/create", isAuth, messageController.message_create_get);

router.post("/create", isAuth, messageController.message_create_post);

module.exports = router;
