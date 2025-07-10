import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "https://chat-application-29sm.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
};

// app.use(cors({
//   origin: 'https://chat-application-29sm.vercel.app', // frontend का URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.use(cors(corsOptions));

// ✅ Handle preflight requests (very important)
// app.options("*", cors(corsOptions));

// DATABASE
const PORT = 8090;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// ROUTES
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// SERVER START
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
