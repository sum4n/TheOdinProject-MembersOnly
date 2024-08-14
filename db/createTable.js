#! /usr/bin/env node

// RUN THIS ONLY ONCE.

// Get arguments passed on command line.
const userArgs = process.argv.slice(2);
const connectionString = userArgs[0];

// If no database connection string.
if (connectionString == undefined) {
  return;
}

const { Client } = require("pg");

const SQL = `
   DROP TABLE IF EXISTS users;
   DROP TABLE IF EXISTS messages;

  CREATE TABLE IF NOT EXISTS users(
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    username VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    membership BOOLEAN NOT NULL DEFAULT FALSE,
    admin BOOLEAN NOT NULL DEFAULT FALSE
  );

  CREATE TABLE IF NOT EXISTS messages(
    message_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL REFERENCES users(user_id)
  )
`;

async function createTables() {
  console.log("Creating tables...");
  const client = new Client({ connectionString });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

createTables();
