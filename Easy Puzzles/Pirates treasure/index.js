// https://www.codingame.com/training/easy/pirates-treasure

const W = +readline();
const H = +readline();

gameLoop();

function gameLoop() {
    var map = [...Array(H)].map(_ => readline().split(' '));
    map.forEach((row, indexY) => {
        row.forEach((cell, indexX) => {
            if (cell === '0' && isTreasurePosition(indexX, indexY, map)) {
                console.log(`${indexX} ${indexY}`);
            }
        })
    })
}

function isTreasurePosition(x, y, map) {
    var neighboors = getNeighboors(x, y, map);
    if (inCorner(x, y) && neighboors === 3) {
        return true;
    } else if (inEdge(x, y) && neighboors === 5) {
        return true;
    } else if (neighboors === 8) {
        return true;
    }
}

function inCorner(x, y) {
    return (x === 0 && y === 0) || (x === 0 && y === H - 1) || (x === W - 1 && y === 0) || (x === W - 1 && y === H - 1);
}

function inEdge(x, y) {
    return x === 0  || y === 0 || x === W - 1 || y === H - 1;
}

function getNeighboors(x, y, map) {
    var result = 0;
    if (x < W - 1 && map[y][x+1] === '1') result++;
    if (x < W - 1 && y < H - 1 && map[y+1][x+1] === '1') result++;
    if (x < W - 1 && y > 0 && map[y-1][x+1] === '1') result++;
    if (x > 0 && map[y][x-1] === '1') result++;
    if (x > 0 && y < H - 1 && map[y+1][x-1] === '1') result++;
    if (x > 0 && y > 0 && map[y-1][x-1] === '1') result++;
    if (y < H - 1 && map[y+1][x] === '1') result++;
    if (y > 0 && map[y-1][x] === '1') result++;

    return result
}