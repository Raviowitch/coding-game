// https://www.codingame.com/training/medium/number-of-letters-in-a-number---binary

gameLoop();

function gameLoop() {
    [previousVal, n] = readline().split(' ').map(Number);
    let result;
    for (let i = 0; i < n; i++) {
        const binaryPreviousValue = previousVal.toString(2).split('');
        result = binaryPreviousValue.reduce((pv, cv) => pv += cv === '1' ? 3 : 4, 0);
        if (result === previousVal) {
            break;
        }
        previousVal = result;
    }
    console.log(result);
}