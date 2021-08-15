document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const result = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#current-player')
    let currentPlayer = 1
    let socket = io();
    
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
    
    socket.on('draw', function (player, i) {
        squares[i].classList.add(player)
        displayCurrentPlayer.innerHTML = player
        socket.emit('verify', player);
    });
})
