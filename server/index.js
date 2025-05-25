const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const OpenAI = require("openai");
const fs = require("fs");
require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("join-room", (room) => {
    console.log(`User joined room ${room}`);
    socket.join(room);
    // Store the room information in the socket object for later use
    socket.currentRoom = room;
  });

  socket.on("send-message", (message) => {
    console.log(message);
    // Broadcast the message to all users in the current room
    if (socket.currentRoom) {
      io.to(socket.currentRoom).emit("receive-message", message);
    } else {
      console.log("Error: User not in any room.");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

// make a route api/speechToText
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.use(cors());
app.use(express.json());
app.post("/api/speechToText", async (req, res) => {
  const { audio } = req.body;
  const base64Audio = Buffer.from(audio, "base64");
  const filePath = "input.wav";
  try {
    console.log("working");
    fs.writeFileSync(filePath, base64Audio);
    const readStream = fs.createReadStream(filePath);
    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });
    fs.unlinkSync(filePath);
    res.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    return error;
  }
});
