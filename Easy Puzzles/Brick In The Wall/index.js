// https://www.codingame.com/ide/puzzle/brick-in-the-wall

const bricksByRow = +readline();
const bricksNumber = +readline(); // Not Use

var bricks = getBricks();
var wall = createWall(bricks, bricksByRow);
minimumlEffort(wall)

function getBricks() {
    var bricks = readline().split(' ').map(Number);
    bricks.sort((a, b) => { return b - a });
    return bricks;
}

function createWall(bricks, bricksByRow) {
    var wall = [];
    wall[0] = [];
    j = level = 0;
    bricks.forEach((brick, index) => {
        if (j === bricksByRow) {
            j = 0;
            wall[++level] = [];
        }
        wall[level][j++] = brick;
    })
    return wall;
}

function minimumlEffort(wall) {
    var result = 0;
    wall.forEach((row, index) => {
        row.forEach(brick => result += (index * 6.5 / 100) * 10 * brick)
    })
    console.log(result.toFixed(3));
}
