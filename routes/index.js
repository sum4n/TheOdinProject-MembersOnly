const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/users/log-in");
});

module.exports = router;
