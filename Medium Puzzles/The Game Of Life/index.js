var inputs = readline().split(' ');
const mapWidth = parseInt(inputs[0]);
const mapHeight = parseInt(inputs[1]);

var grid = createGrid(mapHeight);

checkBeforeEvolveGrid(grid, mapWidth, mapHeight);
evolveGrid(grid);
displayGrid(grid);

function createGrid(mapHeight) {
    var result = [];
    for (let i = 0; i < mapHeight; i++) {
        const line = readline();
        result.push(line.split('').map((cell, index) => {
            return {
                x: index,
                y: i,
                value: cell,
                mustEvolve: false
            }
        }));
    }
    return result;
}

function checkBeforeEvolveGrid(grid, mapWidth, mapHeight) {
    grid.forEach(line => {
        line.forEach(cell => {
            checkIfCellMustEvolve(grid, cell, mapWidth, mapHeight);
        })
    })
}

function evolveGrid(grid) {
    grid.forEach(line => {
        line.forEach(cell => {
            if (cell.mustEvolve) {
                cell.mustEvolve = false;
                cell.value === '0' ? cell.value = '1' : cell.value = '0'
            }
        })
    })
}

function checkIfCellMustEvolve(grid, cell, mapWidth, mapHeight) {
    var neighbours = findNeighbours(grid, cell, mapWidth, mapHeight);
    if (cell.value === '1' && ![2, 3].includes(neighbours)) {
        cell.mustEvolve = true
    }
    if (cell.value === '0' && [3].includes(neighbours)) {
        cell.mustEvolve = true
    }
}

function findNeighbours(grid, cell, mapWidth, mapHeight) {
    var result = 0;
    if (cell.y > 0) {
        if (cell.x > 0 && grid[cell.y - 1][cell.x - 1].value === '1') {
            result++;
        }
        if (grid[cell.y - 1][cell.x].value === '1') {
            result++;
        }
        if (cell.x < mapWidth - 1 && grid[cell.y - 1][cell.x + 1].value === '1') {
            result++;
        }
    }
    if (cell.x > 0 && grid[cell.y][cell.x - 1].value === '1') {
        result++;
    }
    if (cell.x < mapWidth - 1 && grid[cell.y][cell.x + 1].value === '1') {
        result++;
    }
    if (cell.y < mapHeight - 1) {
        if (cell.x > 0 && grid[cell.y + 1][cell.x - 1].value === '1') {
            result++;
        }
        if (grid[cell.y + 1][cell.x].value === '1') {
            result++;
        }
        if (cell.x < mapWidth - 1 && grid[cell.y + 1][cell.x + 1].value === '1') {
            result++;
        }
    }
    return result;
}

function displayGrid(grid) {
    grid.forEach(line => {
        console.log(line.map(cell => cell.value).join(''))
    })
}