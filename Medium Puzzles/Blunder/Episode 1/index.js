// https://www.codingame.com/training/medium/blunder-episode-1

const row = readline().split(' ')[0];
var map = getMap();

gameLoop(map);

function getMap() {
    var map = [];
    for (let i = 0; i < row; i++) {
        map[i] = readline().split('');
    }
    return map;
}

function getBlunder(map) {
    for (let i = 0; i < row; i++) {
        if (map[i].includes('@')) {
            var blunder = { x: map[i].indexOf('@'), y: i, direction: 'SOUTH' };
            map[i][blunder.x] = ' ';
            return blunder;
        }
    }
}

function getTeleporteurs(map) {
    var teleporteurs = [];
    for (let i = 0; i < row; i++) {
        if (map[i].includes('T')) {
            teleporteurs.push({ x: map[i].indexOf('T'), y: i })
        }
    }
    return teleporteurs;
}

function getDirection(val) {
    if (val === "S") {
        return 'SOUTH';
    } else if (val === "E") {
        return 'EAST';
    } else if (val === "N") {
        return 'NORTH';
    } else if (val === "W") {
        return 'WEST';
    }
}

function getCurrentCase(character, map) {
    return map[character.y][character.x];
}

function gameLoop(map, blunder) {
    var nbTour = 0;
    var beerEffect = false;
    var inverted = false;
    var result = [];

    var blunder = getBlunder(map);
    var teleporteurs = getTeleporteurs(map);

    while (true) {
        if (nbTour === 300) {
            console.log("LOOP");
            break;
        }
        nbTour++;

        currentCase = getCurrentCase(blunder, map);

        if (['S', 'E', 'N', 'W'].includes(currentCase)) {
            blunder.direction = getDirection(currentCase);
        } else if (currentCase === "T") {
            teleportBender(blunder, teleporteurs);
        } else if (currentCase === "B") {
            beerEffect = !beerEffect;
        } else if (currentCase === "I") {
            inverted = !inverted;
        } else if (currentCase === "X") {
            map[blunder.y][blunder.x] = " ";
        } else if (currentCase === "$") {
            break;
        }

        nextCase = getNextCase(blunder, map);

        if (nextCase === "#" || (nextCase === "X" && !beerEffect)) {
            blunder.direction = getNewBenderDirection(blunder, map, beerEffect, inverted);
        }

        result.push(blunder.direction);
        moveBender(blunder);
    }

    if (nbTour !== 300) {
        result.forEach(res => {
            console.log(res);
        })
    }
}

function teleportBender(blunder, teleporteurs) {
    if (blunder.y === teleporteurs[0].y && blunder.x === teleporteurs[0].x) {
        blunder.x = teleporteurs[1].x;
        blunder.y = teleporteurs[1].y;
    } else {
        blunder.x = teleporteurs[0].x;
        blunder.y = teleporteurs[0].y;
    }
}

function moveBender(blunder) {
    if (blunder.direction === 'SOUTH') {
        blunder.y++;
    } else if (blunder.direction === 'EAST') {
        blunder.x++;
    } else if (blunder.direction === 'NORTH') {
        blunder.y--;
    } else if (blunder.direction === 'WEST') {
        blunder.x--;
    }
}

function getNewBenderDirection(blunder, map, beerEffect, inverted) {
    if (!inverted) {
        if (blunder.direction !== 'SOUTH' && ((map[blunder.y + 1][blunder.x] !== "#" && map[blunder.y + 1][blunder.x] !== "X") || (beerEffect && map[blunder.y + 1][blunder.x] === "X"))) {
            return 'SOUTH';
        } else if (blunder.direction !== 'EAST' && ((map[blunder.y][blunder.x + 1] !== "#" && map[blunder.y][blunder.x + 1] !== "X") || (beerEffect && map[blunder.y][blunder.x + 1] === "X"))) {
            return 'EAST';
        } else if (blunder.direction !== 'NORTH' && ((map[blunder.y - 1][blunder.x] !== "#" && map[blunder.y - 1][blunder.x] !== "X") || (beerEffect && map[blunder.y - 1][blunder.x] === "X"))) {
            return 'NORTH';
        } else if (blunder.direction !== 'WEST' && ((map[blunder.y][blunder.x - 1] !== "#" && map[blunder.y][blunder.x - 1] !== "X") || (beerEffect && map[blunder.y][blunder.x - 1] === "X"))) {
            return 'WEST';
        }
    } else {
        if (blunder.direction !== 'WEST' && ((map[blunder.y][blunder.x - 1] !== "#" && map[blunder.y][blunder.x - 1] !== "X") || (beerEffect && map[blunder.y][blunder.x - 1] === "X"))) {
            return 'WEST';
        } else if (blunder.direction !== 'NORTH' && ((map[blunder.y - 1][blunder.x] !== "#" && map[blunder.y - 1][blunder.x] !== "X") || (beerEffect && map[blunder.y - 1][blunder.x] === "X"))) {
            return 'NORTH';
        } else if (blunder.direction !== 'EAST' && ((map[blunder.y][blunder.x + 1] !== "#" && map[blunder.y][blunder.x + 1] !== "X") || (beerEffect && map[blunder.y][blunder.x + 1] === "X"))) {
            return 'EAST';
        } else if (blunder.direction !== 'SOUTH' && ((map[blunder.y + 1][blunder.x] !== "#" && map[blunder.y + 1][blunder.x] !== "X") || (beerEffect && map[blunder.y + 1][blunder.x] === "X"))) {
            return 'SOUTH';
        }
    }
}

function getNextCase(blunder, map) {
    if (blunder.direction === 'SOUTH') {
        return map[blunder.y + 1][blunder.x];
    } else if (blunder.direction === 'EAST') {
        return map[blunder.y][blunder.x + 1];
    } else if (blunder.direction === 'NORTH') {
        return map[blunder.y - 1][blunder.x];
    } else if (blunder.direction === 'WEST') {
        return map[blunder.y][blunder.x - 1];
    }
}
