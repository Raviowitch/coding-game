// https://www.codingame.com/ide/puzzle/the-lost-child-episode-1

var childPosition = null;
const map = getMap();

var path = findShorthestPath(map, [childPosition.y, childPosition.x]);
console.log(`${path.length * 10}km`);

function getMap() {
    var map = [];
    for (let i = 0; i < 10; i++) {
        map[i] = [];
        const cellsInRow = readline().split('');
        for (let j = 0; j < cellsInRow.length; j++) {
            map[i][j] = cellsInRow[j];
            if (cellsInRow[j] === 'C') {
                childPosition = { x: j, y: i }
            }
        }
    }
    return map;
}

function findShorthestPath(grid, startCoordinates) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    var location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'C'
    }

    var queue = [location];

    while (queue.length > 0) {
        var currentLocation = queue.shift();

        // CheckNorth
        var newLocation = exploreInDirection(currentLocation, 'N', grid);
        if (newLocation.status === 'M') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // CheckEast
        var newLocation = exploreInDirection(currentLocation, 'E', grid);
        if (newLocation.status === 'M') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // CheckSouth
        var newLocation = exploreInDirection(currentLocation, 'S', grid);
        if (newLocation.status === 'M') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // CheckWest
        var newLocation = exploreInDirection(currentLocation, 'W', grid);
        if (newLocation.status === 'M') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }
    }

    // No way
    return false;
}

function checkStatus(cell, grid) {
    var gridSize = grid.length;
    var dft = cell.distanceFromTop;
    var dfl = cell.distanceFromLeft;
    if (dfl < 0 || dfl >= gridSize || dft < 0 || dft >= gridSize) {
        return 'Invalid';
    } else if (grid[dft][dfl] === 'M') {
        return 'M';
    } else if (grid[dft][dfl] !== '.') {
        return 'Blocked';
    } else {
        return 'Valid';
    }
}

function exploreInDirection(currentCell, direction, grid) {
    var newPath = currentCell.path.slice();
    newPath.push(direction);
    var dft = currentCell.distanceFromTop;
    var dfl = currentCell.distanceFromLeft;

    if (direction === 'N') {
        dft -= 1;
    } else if (direction === 'S') {
        dft += 1;
    } else if (direction === 'W') {
        dfl -= 1;
    } else if (direction === 'E') {
        dfl += 1;
    }

    var newCellToExplore = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    }
    newCellToExplore.status = checkStatus(newCellToExplore, grid);
    if (newCellToExplore.status === 'Valid') {
        grid[newCellToExplore.distanceFromTop][newCellToExplore.distanceFromLeft] = 'Visited';
    }

    return newCellToExplore;
}