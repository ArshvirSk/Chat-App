const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     // origin: "*",
//     // origin: "https://salty-retreat-48240.herokuapp.com",
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//   },
// });

const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
// // server.listen(3001, () => {
//   io.on("connection", socket => {
//     console.log("SERVER RUNNING");
//     console.log("ok");
//     console.log(socket.id);
//     // io.in(roomID).emit()
//     socket.emit("WELCOME_MESSAGE", ` ${socket.id} welcome!! `);
//   });
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// if (process.env.NODE_ENV === 'production') {
//   // Exprees will serve up production assets
//   app.use(express.static('client/build'));

//   // Express serve up index.html file if it doesn't recognize route
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.send('hello world!!');
//   });
// };

app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors())

app.get('/', (req, res)=>{
  res.send("Welcome to your server")
})

app.listen(PORT, ()=>{
  console.log(`Server is runing on port ${PORT}`)
})