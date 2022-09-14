const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;

// const server = app.listen(PORT);
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
    origin: "*",
    // origin: "http://localhost:3000",
    // origin: "https://salty-retreat-48240.herokuapp.com",
    methods: ["GET", "POST"],
  },
});


server.listen(PORT, () => {
// server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

  socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
      res.send('hello world!!');
  });
}