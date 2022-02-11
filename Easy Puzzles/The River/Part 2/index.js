gameLoop();

function gameLoop() {
    var r1 = +readline();
    var find = false;
    for (let i = 1; i < r1 && !find; i++) {
        if (nextValue(i) === r1) {
            find = true;
        }
    }
    console.log(find ? 'YES' : 'NO');
}
function nextValue(river) {
    return river.toString().split('').map(Number).reduce((partialSum, a) => partialSum + a, river)
}