// const io = require("socket.io")(5000);

// io.on("connection", (socket) => {
//   const id = socket.handshake.query.id;
//   socket.join(id);

//   socket.on("send-message", ({ recipients, text }) => {
//     console.log(recipients);
//     recipients.forEach((recipient) => {
//       const newRecipients = recipients.filter((r) => r !== recipient);
//       newRecipients.push(id);
//       socket.broadcast.to(recipient).emit("receive-message", {
//         recipients: newRecipients,
//         sender: id,
//         text,
//       });
//     });
//   });
// });

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log("message sent", data);
    socket.to(data.recipient).emit("receive_message", data.message);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
