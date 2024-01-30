const express = require('express')
const app = express()
const PORT = 8000;
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const server = createServer(app);
const io = new Server(server , {
    cors : {
        origin : "http://localhost:3000",
        methods: ["GET" , "POST"],
        credentials : true
    }
});
const cors = require("cors")


app.use(cors())
app.use(express.static('./views'))

io.on('connection', (socket) => {
    // console.log("user connected : " + socket.id)  

    socket.on('disconnect', () => {
        // console.log("user disconnected : " + socket.id)
    })
   
    socket.on("Group" , (Group)=>{
        socket.join(Group);
        console.log("a user has joined Group")
    })

    socket.on('message', ({message,room , senderId}) => {
        // console.log(message)
        // console.log(room)
        // io.emit("received-msg",message)
        io.to(room).emit('received-msg', {message ,senderId });
    })


})


server.listen(PORT,()=>{console.log(`server started at ${PORT}`)})