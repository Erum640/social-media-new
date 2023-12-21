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
const io = require("socket.io")(server, {
    cors: {
      origin: "https://social-media-frontend-s1fc.onrender.com",
      methods: ["GET", "PUT"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
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

io.on('connection', (socket) => {
    console.log('A user connected'); 
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });




server.listen(port, () => {
    console.log("server is running on port" + " " + port)

})
