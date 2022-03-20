class Cell {
    constructor(index, richness, neighbors) {
        this.index = index
        this.richness = richness
        this.neighbors = neighbors
    }

    isEmpty(trees) {
        return !trees.some(tree => tree.cellIndex === this.index)
    }
}
class Tree {
    constructor(cellIndex, size, isMine, isDormant) {
        this.cellIndex = cellIndex
        this.size = size
        this.isMine = isMine
        this.isDormant = isDormant
    }

    isGrowable(mySun, myTrees) {
        if (this.size === 0) {
            return mySun >= (1 + myTrees.filter(tree => tree.size === 1).length)
        } else if (this.size === 1) {
            return mySun >= (3 + myTrees.filter(tree => tree.size === 2).length)
        } else if (this.size === 2) {
            return mySun >= (7 + myTrees.filter(tree => tree.size === 3).length)
        }
    }
}

const WAIT = 'WAIT'
const SEED = 'SEED'
const GROW = 'GROW'
const COMPLETE = 'COMPLETE'
class Action {
    constructor(type, targetCellIdx, sourceCellIdx) {
        this.type = type
        this.targetCellIdx = targetCellIdx
        this.sourceCellIdx = sourceCellIdx
    }
    static parse(line) {
        const parts = line.split(' ')
        if (parts[0] === WAIT) {
            return new Action(WAIT)
        }
        if (parts[0] === SEED) {
            return new Action(SEED, parseInt(parts[2]), parseInt(parts[1]))
        }
        return new Action(parts[0], parseInt(parts[1]))
    }
    toString() {
        if (this.type === WAIT) {
            return WAIT
        }
        if (this.type === SEED) {
            return `${SEED} ${this.sourceCellIdx} ${this.targetCellIdx}`
        }
        return `${this.type} ${this.targetCellIdx}`
    }
}
class Game {
    constructor() {
        this.day = 0
        this.nutrients = 0
        this.cells = []
        this.possibleActions = []
        this.trees = []
        this.mySun = 0
        this.myScore = 0
        this.opponentsSun = 0
        this.opponentScore = 0
        this.opponentIsWaiting = 0
    }
    getNextAction() {
        if (this.mySun >= 4 && this.trees.some(tree => tree.isMine && tree.size === 3)) {
            return `${COMPLETE} ${this.bestTreeToComplete()}`
        } else if (this.bestTreeToGrow()) {
            return `${GROW} ${this.bestTreeToGrow()}`
        } else if (this.mySun >= this.trees.filter(tree => tree.isMine && tree.size === 0).length) {
            return `${SEED} ${this.bestPositionToSeed()}`
        } else {
            return this.possibleActions[0];
        }
    }

    bestTreeToComplete() {
        return this.trees.filter(tree => tree.isMine && tree.size === 3)[0].cellIndex;;
    }

    bestTreeToGrow() {
        var best = null;
        this.trees.filter(tree => tree.isMine && !tree.isDormant && tree.size < 3
            && tree.isGrowable(this.mySun, this.trees.filter(t => t.isMine && !tree.isDormant))).forEach(tree => {
                if (!best) {
                    best = tree;
                } else if (tree.size > best.size || (tree.size === best.size && this.cells[tree.cellIndex].richness > this.cells[best.cellIndex].richness)) {
                    best = tree;
                }
            })
        return best ? best.cellIndex : null;
    }

    bestPositionToSeed() {
        var bestCellIndex = null;
        var treeCellIndex = null;
        this.trees.filter(tree => tree.isMine && !tree.isDormant && tree.size > 0).forEach(tree => {
            this.cells[tree.cellIndex].neighbors.forEach(neighbor => {
                if (neighbor >= 0 && this.cells[neighbor].isEmpty(this.trees) && (!bestCellIndex || this.cells[neighbor].richness > this.cells[bestCellIndex].richness)) {
                    bestCellIndex = neighbor;
                    treeCellIndex = tree.cellIndex
                }
                if (neighbor >= 0 && (tree.size === 2 || tree.size === 3)) {
                    this.cells[neighbor].neighbors.forEach(n => {
                        console.error(n)
                        if (n >= 0 && this.cells[n].isEmpty(this.trees) && (!bestCellIndex || this.cells[n].richness > this.cells[bestCellIndex].richness)) {
                            bestCellIndex = n;
                            treeCellIndex = tree.cellIndex
                        }
                    })
                }
            })
        })
        return bestCellIndex && treeCellIndex ? `${treeCellIndex} ${bestCellIndex}`: null;
    }
}

const game = new Game()

const numberOfCells = parseInt(readline());
for (let i = 0; i < numberOfCells; i++) {
    var inputs = readline().split(' ');
    const index = parseInt(inputs[0]);
    const richness = parseInt(inputs[1]);
    const neigh0 = parseInt(inputs[2]);
    const neigh1 = parseInt(inputs[3]);
    const neigh2 = parseInt(inputs[4]);
    const neigh3 = parseInt(inputs[5]);
    const neigh4 = parseInt(inputs[6]);
    const neigh5 = parseInt(inputs[7]);
    game.cells.push(
        new Cell(index, richness, [neigh0, neigh1, neigh2, neigh3, neigh4, neigh5])
    )
}


while (true) {
    game.day = parseInt(readline());
    game.nutrients = parseInt(readline());
    var inputs = readline().split(' ');
    game.mySun = parseInt(inputs[0]);
    game.myScore = parseInt(inputs[1]);
    var inputs = readline().split(' ');
    game.opponentSun = parseInt(inputs[0]);
    game.opponentScore = parseInt(inputs[1]);
    game.opponentIsWaiting = inputs[2] !== '0';
    game.trees = []
    const numberOfTrees = parseInt(readline());
    for (let i = 0; i < numberOfTrees; i++) {
        var inputs = readline().split(' ');
        const cellIndex = parseInt(inputs[0]);
        const size = parseInt(inputs[1]);
        const isMine = inputs[2] !== '0';
        const isDormant = inputs[3] !== '0';
        game.trees.push(
            new Tree(cellIndex, size, isMine, isDormant)
        )
    }
    game.possibleActions = []
    const numberOfPossibleAction = parseInt(readline());
    for (let i = 0; i < numberOfPossibleAction; i++) {
        const possibleAction = readline();
        game.possibleActions.push(Action.parse(possibleAction))
    }

    const action = game.getNextAction()
    console.log(action.toString());
}