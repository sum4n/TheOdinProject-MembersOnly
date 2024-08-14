const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const passport = require("passport");
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

exports.log_in_get = asyncHandler(async (req, res) => {
  res.render("pages/log-in");
});

exports.log_in_post = asyncHandler(async (req, res) => {
  res.send("POST log-in: WIP");
});

exports.register_get = asyncHandler(async (req, res) => {
  res.render("pages/register");
});

exports.register_post = asyncHandler(async (req, res) => {
  res.send("POST register: WIP");
});
