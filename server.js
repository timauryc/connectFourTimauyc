const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/games/:player', (req, res) => {
    if (req.params.player == '1' || req.params.player == '2')
        res.sendFile(__dirname + '/public/game.html');
    else
        res.send("<b>Just 2 players allowed<b>")
});

io.on('connection', (socket) => {
    console.info("A connection was established")
    socket.on('play', (path) => {
        console.log(`A play was made from ${path}`)
        io.emit('play', `${path}`);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
