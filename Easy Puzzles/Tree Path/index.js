// https://www.codingame.com/training/easy/tree-paths

const N = +readline();
const V = +readline();
const M = +readline();

var tree = [];
for (let i = 0; i < M; i++) {
    var inputs = readline().split(' ');
    tree.push({ node: +inputs[0], left: +inputs[1], right: +inputs[2] })
}

var path = findPathToIndexSearch(tree, V, []);
console.log(path.join(' '));

function findPathToIndexSearch(tree, V, result) {
    var rootFind = false;
    tree.forEach((node, index) => {
        if (!rootFind) {
            if (node.node === V && index === 0) {
                rootFind = true;
            } else if (node.left === V) {
                result.unshift('Left');
                findPathToIndexSearch(tree, node.node, result)
            } else if (node.right === V) {
                result.unshift('Right');
                findPathToIndexSearch(tree, node.node, result)
            }
        }
    })
    return result.length !== 0 ? result: ['Root'];
}
