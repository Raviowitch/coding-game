// https://www.codingame.com/training/medium/custom-game-of-life

[h, w, n] = readline().split(' ');
var alives = [];
var deads = [];

readline().split('').forEach((i, index) => {
    if (i === '1') {
        alives.push(index);
    }
})
readline().split('').forEach((i, index) => {
    if (i === '1') {
        deads.push(index);
    }
})

gameLoop()

function gameLoop() {
    var map = createMap();
    for (let i = 0; i < n; i++) {
        checkBeforeEvolveMap(map);
        evolveMap(map);
    }
    displayMap(map);
}

function createMap() {
    var map = [];
    for (let i = 0; i < h; i++) {
        const line = readline();
        map.push(line.split('').map((cell, index) => {
            return {
                x: index,
                y: i,
                value: cell,
                mustEvolve: false
            }
        }));
    }
    return map;
}
function checkBeforeEvolveMap(map) {
    map.forEach(line => {
        line.forEach(cell => {
            checkIfCellMustEvolve(map, cell);
        })
    })
}

function evolveMap(map) {
    map.forEach(line => {
        line.forEach(cell => {
            if (cell.mustEvolve) {
                cell.mustEvolve = false;
                cell.value === 'O' ? cell.value = '.' : cell.value = 'O'
            }
        })
    })
}

function checkIfCellMustEvolve(map, cell) {
    var neighbours = findNeighbours(map, cell);
    if (cell.value === 'O' && !alives.includes(neighbours)) {
        cell.mustEvolve = true
    }
    if (cell.value === '.' && deads.includes(neighbours)) {
        cell.mustEvolve = true
    }
}

function findNeighbours(map, cell) {
    var result = 0;
    if (cell.y > 0) {
        if (cell.x > 0 && map[cell.y - 1][cell.x - 1].value === 'O') {
            result++;
        }
        if (map[cell.y - 1][cell.x].value === 'O') {
            result++;
        }
        if (cell.x < w - 1 && map[cell.y - 1][cell.x + 1].value === 'O') {
            result++;
        }
    }
    if (cell.x > 0 && map[cell.y][cell.x - 1].value === 'O') {
        result++;
    }
    if (cell.x < w - 1 && map[cell.y][cell.x + 1].value === 'O') {
        result++;
    }
    if (cell.y < h - 1) {
        if (cell.x > 0 && map[cell.y + 1][cell.x - 1].value === 'O') {
            result++;
        }
        if (map[cell.y + 1][cell.x].value === 'O') {
            result++;
        }
        if (cell.x < w - 1 && map[cell.y + 1][cell.x + 1].value === 'O') {
            result++;
        }
    }
    return result;
}

function displayMap(map) {
    map.forEach(line => {
        console.log(line.map(cell => cell.value).join(''))
    })
}