// https://www.codingame.com/training/easy/rectangle-partition

[width, height, cX, cY] = readline().split(' ');

console.log(getAllSquares(getPoints(width), getPoints(height)));

function getAllSquares(pointsX, pointsY) {
    var squares = 0;
    for (let i = 1; i < pointsX.length; i++) {
        for (let j = 1; j < pointsY.length; j++) {
            for (let k = 0; k < i; k++) {
                for (let l = 0; l < j; l++) {
                    if (pointsX[i] - pointsX[k] === pointsY[j] - pointsY[l]) {
                        squares++;
                    }
                }
            }
        }
    }
    return squares;
}

function getPoints(lastPoint) {
    return [0, ...readline().split(' ').map(Number), lastPoint];
}