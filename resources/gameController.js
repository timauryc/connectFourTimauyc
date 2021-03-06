module.exports = class Game {
    constructor() {
        this.turn = "player-one";
        this.winner = null
        this.playerOneIn = false;
        this.playerTwoIn = false;
        this.winningArrays = [
            [0, 1, 2, 3],
            [41, 40, 39, 38],
            [7, 8, 9, 10],
            [34, 33, 32, 31],
            [14, 15, 16, 17],
            [27, 26, 25, 24],
            [21, 22, 23, 24],
            [20, 19, 18, 17],
            [28, 29, 30, 31],
            [13, 12, 11, 10],
            [35, 36, 37, 38],
            [6, 5, 4, 3],
            [0, 7, 14, 21],
            [41, 34, 27, 20],
            [1, 8, 15, 22],
            [40, 33, 26, 19],
            [2, 9, 16, 23],
            [39, 32, 25, 18],
            [3, 10, 17, 24],
            [38, 31, 24, 17],
            [4, 11, 18, 25],
            [37, 30, 23, 16],
            [5, 12, 19, 26],
            [36, 29, 22, 15],
            [6, 13, 20, 27],
            [35, 28, 21, 14],
            [0, 8, 16, 24],
            [41, 33, 25, 17],
            [7, 15, 23, 31],
            [34, 26, 18, 10],
            [14, 22, 30, 38],
            [27, 19, 11, 3],
            [35, 29, 23, 17],
            [6, 12, 18, 24],
            [28, 22, 16, 10],
            [13, 19, 25, 31],
            [21, 15, 9, 3],
            [20, 26, 32, 38],
            [36, 30, 24, 18],
            [5, 11, 17, 23],
            [37, 31, 25, 19],
            [4, 10, 16, 22],
            [2, 10, 18, 26],
            [39, 31, 23, 15],
            [1, 9, 17, 25],
            [40, 32, 24, 16],
            [9, 17, 25, 33],
            [8, 16, 24, 32],
            [11, 17, 23, 29],
            [12, 18, 24, 30],
            [1, 2, 3, 4],
            [5, 4, 3, 2],
            [8, 9, 10, 11],
            [12, 11, 10, 9],
            [15, 16, 17, 18],
            [19, 18, 17, 16],
            [22, 23, 24, 25],
            [26, 25, 24, 23],
            [29, 30, 31, 32],
            [33, 32, 31, 30],
            [36, 37, 38, 39],
            [40, 39, 38, 37],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 16, 23, 30],
            [10, 17, 24, 31],
            [11, 18, 25, 32],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
        ];
        this.board = new Array(49)
        for (let i = 48; i > 41; i--) {
            this.board[i] = "taken"
        }
    }

    newPlayer = (player) => {
        if (player == "player-one")
            this.playerOneIn = true
        else
            this.playerTwoIn = true
    };

    canJoin = (player) => {
        return player == "player-one" ? !this.playerOneIn : !this.playerTwoIn
    }

    readyToPlay = () => {
        return this.playerOneIn && this.playerTwoIn
    }

    play = (player, i) => {
        if (this.board[i + 7] && !this.board[i]) {
            if (player == "player-one") {
                this.board[i] = 'player-one'
                this.turn = "player-two"
            } else if (player == "player-two") {
                this.board[i] = 'player-two'
                this.turn = "player-one"
            }
            return true
        } else
            return false
    }

    getWinner = () => {
        for (let y = 0; y < this.winningArrays.length; y++) {
            const square1 = this.board[this.winningArrays[y][0]]
            const square2 = this.board[this.winningArrays[y][1]]
            const square3 = this.board[this.winningArrays[y][2]]
            const square4 = this.board[this.winningArrays[y][3]]

            //check those squares to see if they all have the class of player-one
            if (
                square1 == 'player-one' &&
                square2 == 'player-one' &&
                square3 == 'player-one' &&
                square4 == 'player-one'
            ) {
                this.winner = 'player-one'
            }
            //check those squares to see if they all have the class of player-two
            if (
                square1 == 'player-two' &&
                square2 == 'player-two' &&
                square3 == 'player-two' &&
                square4 == 'player-two'
            ) {
                this.winner = 'player-two'
            }
        }
        return this.winner
    }

    isStuck = () => {
        return !this.board.includes(undefined)
    }

    getTurn = () => {
        return this.turn
    }

    getBoard = () => {
        return this.board
    }
}

