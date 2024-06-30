const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 200 },
  text: { type: String, required: true, maxLength: 1000 },
  timestamp: { type: Date, default: Date.now() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
