// https://www.codingame.com/ide/puzzle/the-river-i-

gameLoop();

function gameLoop() {
    var r1 = +readline();
    var r2 = +readline();
    while (r1 !== r2) {
        if (r1 < r2) {
            r1 = nextValue(r1)
        }
        if (r2 < r1) {
            r2 = nextValue(r2)
        }
    }
    console.log(r1);
}
function nextValue(river) {
    return river + river.toString().split('').map(n => +n).reduce((partialSum, a) => partialSum + a, 0)
}