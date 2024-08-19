const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const pool = require("../db/pool");

module.exports.message_create_get = (req, res) => {
  res.render("pages/createMessage", {
    title: "Create Message",
  });
};

module.exports.message_create_post = asyncHandler(async (req, res) => {
  if (req.user) {
    await pool.query(
      "INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)",
      [req.body.msgTitle, req.body.msgContent, req.user.user_id]
    );
    res.redirect("/messages");
  } else {
    res.redirect("/users/log-in");
  }
});
