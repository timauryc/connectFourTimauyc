const path = require('path')
const PORT = process.env.PORT || 3000
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use('/games/:player', express.static(path.join(__dirname, "public")))

app.get('/games/:player', (req, res) => {
    res.send("<b>Just 2 players allowed, please go to /games/1 or games/2<b>")
    // if (req.params.player == '1' || req.params.player == '2')
    //     res.sendFile(__dirname + '/public/index.html');
    // else
});

io.on('connection', (socket) => {
    console.info("A connection was established")
    socket.on('play', (path) => {
        console.log(`A play was made from ${path}`)
        io.emit('play', `${path}`);
    });
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});
