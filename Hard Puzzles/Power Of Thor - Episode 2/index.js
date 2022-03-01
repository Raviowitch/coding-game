// https://www.codingame.com/training/hard/power-of-thor-episode-2

[thorX, thorY] = readline().split(' ').map(Number);

// game loop
while (true) {
    var inputs = readline().split(' ');
    var giants = [];
    const hammerStrikesRemaining = +inputs[0];
    const giantsRemaining = +inputs[1];

    for (let i = 0; i < giantsRemaining; i++) {
        var inputs = readline().split(' ');
        const X = +inputs[0];
        const Y = +inputs[1];
        giants.push({ x: X, y: Y, isKillable: isKillableByThor(thorX, thorY, X, Y) })
    }

    // Plus de coups que d'ennemis ou on peut tuer tous les ennemis d'un coup
    if (hammerStrikesRemaining >= giantsRemaining && atLeastOneGiantKillable(giants) || getGiantsKillable(giants) === giantsRemaining) {
        console.log('STRIKE');
    } else {
        var direction = nextThorDirection(thorX, thorY, giants);
        if (!direction && !atLeastOneGiantKillable(giants)) {
            console.log('WAIT')
        } else if (direction && isSafe(direction, thorX, thorY, giants)) {
            updateThorPosition(direction);
            console.log(direction);
        } else {
            var direction = findOtherSafeDirection(thorX, thorY, giants);
            if (direction !== null) {
                updateThorPosition(direction);
                console.log(direction);
            } else {
                console.log('STRIKE');
            }
        }
    }
}

function isKillableByThor(thorX, thorY, X, Y) {
    if (Math.abs(thorX - X) <= 4 && Math.abs(thorY - Y) <= 4) {
        return true;
    }
    return false;
}

function getGiantsKillable(giants) {
    return giants.filter(giant => giant.isKillable).length;
}

function atLeastOneGiantKillable(giants) {
    return giants.filter(giant => giant.isKillable).length > 0;
}

function isSafe(direction, thorX, thorY, giants) {
    var result = true;
    var posXToCheck = thorX, posYToCheck = thorY;
    if (direction.includes('S')) {
        posYToCheck++;
    } else if (direction.includes('N')) {
        posYToCheck--;
    }
    if (direction.includes('E')) {
        posXToCheck++;
    } else if (direction.includes('W')) {
        posXToCheck--;
    }
    giants.forEach(giant => {
        if (Math.abs(giant.x - posXToCheck) <= 1 && Math.abs(giant.y - posYToCheck) <= 1) {
            result = false;
        }
    })
    return result;
}

function isValidDirection(direction, thorX, thorY) {
    var valid = true;
    if (direction.includes('S') && thorY >= 18) {
        valid = false;
    } else if (direction.includes('N') && thorY <= 0) {
        valid = false;
    }
    if (direction.includes('E') && thorX >= 40) {
        valid = false;
    } else if (direction.includes('W') && thorX <= 0) {
        valid = false;
    }
    return valid;
}

function nextThorDirection(thorX, thorY, giants) {
    sumX = thorX;
    sumY = thorY;
    giants.forEach(giant => {
        sumX += giant.x;
        sumY += giant.y;
    });
    var testX = sumX / (giants.length + 1);
    var testY = sumY / (giants.length + 1);
    var direction = ''

    // Check Y
    if (thorY < testY) {
        direction += 'S';
    } else if (thorY > testY) {
        direction += 'N'
    }

    // Check X
    if (thorX > testX) {
        direction += 'W'
    } else if (thorX < testX) {
        direction += 'E'
    }
    return direction;
}

function updateThorPosition(direction) {
    if (direction.includes('S')) {
        thorY++;
    } else if (direction.includes('N')) {
        thorY--;
    }
    if (direction.includes('E')) {
        thorX++;
    } else if (direction.includes('W')) {
        thorX--;
    }
}

function findOtherSafeDirection(thorX, thorY, giants) {
    var safeDirection = null;
    var directions = [];
    // Si on peut pas se placer vers l'isobarycentre, on essaie de mettre Thor vers le centre de la map
    if (thorX < 20 && thorY < 9) {
        directions = ['SE', 'E', 'S', 'NE', 'N', 'W', 'SW', 'NW'];
    } else if (thorX > 20 && thorY < 9) {
        directions = ['SW', 'W', 'S', 'NW', 'N', 'E', 'SE', 'NE'];
    } else if (thorX < 20 && thorY > 9) {
        directions = ['NE', 'E', 'N', 'SE', 'S', 'W', 'NW', 'SW'];
    } else {
        directions = ['NW', 'NE', 'SW', 'SE', 'W', 'E', 'N', 'S']
    }
    directions.forEach(dir => {
        if (!safeDirection && isValidDirection(dir, thorX, thorY) && isSafe(dir, thorX, thorY, giants)) {
            safeDirection = dir;
        }
    })
    return safeDirection;
}