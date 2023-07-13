const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors());

const server = http.createServer(app)

server.listen(3000, () => {
    console.log('server is running on port 3000')
})

const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {
    //connected
    console.log(`user ${socket.id} is connected`)

    //join a room
    socket.on("join_room", data => {
        socket.userId = data;
        socket.join(data.room)
    })

    //send a message
    socket.on("send_message", data => {
        socket.in(data.room).emit("receive_message", data)
    })

    //disconnected
    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`)
    })
})

