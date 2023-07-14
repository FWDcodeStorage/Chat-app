const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("server is running on port 3000");
});

//socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//connected
io.on("connection", (socket) => {
  console.log(`user ${socket.id} is connected`);

  //join a room
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`user ${socket.id} joined a room ${data.room}`);
  });

  //send a message
  socket.on("send_message", (data) => {
    console.log(data);
    // socket.emit("receive_message", data)
    socket.to(data.room).emit("receive_message", data);
    console.log(`user: ${data.username} sent a message: ${data.message}`);
  });

  //disconnected
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});
