import express from "express";
import client from "../db/db.js";
const ROUTER = express.Router();

// GET all channels
ROUTER.get("/channels/", async (request, response) => {
  try {
    const results = await client.query("SELECT * FROM channels");
    response.status(200).json({
      results: results.rows.length,
      channels: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Get a channel
ROUTER.get("/channels/:channel_url", async (request, response) => {
  try {
    const results = await client.query(
      "SELECT * FROM channels WHERE channel_url=$1 LIMIT 1",
      [request.params.channel_url]
    );
    response.status(200).json({
      results: results.rows.length,
      channel: results.rows[0],
    });
    console.log(request.params.channel_url);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Add a channel to database
ROUTER.post("/channels/", async (request, response) => {
  try {
    const results = await client.query(
      "INSERT INTO channels (channel_url, owner_user_id, chatmate_id, messages) VALUES ($1,  $2, $3, $4) RETURNING *;",
      [
        request.body.channel_url,
        request.body.owner_user_id,
        request.body.chatmate_id,
        request.body.messages,
      ]
    );
    response.status(200).json({
      status: "Success",
      channel: results.rows[0],
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Update channel details
ROUTER.put("/channels/:channel_url", async (request, response) => {
  try {
    const results = await client.query(
      "UPDATE channels SET messages = $2 WHERE channel_url = $1 RETURNING *",
      [request.params.channel_url, request.body.messages]
    );
    response.status(200).json({
      status: "Success",
      channel: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Delete a channel
ROUTER.delete("/channels/:channel_url", async (request, response) => {
  try {
    const results = await client.query(
      "DELETE FROM channels WHERE id = $1 RETURNING *",
      [request.params.channel_url]
    );
    response.status(204).json({
      status: "success",
      deleted_restaurant: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

export default ROUTER;
