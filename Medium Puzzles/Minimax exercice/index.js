[turns, choices] = readline().split(' ').map(Number);
const LEAFS = readline().split(' ').map(Number);

console.error(LEAFS)
class MiniMax {
    static MAX = 1000;
    static MIN = -1000;

    visitedNodesQuantity = 0;
    constructor(depth, branchingFactor, leafs) {
        this.depth = depth;
        this.branchingFactor = branchingFactor;
        this.leafs = leafs;
    }

    evaluate(alpha = MiniMax.MIN, beta = MiniMax.MAX, nodeIndex = 0, isMax = true, currentDepth = 0) {
        this.visitedNodesQuantity++;
        if (currentDepth === this.depth) {
            return this.leafs[nodeIndex];
        }
        if (isMax) {
            let best = MiniMax.MIN;
            for (let i = 0; i < this.branchingFactor; i++) {
                const val = this.evaluate(alpha, beta, nodeIndex * this.branchingFactor + i, false, currentDepth + 1);
                best = Math.max(best, val);
                alpha = Math.max(alpha, best);
                if (beta <= alpha) {
                    break;
                }
            }
            return best;
        } else {
            let best = MiniMax.MAX;
            for (let i = 0; i < this.branchingFactor; i++) {
                const val = this.evaluate(alpha, beta, nodeIndex * this.branchingFactor + i, true, currentDepth + 1);
                best = Math.min(best, val);
                beta = Math.min(beta, best);
                if (beta <= alpha) {
                    break;
                }
            }
            return best;

        }
    }
}

const miniMax = new MiniMax(turns, choices, LEAFS);
const result = miniMax.evaluate();
console.log(`${result} ${miniMax.visitedNodesQuantity}`);