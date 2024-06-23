const express = require("express");
const path = require("path");

// Import routes
const router = require("./routes/routes");

require("dotenv").config();
// console.log(process.env.MONGODB);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.get("/", (req, res) => {
  res.send("<h1>Hello World!<h1>");
});

app.use("/", router);

app.listen(3000, () => console.log("app listening on port 3000!"));
