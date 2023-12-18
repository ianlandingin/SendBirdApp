import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";

// Initialize dotenv for pkg Client
const env = dotenv.config();

const client = new Client();

await client.connect();

export default client;
