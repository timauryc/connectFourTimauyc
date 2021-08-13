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

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg, path) => {
//         console.log(`message was sent from ${path}`)
//         io.emit('chat message', `user from ${path} said ${msg}`);
//     });
// });

server.listen(3000, () => {
    console.log('listening on *:3000');
});
