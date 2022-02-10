// https://www.codingame.com/ide/puzzle/brackets-extreme-edition

const expression = readline().split('')
    .filter(val => ['(', '{', '[', ')', '}', ']'].includes(val));

console.log(checkIfThereIsNoError(expression))

function checkIfThereIsNoError(expression) {
    var values = [{ L: '(', R: ')' }, { L: '{', R: '}' }, { L: '[', R: ']' }];
    var result = true;
    var rights = [];
    var lefts = [];
    expression.forEach(val => {
        if (['(', '{', '['].includes(val)) {
            rights.push(values.find(v => v.L === val).R);
            lefts.push(val);
        } else if ([')', '}', ']'].includes(val) && val === rights[rights.length - 1]) {
            lefts.pop();
            rights.pop();
        } else {
            result = false;
        }
    })
    return result && lefts.length === 0 && rights.length === 0;
}