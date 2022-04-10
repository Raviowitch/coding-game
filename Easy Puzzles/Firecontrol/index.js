// https://www.codingame.com/training/easy/firecontrol

gameLoop();

function gameLoop() {
    var fires = [];
    var map = [...Array(6)].map((_, indexY) => {
        const line = readline().split('');
        line.forEach((cell, indexX) => {
            if (cell === '*') {
                fires.push({ x: indexX, y: indexY })
            }
        })
        return line;
    })

    var treesToCut = getTreesToCut(fires, map);
    displayResult(treesToCut, fires, map)
}

function displayResult(treesToCut, fires, map) {
    if (fires.length === 0) {
        console.log('RELAX');
    } else if (treesToCut === 0 || noTreesOnTheMap(map)) {
        console.log('JUST RUN');
    } else {
        console.log(treesToCut);
    }
}

function getTreesToCut(fires, map) {
    var treesToCut = 0;
    fires.forEach(fire => {
        treesToCut += findTreesToCut(fire.x, fire.y, map);
    })
    return treesToCut;
}

function findTreesToCut(x, y, map) {
    var trees = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (Math.abs(i - y) <= 2 && Math.abs(j - x) <= 2 && map[i][j] === '#') {
                trees++;
                map[i][j] = '=';
            }
        }  
    }
    return trees;
}

function noTreesOnTheMap(map) {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (map[i][j] === '#') {
                return false;
            }
        }  
    }
    return true;
}