const path = require('path')
const PORT = process.env.PORT || 3000
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Game = require("./resources/gameController")


app.use('/games/1', express.static(path.join(__dirname, "public")))
app.use('/games/2', express.static(path.join(__dirname, "public")))

let game;

io.on('connection', (socket) => {
    //#region managing a new connection
    console.info(`A connection was established ${socket.request.headers.referer}`)
    io.emit('notify' , socket.request.headers.referer)
    let player = socket.request.headers.referer.indexOf("/games/1") > -1 ? "player-one" : "player-two"
    if (!game) {
        game = new Game()
        game.newPlayer(player)
        io.emit('notify', 'Welcome! waiting for another player to start...')
    } else if (!game.readyToPlay() && game.canJoin(player)) {
        game.newPlayer(player)
        io.emit('notify', `Great! ${player} has joined the game. Lets play!!`)
    } else {
        socket.emit('resumeGame', game.getTurn(), game.getBoard())
    }
    //#endregion

    //#region Managing a play
    socket.on('play', (player, index) => {
        if (game.readyToPlay()) {
            if (game.getTurn() == player) {
                if (!game.play(player, index)) {
                    socket.emit('feedback', "Sorry, can't do that move")
                } else {
                    io.emit('draw', player, index)
                }
            } else {
                socket.emit('feedback', "Chill, it's not your turn :)")
            }
        } else {
            socket.emit('feedback', "The other player has not connected yet, let's wait for it :)")
        }
    });
    //#endregion managing a finished play

    //#region managing a successful play 
    socket.on('verify', (player) => {
        if (game.getWinner()) {
            io.emit('notify', `Congratulations ${player}! You won the game!! Now the game is about to reset...`)
            resetGame()
        }
        if (game.isStuck()) {
            io.emit('notify', `Hmmm...Seems like we have a draw D:`)
            resetGame()
        }
    });
    //#endregion

    //#region managing a reset
    socket.on('reset', (player) => {
        io.emit('notify', `${player} reset the game`)
        resetGame()
    });
    //#endregion

    function resetGame() {
        io.emit('clearBoard')
        game = new Game()
        game.newPlayer("player-one")
        game.newPlayer("player-two")
    }

});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});
