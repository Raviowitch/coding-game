// https://www.codingame.com/training/medium/gravity-tumbler

var inputs = readline().split(' ');
const width = +inputs[0]; // Not Used
const height = +inputs[1];
const count = parseInt(readline());

gameLoop(createMapFromDatas(height), count)

function gameLoop(map, count) {
    for (let i = 0; i < count; i++) {
        map = rotateMap(map);
        applyGravityToMap(map);
    }
    displayResult(map);
}

function createMapFromDatas(height) {
    return [...Array(height)].map(_ => [...readline().split('')]);;
}

function displayResult(map) {
    map.forEach(line => {
        console.log(line.join(''))
    })
}

function rotateMap(map) {
    var temp = [];
    var h = map[0].length;
    for (let i = 1; i <= h; i++) {
        temp[i - 1] = map.map(line => line[h-i]);
    }
    return temp;
}

function applyGravityToMap(map) {
    var atLeastOneChange = true;
    while (atLeastOneChange) {
        atLeastOneChange = false;
        map.forEach((line, indexY) => {
            line.forEach((cell, indexX) => {
                if (cell === '#') {
                    if (indexY < map.length - 1 && map[indexY + 1][indexX] === '.') {
                        map[indexY + 1][indexX] = '#';
                        map[indexY][indexX] = '.';
                        atLeastOneChange = true;
                    }
                }
            })
        })
    }
}