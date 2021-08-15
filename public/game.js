document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const result = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#current-player')
    const resetBtn = document.querySelector('#resetBtn')
    let socket = io();

    resetBtn.onclick = () => {
        let playerId = window.location.pathname.indexOf("1") > -1 ? "player-one" : "player-two"
        socket.emit('reset', playerId)
    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].onclick = () => {
            let playerId = window.location.pathname.indexOf("1") > -1 ? "player-one" : "player-two"
            socket.emit('play', playerId, i);
        }
    }


    socket.on('notify', function (message) {
        alert(message)
    });

    socket.on('feedback', function (message) {
        alert(message)
    });

    socket.on('draw', function (lastPlayer, i) {
        squares[i].classList.add(lastPlayer)
        displayCurrentPlayer.innerHTML = lastPlayer == "player-one" ? "player-two" : "player-one"
        socket.emit('verify', lastPlayer);
    });

    socket.on('clearBoard', function () {
        for (let i = 0; i < squares.length; i++) {
            squares[i].classList.remove("player-one")
            squares[i].classList.remove("player-two")
        }
    });
})
