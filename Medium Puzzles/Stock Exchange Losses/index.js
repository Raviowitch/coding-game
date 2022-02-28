// https://www.codingame.com/training/medium/stock-exchange-losses

readline(); // Not Used
var inputs = readline().split(' ').map(Number);
var max = null, perte = 0;
inputs.forEach(val => {
    if (max === null) {
        max = val;
    } else {
        if (max < val) {
            max = val;
        } else if (val - max < perte) {
            perte = val - max;
        };
    }
});

console.log(perte)