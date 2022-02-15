// https://www.codingame.com/training/easy/happy-numbers

gameLoop();

function gameLoop() {
    const N = +readline();
    for (let i = 0; i < N; i++) {
        const x = readline();
        if (isHappyNumber(x)) {
            console.log(`${x} :)`);
        } else {
            console.log(`${x} :(`);
        }
    }
}
function isHappyNumber(x) {
    var previousVal = [];
    var sum = x;
    while (sum !== 1) {
        var temp = sum.toString().split('').map(Number).map(val => val ** 2);
        sum = temp.reduce((previous, current) => previous + current, 0);
        if (previousVal.includes(sum)) {
            break;
        }
        previousVal.push(sum);
    }
    return sum === 1;
}