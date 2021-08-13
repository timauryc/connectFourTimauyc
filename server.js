const path = require('path')
const PORT = process.env.PORT || 3000
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use('/games/:player', express.static(path.join(__dirname, "public")))


io.on('connection', (socket) => {
    console.info("A connection was established")
    socket.on('play', (player, index) => {
        console.log(`A play was made from ${player} on square ${index}`)
        io.emit('play', player, index);
    });
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});
