const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

const User = require("./models/user");

// Import routes
const router = require("./routes/routes");

const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

require("dotenv").config();
// console.log(process.env.MONGODB);

const app = express();

// Set up rate limiter, maximum 40 requests per minute.
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 40,
});
// Apply rate limiter to all requests
app.use(limiter);

// Add helmet to the middleware chain.
app.use(helmet());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session and passport
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());

// Required to populate req.body with form fields.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(compression()); // Compress all routes

// Imported routes
app.use("/", router);

// Login, logout routes
app.post(
  "/user/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.get("/user/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("app listening on port 3000!"));
