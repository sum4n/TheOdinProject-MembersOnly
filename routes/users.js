const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { isAuth, isNotAuth } = require("../middlewares/authMiddleware");

router.get("/log-in", isNotAuth, userController.log_in_get);
router.post("/log-in", isNotAuth, userController.log_in_post);

router.get("/sign-up", isNotAuth, userController.sign_up_get);
router.post("/sign-up", isNotAuth, userController.sign_up_post);

router.get("/log-out", isAuth, userController.log_out);

module.exports = router;
