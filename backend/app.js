const express = require('express');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
// const io = socketIo(server);
// const io = require("socket.io")(server, {
//     cors: {
//       origin: "https://social-media-frontend-s1fc.onrender.com",
//       methods: ["GET", "PUT"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://social-media-frontend-s1fc.onrender.com",
  },
});

app.use(cors());

require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("newComment", ({ postId, comments }) => {
   
    io.emit("updateComments", { postId, comments });
  });

  socket.on("likePost", ({ postId, likes }) => {
    
    io.emit("updateLikeCount", { postId, likes });
  });

});




server.listen(port, () => {
    console.log("server is running on port" + " " + port)

})
