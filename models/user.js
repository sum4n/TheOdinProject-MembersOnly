const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  username: {
    type: String,
    maxLength: 100,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  membership_status: { type: Boolean, default: false },
});

// Virtual for user's full name.
UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`;
  }
  return fullname;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
