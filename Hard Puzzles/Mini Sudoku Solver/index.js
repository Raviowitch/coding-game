// https://www.codingame.com/training/hard/mini-sudoku-solver

const grille = createGrid();
isValid(grille, 0);
displayResult(grille);

function createGrid() {
    var grille = [];
    grille.push(readline().split('').map(Number));
    grille.push(readline().split('').map(Number));
    grille.push(readline().split('').map(Number));
    grille.push(readline().split('').map(Number));
    return grille;
}

function notInLine(k, grille, i) {
    for (let j = 0; j < 4; j++) {
        if (grille[i][j] === k) {
            return false;
        }
    }
    return true;
}

function notInColumn(k, grille, j) {
    for (let i = 0; i < 4; i++) {
        if (grille[i][j] === k) {
            return false;
        }
    }
    return true;
}

function notInBloc(k, grille, i, j) {
    var _i = i - (i % 2)
    var _j = j - (j % 2);
    for (x = _i; x < _i + 2; x++)
        for (y = _j; y < _j + 2; y++)
            if (grille[x][y] === k)
                return false;
    return true;
}


function isValid(grille, position) {
    if (position == 4 * 4)
        return true;

    var i = Math.trunc(position / 4);
    var j = Math.trunc(position % 4);
    if (grille[i][j] !== 0) {
        return isValid(grille, position + 1);
    }

    for (let k = 1; k <= 4; k++) {
        if (notInLine(k, grille, i) && notInColumn(k, grille, j) && notInBloc(k, grille, i, j)) {
            grille[i][j] = k;

            if (isValid(grille, position + 1))
                return true;
        }
    }
    grille[i][j] = 0;

    return false;
}

function displayResult(grille) {
    grille.forEach(line => {
        console.log(line.join(''))
    })
}