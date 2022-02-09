gameLoop();

function gameLoop() {
    // Map Size
    var inputs = readline().split(' ');
    const mapWidth = +inputs[0];
    const mapHeight = +inputs[1];

    // Start position 
    var inputs = readline().split(' ');
    const startRow = +inputs[0];
    const startCol = +inputs[1];

    const numberOfMaps = +readline();

    var bestPathLength = -1;
    var bestMapIndex = 'TRAP';
    for (let i = 0; i < numberOfMaps; i++) {
        var map = [];
        for (let j = 0; j < mapHeight; j++) {
            map[j] = [...readline().split('')];
        }
        var pathLength = getPathLength(map, mapWidth, mapHeight, startRow, startCol);
        if (checkIfPathIsBetter(pathLength, bestPathLength)) {
            bestPathLength = pathLength;
            bestMapIndex = i;
        }
    }
    console.log(bestMapIndex);
}

// Return Path length of a map or
function getPathLength(map, mapWidth, mapHeight, startRow, startCol) {
    var value = [startRow, startCol];
    var pathLength = 0;
    var isTrap = false;
    do {
        var direction = map[value[0]][value[1]];
        if (pathLength > 0 && value[0] === startRow && value[1] === startCol) {
            isTrap = true;
        } else if (direction === '^' && value[0] > 0) {
            value = [value[0] - 1, value[1]]
        } else if (direction === 'v' && value[0] < mapHeight - 1) {
            value = [value[0] + 1, value[1]]
        } else if (direction === '<' && value[1] > 0) {
            value = [value[0], value[1] - 1]
        } else if (direction === '>' && value[1] < mapWidth - 1) {
            value = [value[0], value[1] + 1]
        } else {
            isTrap = true;
        }
        pathLength++;
    } while (!isTrap && map[value[0]][value[1]] !== 'T')

    return isTrap ? null : pathLength;
}

function checkIfPathIsBetter(pathLength, bestPathLength) {
    return pathLength !== null && (pathLength < bestPathLength || bestPathLength === -1)
}