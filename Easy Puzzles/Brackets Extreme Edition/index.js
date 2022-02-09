const expression = readline().split('')
    .filter(val => ['(', '{', '[', ')', '}', ']'].includes(val))
    .map(val => { return { value: val, side: ['(', '{', '['].includes(val) ? 'L' : 'R' } });

displayResult(expression)

function displayResult(expression) {
    if (!checkEqualityBetweenLeftAndRight(expression)) {
        console.log(false)
    } else if (!checkIfLeftBeforeRight(expression)) {
        console.log(false)
    } else if (!checkIfThereIsNoError(expression)) {
        console.log(false)
    } else {
        console.log(true)
    }
}

function checkEqualityBetweenLeftAndRight(expression) {
    var Ls = [...expression.filter(val => val.side === 'L')];
    var Rs = [...expression.filter(val => val.side === 'R')];
    return Ls.length === Rs.length;
}

function checkIfLeftBeforeRight(expression) {
    return expression.findIndex(val => val.side === 'L') < expression.findIndex(val => val.side === 'R');
}

function checkIfThereIsNoError(expression) {
    var values = [{ L: '(', R: ')' }, { L: '{', R: '}' }, { L: '[', R: ']' }];
    var result = true;
    var nextRs = [];
    var previousLs = [];
    expression.forEach(val => {
        if (val.side === 'L') {
            nextRs.push(values.find(v => v.L === val.value).R);
            previousLs.push(val.value);
        } else if (val.side === 'R' && val.value === nextRs[nextRs.length - 1]) {
            previousLs.pop();
            nextRs.pop();
        } else {
            result = false;
        }
    })
    return result;
}