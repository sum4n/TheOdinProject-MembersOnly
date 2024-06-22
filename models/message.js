const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 200 },
  text: { type: String, required: true, maxLength: 1000 },
  timestamp: { type: Date, default: Date.now() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
