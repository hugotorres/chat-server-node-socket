const express = require("express");
const http = require("http");
const {Server} = require('socket.io');
const app= express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
    origin:"*",
    methods: ['GET','POST']
    }
});

io.on('connection',socket=>{
    console.log(`user ${socket.id} connected`);

    const joinedUser = {
        id:new Date().getTime(),
        user: "",
        text: "user has joined"
    };
    socket.broadcast.emit('message:received', joinedUser);

    socket.on('message',data => {
        socket.broadcast.emit('message:received', data);
    })

    socket.on('disconnect',()=>{
        const message = {
            id:new Date().getTime(),
            user: "",
            text: "user has left"
        }
        socket.broadcast.emit('message:received', message);
    })
})

server.listen(3000, ()=>{
    console.log('chat server running on 3000')
})