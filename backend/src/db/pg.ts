import { Pool } from "pg";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// to check if postgreSQL is running use: sudo systemctl status postgresql
// to start postgreSQL use: sudo systemctl start postgresql
// to open postgreSQL node repl use: sudo -u postgres psql

// PostgreSQL client setup
const pool = new Pool({
  user: "your_username", // replace with your PostgreSQL username
  host: "localhost", // PostgreSQL server host
  database: "your_db", // replace with your database name
  password: "your_password", // replace with your password
  port: 5432, // default PostgreSQL port
});

// Function to get all users from the database
export const getUsers = async () => {
  try {
    const res = await pool.query("SELECT * FROM users");
    return res.rows;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// Function to add a user to the database
export const addUser = async (name: string, email: string) => {
  try {
    const res = await pool.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );
    return res.rows[0];
  } catch (err) {
    console.error("Error adding user:", err);
    throw err;
  }
};
