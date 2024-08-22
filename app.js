const express = require("express");
const path = require("path");

const passport = require("./config/passport");
const session = require("./config/session");

const app = express();

// Set views path and view engine.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Use session and passport middleware.
app.use(session);
app.use(passport.session());

// Middleware to parse request body.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static assests.
app.use(express.static(path.join(__dirname, "public")));

// Allow access logged-in user in all views.
app.use((req, res, next) => {
  // console.log("Current user:", req.user);
  res.locals.currentUser = req.user;
  next();
});

// Import and use routes.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

// Start server.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app is listening on port: ${PORT}`));
