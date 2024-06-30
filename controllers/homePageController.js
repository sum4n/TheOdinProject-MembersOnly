const asyncHandler = require("express-async-handler");
const Message = require("../models/message");

exports.home_page_get = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find()
    .sort({ timestamp: -1 })
    .populate("author")
    .exec();

  res.render("index", { user: req.user, message_list: allMessages });
});
