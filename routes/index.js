const express = require("express");
const router = express.Router();

const { isAuth } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("pages/homePage", {
    title: "Members Only",
  });
});

router.get("/dashboard", isAuth, userController.dashboard_get);
router.post("/dashboard", isAuth, userController.dashboard_post);

module.exports = router;
