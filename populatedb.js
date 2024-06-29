#! /usr/bin/env node

console.log(
  "This script populates some test users and messages. Specify database as argument - e.g: node populatedb 'databse url' "
);

// Get arguments passed on command line.
const userArgs = process.argv.slice(2);

const bcrypt = require("bcryptjs");

const User = require("./models/user");
const Message = require("./models/message");

const users = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();
  console.log("Debug: Closing mongoose");
  // I can not figure out yet how to save users before closing the connection after using bcrypt.
  // mongoose.connection.close();
}

async function userCreate(index, first_name, last_name, username, password) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    username: username,
  });

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return;
    }

    user.password = hashedPassword;
    await user.save();
    console.log(`Added user: ${first_name} ${last_name}`);
  });

  users[index] = user;
}

async function messageCreate(index, title, text, author) {
  const message = new Message({
    title: title,
    text: text,
    author: author,
  });

  await message.save();
  messages[index] = message;
  console.log(`Added message: ${title}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "Erbar", "MerryBang", "erbar", "abc123"),
    userCreate(1, "Groodley", "Altertail", "groodley", "abc123"),
    userCreate(2, "Axle", "Goldpinch", "axle", "abc123"),
    userCreate(3, "Kizz", "Sharpwheedle", "kizz", "abc123"),
    userCreate(4, "Golganar", "Firehammer", "golganar", "abc123"),
  ]);
}

async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(0, "Message 1", "Message 1 text", users[0]),
    messageCreate(1, "Message 2", "Message 1 text", users[1]),
    messageCreate(2, "Message 3", "Message 1 text", users[2]),
    messageCreate(3, "Message 4", "Message 1 text", users[3]),
    messageCreate(4, "Message 5", "Message 1 text", users[4]),
  ]);
}
