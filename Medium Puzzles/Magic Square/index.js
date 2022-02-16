// https://www.codingame.com/training/medium/magic-square

const n = +readline();
var magicSquare = [...Array(n)].map(_ => readline().split(' ').map(Number));

if (isMagicSquare(magicSquare)) {
    console.log('MAGIC');
} else {
    console.log('MUGGLE');
}

function isMagicSquare(magicSquare) {
    var sumToFind = magicSquare[0].reduce((previous, actual) => previous + actual, 0);
    return checkEveryCellAreDifferent(magicSquare)
        && checkMagicSquareHorizontally(magicSquare, sumToFind)
        && checkMagicSquareVertically(magicSquare, sumToFind)
        && checkMagicSquareDiagonally(magicSquare, sumToFind);
}

function checkEveryCellAreDifferent(magicSquare) {
    var values = [];
    for (let i = 0; i < magicSquare.length; i++) {
        for (let j = 0; j < magicSquare.length; j++) {
            var val = magicSquare[j][i];
            if (!values.includes(val) && val > 0 && val <= n**2) {
                values.push(val);
            } else {
                return false;
            }
        }
    }
    return true;
}

function checkMagicSquareHorizontally(magicSquare, sumToFind) {
    magicSquare.forEach(line => {
        if (line.reduce((previous, actual) => previous + actual, 0) !== sumToFind) {
            return false;
        }
    });
    return true;
}

function checkMagicSquareVertically(magicSquare, sumToFind) {
    for (let i = 0; i < magicSquare.length; i++) {
        var sum = 0;
        for (let j = 0; j < magicSquare.length; j++) {
            sum += magicSquare[j][i]
        }
        if (sum !== sumToFind) {
            return false;
        }
    }
    return true;
}

function checkMagicSquareDiagonally(magicSquare, sumToFind) {
    var sumDiag1 = 0;
    var sumDiag2 = 0;
    for (let i = 0; i < magicSquare.length; i++) {
        sumDiag1 += magicSquare[i][i]
        sumDiag2 += magicSquare[magicSquare.length - 1 - i][i]
    }
    if (sumDiag1 !== sumToFind || sumDiag2 !== sumToFind) {
        return false;
    }
    return true;
}