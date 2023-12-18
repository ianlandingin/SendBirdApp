import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import channelRoutes from "./routes/channelRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const env = dotenv.config();
const APP = express();

// Middleware for handling CORS Policy
// Option 1: Allow all origin with default cors()
APP.use(cors());
// Option 2: Allow custom origins
// APP.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

const PORT = process.env.PORT || 5555;
APP.listen(PORT, () => {
  console.log(`Server is up and listening to port ${PORT}`);
});

// Middleware for parsing body
APP.use(express.json());

APP.use(process.env.BASEURL, userRoutes);
APP.use(process.env.BASEURL, channelRoutes);
