const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.get("/create", messageController.message_create_get);

module.exports = router;
