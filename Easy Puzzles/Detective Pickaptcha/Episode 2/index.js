var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
var map = [];
var startPosition = null;
var pikaPosition = null;
var direction = '';
for (let i = 0; i < height; i++) {
    const line = readline().split('');
    line.forEach((point, index) => {
        map.push({ x: index, y: i, value: ['>', '<', 'v', '^', '0'].includes(point) ? 0 : point })
        if (['>', '<', 'v', '^'].includes(point)) {
            startPosition = pikaPosition = { x: index, y: i };
            direction = point;
        }
    })
}
const wallToFollow = readline(); // Left (L) or Right (R)
var directions = wallToFollow === 'L' ? ['>', 'v', '<', '^'] : ['>', '^', '<', 'v'];

gameLoop();
displayResult(map, height);

function isAWall(room) {
    return room.value === '#'
}

function gameLoop() {
    var directionTry = 1; // Cas particulier si aucun chemin
    while (map.find(pt => pt.x === startPosition.x && pt.y === startPosition.y).value !== 1 && directionTry <= 4) {
        var nextCase = getNextCase(map, pikaPosition, direction, width, height);
        var nextRoom = null;
        var dir = direction;
        if (nextCase !== undefined) {
            nextRoom = nextCase.room;
            dir = nextCase.direction;
        }
        if (nextRoom && !isAWall(nextRoom)) {
            map.find(pt => pt.x === nextRoom.x && pt.y === nextRoom.y).value += 1;
            pikaPosition = { x: nextRoom.x, y: nextRoom.y };
            direction = dir;
            directionTry = 1;
        } else {
            direction = directions[(directions.indexOf(direction) + 1) % 4];
            directionTry++;
        }
    }
}

// Can return null
function getNextCaseInADirection(map, pikaPosition, direction) {
    return map.find(pt => pt.x === pikaPosition.x + direction[0] && pt.y === pikaPosition.y + direction[1]);
}

function getNextCase(map, pikaPosition, direction, width, height) {
    var nextCase = { direction: null, room: null }
    if (direction === '>') {
        if (wallToFollow === 'L' && pikaPosition.y > 0 && getNextCaseInADirection(map, pikaPosition, [0,-1]).value !== '#') {
            nextCase = { direction: '^', room: getNextCaseInADirection(map, pikaPosition, [0,-1]) }
        }
        else if (wallToFollow === 'R' && pikaPosition.y < (height - 1) && getNextCaseInADirection(map, pikaPosition, [0,1]).value !== '#') {
            nextCase = { direction: 'v', room: getNextCaseInADirection(map, pikaPosition, [0,1]) }
        }
        else if (pikaPosition.x < (width - 1)) {
            nextCase = { direction: '>', room: getNextCaseInADirection(map, pikaPosition, [1,0]) }
        }
    } else if (direction === 'v') {
        if (wallToFollow === 'L' && pikaPosition.x < (width - 1) && getNextCaseInADirection(map, pikaPosition, [1,0]).value !== '#') {
            nextCase = { direction: '>', room: getNextCaseInADirection(map, pikaPosition, [1,0]) }
        }
        else if (wallToFollow === 'R' && pikaPosition.x > 0 && getNextCaseInADirection(map, pikaPosition, [-1,0]).value !== '#') {
            nextCase = { direction: '<', room: getNextCaseInADirection(map, pikaPosition, [-1,0]) }
        }
        else if (pikaPosition.y < (height - 1)) {
            nextCase = { direction: 'v', room: getNextCaseInADirection(map, pikaPosition, [0,1]) }
        }
    } else if (direction === '<') {
        if (wallToFollow === 'L' && pikaPosition.y < (height - 1) && getNextCaseInADirection(map, pikaPosition, [0,1]).value !== '#') {
            nextCase = { direction: 'v', room: getNextCaseInADirection(map, pikaPosition, [0,1]) }
        }
        else if (wallToFollow === 'R' && pikaPosition.y > 0 && getNextCaseInADirection(map, pikaPosition, [0,-1]).value !== '#') {
            nextCase = { direction: '^', room: getNextCaseInADirection(map, pikaPosition, [0,-1]) }
        }
        else if (pikaPosition.x > 0) {
            nextCase = { direction: '<', room: getNextCaseInADirection(map, pikaPosition, [-1,0]) }
        }
    } else if (direction === '^') {
        if (wallToFollow === 'L' && pikaPosition.x > 0 && getNextCaseInADirection(map, pikaPosition, [-1,0]).value !== '#') {
            nextCase = { direction: '<', room: getNextCaseInADirection(map, pikaPosition, [-1,0]) }
        }
        else if (wallToFollow === 'R' && pikaPosition.x < (width - 1) && getNextCaseInADirection(map, pikaPosition, [1,0]).value !== '#') {
            nextCase = { direction: '>', room: getNextCaseInADirection(map, pikaPosition, [1,0]) }
        }
        else if (pikaPosition.y > 0) {
            nextCase = { direction: '^', room: getNextCaseInADirection(map, pikaPosition, [0,-1]) }
        }
    }
    return nextCase;
}

function displayResult(map, height) {
    for (let i = 0; i < height; i++) {
        console.log(map.filter(pt => pt.y === i).map(p => p.value).join(''));
    }
}