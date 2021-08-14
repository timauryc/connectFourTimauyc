const path = require('path')
const PORT = process.env.PORT || 3000
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Game = require("./resources/gameController")


app.use('/games/:player', express.static(path.join(__dirname, "public")))

let game;

io.on('connection', (socket) => {
    //#region managing a new connection
    console.info(`A connection was established ${socket.request.headers.referer}`)
    let player = socket.request.headers.referer.indexOf("1") > -1 ? "player-one" : "player-two"
    if (!game) {
        game = new Game()
        game.newPlayer(player)
        io.emit('notify', 'Welcome! waiting for another player to start...')
    } else if (!game.readyToPlay() && game.canJoin(player)) {
        game.newPlayer(player)
        io.emit('notify', `Great! ${player} has joined the game. Lets play!!`)
    };
    //#endregion
    socket.on('play', (player, index) => {
        console.log(`A play was made from ${player} on square ${index}`)
        io.emit('play', player, index);
    });
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});
