const express = require("express");
const router = express.Router();

const { isAuth } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", isAuth, userController.dashboard_get);

module.exports = router;
