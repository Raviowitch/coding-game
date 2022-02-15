// https://www.codingame.com/training/easy/tictactoe

var play = (board, [y, x]) => {
    board[y][x] = 'O';
}

var check = (board) => {
    var oneWinCondition = false;
    var v1 = board[0][0] + board[1][0] + board[2][0];
    var v2 = board[0][1] + board[1][1] + board[2][1];
    var v3 = board[0][2] + board[1][2] + board[2][2];
    [v1, v2, v3].forEach((line, index) => {
        if ((line.match(/O/g) || []).length === 2 && line.includes('.')) {
            play(board, [line.indexOf('.'), index]);
            oneWinCondition = true;
        }
    })
    
    var h1 = board[0][0] + board[0][1] + board[0][2];
    var h2 = board[1][0] + board[1][1] + board[1][2];
    var h3 = board[2][0] + board[2][1] + board[2][2];
    [h1, h2, h3].forEach((line, index) => {
        if ((line.match(/O/g) || []).length === 2 && line.includes('.')) {
            play(board, [index, line.indexOf('.')]);
            oneWinCondition = true;
        }
    })
    
    var d1 = board[0][2] + board[1][1] + board[2][0];
    var d2 = board[0][0] + board[1][1] + board[2][2];
    [d1, d2].forEach((line, index) => {
        if ((line.match(/O/g) || []).length === 2 && line.includes('.')) {
            var y = line.indexOf('.');
            var x = index === 1 ? line.indexOf('.') : 2 - line.indexOf('.');
            play(board, [y, x]);
            oneWinCondition = true;
        }
    })
    return oneWinCondition;
}

gameLoop(createBoard());
function gameLoop(tictactoe) {
    if (check(tictactoe)) {
        tictactoe.forEach(line => {
            console.log(line.join(''));
        })
    } else {
        console.log(false);
    }
}

function createBoard() {
    var board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = readline().split('');
    }
    return board;
}