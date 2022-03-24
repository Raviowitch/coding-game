// https://www.codingame.com/training/easy/a-childs-play

[w, h] = readline().split(' ').map(Number);
var n = +readline();

var robotPosition, initialPosition = [];
var map = [...Array(h)].map((_, index) => {
    const line = readline();
    if (line.includes('O')) {
        robotPosition = [line.indexOf('O'), index];
    }
    return line;
})

var directions = ['U', 'R', 'D', 'L'];
var nextDirection = 0;

gameLoop();

function gameLoop() {
    if (n > 100000) {
        var oneLoopSize = 0;
        while ((map[robotPosition[1]][robotPosition[0] - 1] !== '#')) {
            if (map[robotPosition[1]][robotPosition[0] - 1] !== '#') {
                n--;
            }
            moveRobot(directions[nextDirection % 4], map);
        }
        initialPosition = [...robotPosition];
        do {
            moveRobot(directions[nextDirection % 4], map);
            oneLoopSize++;
        } while ((robotPosition[0] !== initialPosition[0] || robotPosition[1] !== initialPosition[1]) && oneLoopSize < n);

        n = n % oneLoopSize;
    }

    while (n > 0) {
        moveRobot(directions[nextDirection % 4], map);
        n--;
    }
    console.log(robotPosition[0] + ' ' + robotPosition[1])
}

function moveRobot(direction, map) {
    let changeDirection = false;
    switch (direction) {
        case 'U':
            if (map[robotPosition[1] - 1][robotPosition[0]] !== '#') {
                robotPosition[1] -= 1;
            } else {
                changeDirection = true;
            }
            break;
        case 'D':
            if (map[robotPosition[1] + 1][robotPosition[0]] !== '#') {
                robotPosition[1] += 1;
            } else {
                changeDirection = true;
            }
            break;
        case 'L':
            if (map[robotPosition[1]][robotPosition[0] - 1] !== '#') {
                robotPosition[0] -= 1;
            } else {
                changeDirection = true;
            }
            break;
        case 'R':
            if (map[robotPosition[1]][robotPosition[0] + 1] !== '#') {
                robotPosition[0] += 1;
            } else {
                changeDirection = true;
            }
            break;
    }
    if (changeDirection) {
        moveRobot(directions[++nextDirection % 4], map)
    }
}
