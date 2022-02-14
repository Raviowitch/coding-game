// https://www.codingame.com/training/medium/green-valleys

const H = +readline();
const N = +readline();
var map = createMapFromDatas(H, N)
gameLoop(map);

function createMapFromDatas(H, N) {
    var map = [];
    for (let i = 0; i < N; i++) {
        map[i] = readline().split(' ').map(cell => {
            return { h: +cell, valleyId: null, isTooHigh: +cell > H }
        });
    }
    return map;
}

function findLargestValleyAndDisplayDeepestPoint(valleys) {
    var max = 0;
    var deepest = 0;
    valleys.forEach(cells => {
        if (cells.length > max) {
            max = cells.length;
            deepest = Math.min(...cells)
        }
    })
    console.log(deepest);
}

function gameLoop(map) {
    var atLeastOneChange = false;
    var valleyId = 0;
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (!map[y][x].isTooHigh && map[y][x].valleyId === null) {
                if (x > 0 && map[y][x - 1].valleyId !== null) {
                    map[y][x].valleyId = map[y][x - 1].valleyId;
                } else if (y > 0 && map[y - 1][x].valleyId !== null) {
                    map[y][x].valleyId = map[y - 1][x].valleyId;
                } else {
                    map[y][x].valleyId = ++valleyId;
                }
                atLeastOneChange = true;
            } else if (map[y][x].valleyId !== null) {
                if (x > 0 && map[y][x - 1].valleyId !== null && map[y][x - 1].valleyId !== map[y][x].valleyId) {
                    mergeValley(map[y][x - 1].valleyId, map[y][x].valleyId);
                    atLeastOneChange = true;
                } else if (y > 0 && map[y - 1][x].valleyId !== null && map[y - 1][x].valleyId !== map[y][x].valleyId) {
                    mergeValley(map[y - 1][x].valleyId, map[y][x].valleyId);
                    atLeastOneChange = true;
                }
            }
        }
    }
    if (atLeastOneChange) {
        gameLoop(map)
    } else {
        findLargestValleyAndDisplayDeepestPoint(createValleysFromMap(map));
    }
}

function mergeValley(v1, v2) {
    map.forEach(row => {
        row.forEach(cell => {
            if (cell.valleyId === v2) {
                cell.valleyId = v1;
            }
        })
    })
}

function createValleysFromMap() {
    var valleys = new Map();
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (map[y][x].valleyId !== null) {
                if (valleys.has(map[y][x].valleyId)) {
                    valleys.set(map[y][x].valleyId, [...valleys.get(map[y][x].valleyId), map[y][x].h]);
                } else {
                    valleys.set(map[y][x].valleyId, [map[y][x].h]);
                }
            }
        }
    }
    return valleys;
}