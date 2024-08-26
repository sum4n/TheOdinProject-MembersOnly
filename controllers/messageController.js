const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const {
  getAllMessagesWithUser,
  getAllMessages,
  createMessage,
  deleteMessage,
} = require("../db/queries");

module.exports.allMessages_get = asyncHandler(async (req, res) => {
  let allMessages;

  if ((req.user && req.user.membership) || (req.user && req.user.admin)) {
    allMessages = await getAllMessagesWithUser();
  } else {
    allMessages = await getAllMessages();
  }

  res.render("pages/messages", {
    title: "Messages",
    allMessages: allMessages,
  });
});

module.exports.message_create_get = (req, res) => {
  res.render("pages/createMessage", {
    title: "Create Message",
  });
};

module.exports.message_create_post = asyncHandler(async (req, res) => {
  await createMessage(req.body.msgTitle, req.body.msgContent, req.user.user_id);

  res.redirect("/messages");
});

module.exports.message_delete_post = asyncHandler(async (req, res) => {
  await deleteMessage(req.params.message_id);

  res.redirect("back");
});
