import express from "express";
import client from "../db/db.js";
const ROUTER = express.Router();

// GET all users
ROUTER.get("/users/", async (request, response) => {
  try {
    const results = await client.query("SELECT * FROM users");
    response.status(200).json({
      results: results.rows.length,
      users: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Get a user
ROUTER.get("/users/:id", async (request, response) => {
  try {
    const results = await client.query(
      "SELECT * FROM users WHERE id=$1 LIMIT 1",
      [request.params.id]
    );
    response.status(200).json({
      results: results.rows.length,
      user: results.rows[0],
    });
    console.log(request.params.id);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Add a user to database
ROUTER.post("/users/", async (request, response) => {
  try {
    const results = await client.query(
      "INSERT INTO users (id, nickname, profile_url) VALUES ($1,  $2, $3) RETURNING *;",
      [request.body.id, request.body.nickname, request.body.profile_url]
    );
    response.status(200).json({
      status: "Success",
      user: results.rows[0],
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Update user details
ROUTER.put("/users/:id", async (request, response) => {
  try {
    const results = await client.query(
      "UPDATE users SET nickname = $2, profile_url = $3 WHERE id = $1 RETURNING *",
      [request.params.id, request.body.nickname, request.body.profile_url]
    );
    response.status(200).json({
      status: "Success",
      user: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Delete a user
ROUTER.put("/users/:id/delete", async (request, response) => {
  try {
    const results = await client.query(
      "UPDATE users SET is_deleted = $2 WHERE id = $1 RETURNING *",
      [request.params.id, request.body.is_deleted]
    );
    response.status(204).json({
      status: "success",
      deleted_user: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

export default ROUTER;
