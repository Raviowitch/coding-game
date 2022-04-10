// https://www.codingame.com/training/easy/flip-the-sign

gameLoop(getNumbersToAnalyze())

function getNumbersToAnalyze() {
    [height, width] = readline().split(' ');
    var numbers = [];
    for (let i = 0; i < height; i++) {
        readline().split(' ').forEach(val => {
            numbers.push({ value: +val, sign: null })
        })
    }
    for (let i = 0; i < height; i++) {
        readline().split(' ').forEach((sign, index) => {
            numbers[(i * width) + index].sign = sign;
        })
    }
    numbers = numbers.filter(val => val.sign === 'X').map(val => val.value);
    return numbers;
}

function gameLoop(numbers) {
    var alwaysAlternate = true;
    var isPreviousNegative = numbers[0] < 0;
    for (let i = 1; i < numbers.length; i++) {
        if (isPreviousNegative === numbers[i] < 0) {
            alwaysAlternate = false;
            break;
        }
        isPreviousNegative = numbers[i] < 0;
    }
    console.log(alwaysAlternate);
}