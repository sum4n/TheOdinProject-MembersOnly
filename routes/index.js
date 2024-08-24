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
router.post(
  "/dashboard/membership",
  isAuth,
  userController.dashboard_membership_post
);
router.post("/dashboard/admin", isAuth, userController.dashboard_admin_post);

module.exports = router;
