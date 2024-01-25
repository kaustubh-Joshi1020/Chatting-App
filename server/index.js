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
   
    socket.on('message', ({message,room}) => {
        // console.log(message)
        // console.log(room)
        // io.emit("received-msg",message)
        io.to(room).emit('received-msg', message);
    })


})


server.listen(PORT,()=>{console.log(`server started at ${PORT}`)})