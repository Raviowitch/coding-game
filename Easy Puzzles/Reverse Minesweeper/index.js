
gameLoop();

function gameLoop() {
    const width = +readline();
    const height = +readline();
    var grid = createGrid(height);
    grid.forEach((line, y) => {
        line.forEach((cell, x) => {
            if (cell === 'x') {
                updateNeighbours(grid, [x, y], width, height)
            }
        })
    })
    displayResult(grid);
}

function createGrid(height) {
    var grid = []
    for (let i = 0; i < height; i++) {
        grid[i] = [];
        var line = readline().split('');
        line.forEach(cell => {
            grid[i].push(cell === '.' ? 0 : cell)
        })
    }
    return grid;
}

function updateNeighbours(grid, [x, y], width, height) {
    if (x < width - 1) {
        if (grid[y][x + 1] !== 'x') {
            grid[y][x + 1] += 1;
        }
        if (y > 0 && grid[y - 1][x + 1] !== 'x') {
            grid[y - 1][x + 1] += 1;
        }
        if (y < height - 1 && grid[y + 1][x + 1] !== 'x') {
            grid[y + 1][x + 1] += 1;
        }
    }
    if (x > 0) {
        if (grid[y][x - 1] !== 'x') {
            grid[y][x - 1] += 1;
        }
        if (y > 0 && grid[y - 1][x - 1] !== 'x') {
            grid[y - 1][x - 1] += 1;
        }
        if (y < height - 1 && grid[y + 1][x - 1] !== 'x') {
            grid[y + 1][x - 1] += 1;
        }
    }
    if (y > 0 && grid[y - 1][x] !== 'x') {
        grid[y - 1][x] += 1;
    }
    if (y < height - 1 && grid[y + 1][x] !== 'x') {
        grid[y + 1][x] += 1;
    }
}

function displayResult(grid) {
    grid.forEach(line => {
        var lineToDisplay = '';
        line.forEach(tile => lineToDisplay += ['x', 0].includes(tile) ? '.' : tile)
        console.log(lineToDisplay);
    })
}
