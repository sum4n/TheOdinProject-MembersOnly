const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const pool = require("../db/pool");

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: pool,
    tableName: "session",
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
});
