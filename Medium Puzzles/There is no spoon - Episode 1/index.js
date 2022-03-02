// https://www.codingame.com/training/medium/there-is-no-spoon-episode-1

gameLoop();

function gameLoop() {
    const width = +readline(); // Not Used
    const height = +readline();

    var noeuds = getNodes(height);
    noeuds.filter(n => n.isNode).forEach(noeud => {
        result = `${noeud.x} ${noeud.y}`;
        result += nextNeighbourInDirection(noeud, noeuds, 'R');
        result += nextNeighbourInDirection(noeud, noeuds, 'B');
        console.log(result)
    });
}

function getNodes(height) {
    var noeuds = [];
    for (let i = 0; i < height; i++) {
        const line = readline().split('');
        line.forEach((cell, index) => {
            noeuds.push({ x: index, y: i, isNode: cell === '0' })
        })
    }
    return noeuds;
}

function nextNeighbourInDirection(noeud, noeuds, direction) {
    var condition = direction === 'R' ? (n) => n.y === noeud.y && n.x > noeud.x
        : (n) => n.y > noeud.y && n.x === noeud.x;
    var result = null;
    noeuds.filter(condition).forEach(n => {
        if (!result && n.isNode) {
            result = ` ${n.x} ${n.y}`
        }
    });
    if (!result) {
        result = ' -1 -1';
    }
    return result;
}