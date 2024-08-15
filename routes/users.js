const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/log-in", userController.log_in_get);
router.post("/log-in", userController.log_in_post);

router.get("/sign-up", userController.register_get);
router.post("/sign-up", userController.register_post);

module.exports = router;
