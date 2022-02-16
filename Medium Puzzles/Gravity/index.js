// https://www.codingame.com/training/medium/gravity

var inputs = readline().split(' ');
const width = +inputs[0]; // Not Used
const height = +inputs[1];

gameLoop(createMapFromDatas(height), height)

function gameLoop(map, height) {
    var atLeastOneChange = true;
    while (atLeastOneChange) {
        atLeastOneChange = false;
        map.forEach((line, indexY) => {
            line.forEach((cell, indexX) => {
                if (cell === '#') {
                    if (indexY < height - 1 && map[indexY + 1][indexX] === '.') {
                        map[indexY + 1][indexX] = '#';
                        map[indexY][indexX] = '.';
                        atLeastOneChange = true;
                    }
                }
            })
        })
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