const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const pool = require("../db/pool");

module.exports.allMessages_get = asyncHandler(async (req, res) => {
  let allMessages;

  if ((req.user && req.user.membership) || (req.user && req.user.admin)) {
    allMessages = await pool.query(
      "SELECT title, content, created_at, updated_at, first_name, last_name, messages.message_id, users.user_id FROM messages JOIN users ON messages.user_id = users.user_id"
    );
  } else {
    allMessages = await pool.query("SELECT title, content FROM messages");
  }

  res.render("pages/messages", {
    title: "Messages",
    allMessages: allMessages.rows,
  });
});

module.exports.message_create_get = (req, res) => {
  res.render("pages/createMessage", {
    title: "Create Message",
  });
};

module.exports.message_create_post = asyncHandler(async (req, res) => {
  await pool.query(
    "INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)",
    [req.body.msgTitle, req.body.msgContent, req.user.user_id]
  );
  res.redirect("/messages");
});

module.exports.message_delete_post = asyncHandler(async (req, res) => {
  await pool.query("DELETE FROM messages WHERE message_id = $1", [
    req.params.message_id,
  ]);

  res.redirect("back");
});
