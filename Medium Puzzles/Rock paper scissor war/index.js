// https://www.codingame.com/training/medium/rock-paper-scissors-war

const lifeType = new Map();
lifeType.set('R', ['L', 'C'])
lifeType.set('P', ['R', 'S'])
lifeType.set('C', ['P', 'L'])
lifeType.set('L', ['S', 'P'])
lifeType.set('S', ['C', 'R'])

gameLoop();

function gameLoop() {
    var inputs = readline().split(' ');
    const w = parseInt(inputs[0]);
    const h = parseInt(inputs[1]);
    const n = parseInt(inputs[2]);
    var map = [...Array(h)].map(_ => {
        return readline().split('').map(cell => { return { val: cell, nextLifeTypes: [] } })
    })

    for (let i = 0; i < n; i++) {
        playGame(map, w, h);
    }
    displayResult(map);
}

function playGame(map, w, h) {
    map.forEach((line, index) => {
        line.forEach((cell, i) => {
            if (index > 0 && lifeType.get(cell.val).includes(map[index - 1][i].val) && !map[index - 1][i].nextLifeTypes.includes(cell.val)) {
                map[index - 1][i].nextLifeTypes.push(cell.val);
            }
            if (index < h - 1 && lifeType.get(cell.val).includes(map[index + 1][i].val) && !map[index + 1][i].nextLifeTypes.includes(cell.val)) {
                map[index + 1][i].nextLifeTypes.push(cell.val);
            }
            if (i > 0 && lifeType.get(cell.val).includes(map[index][i - 1].val) && !map[index][i - 1].nextLifeTypes.includes(cell.val)) {
                map[index][i - 1].nextLifeTypes.push(cell.val);
            }
            if (i < w - 1 && lifeType.get(cell.val).includes(map[index][i + 1].val) && !map[index][i + 1].nextLifeTypes.includes(cell.val)) {
                map[index][i + 1].nextLifeTypes.push(cell.val);
            }
        })
    });
    map.forEach(line => {
        line.forEach(cell => {
            if (cell.nextLifeTypes.length === 2) {
                if (lifeType.get(cell.nextLifeTypes[0]).includes(cell.nextLifeTypes[1])) {
                    cell.nextLifeTypes = [cell.nextLifeTypes[0]];
                } else {
                    cell.nextLifeTypes = [cell.nextLifeTypes[1]];
                }
            }
            if (cell.nextLifeTypes.length === 1) {
                cell.val = cell.nextLifeTypes[0];
                cell.nextLifeTypes = [];
            }
        })
    });
}

function displayResult(map) {
    map.forEach(line => {        
        console.log(line.map(cell => cell.val).join(''));
    })
}
