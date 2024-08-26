const pool = require("./pool");

// User queries
async function findUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT user_id FROM users WHERE username = $1",
    [username]
  );
  return rows;
}

async function getUserByUserId(user_id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    user_id,
  ]);
  return rows;
}

async function createUser(first_name, last_name, username, password) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password]
  );
}

async function updateMembership(membership, user_id) {
  await pool.query("UPDATE users SET membership = $1 WHERE user_id = $2", [
    !membership, // Set the opposite value
    user_id,
  ]);
}

async function updateAdmin(admin, user_id) {
  await pool.query("UPDATE users SET admin = $1 WHERE user_id = $2", [
    !admin, // Set opposite value
    user_id,
  ]);
}

// Message queries
async function getAllMessagesWithUser() {
  const { rows } = await pool.query(
    "SELECT title, content, created_at, updated_at, first_name, last_name, messages.message_id, users.user_id FROM messages JOIN users ON messages.user_id = users.user_id"
  );
  return rows;
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT title, content FROM messages");
  return rows;
}

async function getMessageByUserId(user_id) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE user_id = $1",
    [user_id]
  );
  return rows;
}

async function createMessage(title, content, user_id) {
  await pool.query(
    "INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)",
    [title, content, user_id]
  );
}

async function deleteMessage(message_id) {
  await pool.query("DELETE FROM messages WHERE message_id = $1", [message_id]);
}

module.exports = {
  findUserByUsername,
  getUserByUserId,
  createUser,
  updateMembership,
  updateAdmin,
  getAllMessagesWithUser,
  getAllMessages,
  getMessageByUserId,
  createMessage,
  deleteMessage,
};
