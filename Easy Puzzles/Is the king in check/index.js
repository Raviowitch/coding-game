var ennemy, king = null;

findKingAndEnnemy();
console.log(game(ennemy, king) ? 'Check' : 'No Check');

function findKingAndEnnemy() {
    for (let i = 0; i < 8; i++) {
        const chessRow = readline().replace(/\s/g, '').split('');
        chessRow.forEach((cell, index) => {
            if (cell === 'K') {
                king = [index, i];
            } else if (cell !== '_') {
                ennemy = [index, i, cell];
            }
        })
    }
}
function game() {
    var check = false;
    if (ennemy[2] === 'R') {
        check = checkHorizontally() || checkVertically();
    } else if (ennemy[2] === 'B') {
        check = checkDiagonally();
    } else if (ennemy[2] === 'Q') {
        check = checkHorizontally() || checkVertically() || checkDiagonally();
    } else if (ennemy[2] === 'N') {
        check = checkLShape();
    }
    return check;
}

function checkHorizontally() {
    return ennemy[1] === king[1];
}

function checkVertically() {
    return ennemy[0] === king[0];
}

function checkDiagonally() {
    return Math.abs(ennemy[0] - ennemy[1]) === Math.abs(king[0] - king[1]) ||
        (ennemy[0] + ennemy[1]) === (king[0] + king[1])
}

function checkLShape() {
    if (checkHorizontally() || checkVertically() || checkDiagonally()) {
        return false;
    } else if (((king[0] - ennemy[0]) ** 2 + (king[1] - ennemy[1]) ** 2) === 5) {
        return true;
    }
    return false;
}