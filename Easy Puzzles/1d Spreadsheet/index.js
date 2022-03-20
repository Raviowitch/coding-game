// https://www.codingame.com/training/easy/1d-spreadsheet

gameLoop();

function gameLoop() {
    var listValues = getValues();
    while (isNotFinished(listValues)) {
        listValues.forEach(val => {
            if (val.operation === 'VALUE') {
                changeValue(listValues, val);
            } else {
                evaluate(listValues, val, val.operation);
            }
        })
    }
    listValues.forEach(val => {
        console.log(parseInt(val.value))
    })
}

function getValues() {
    var listValues = [...Array(+readline())].map((_, i) => {
        [operation, arg1, arg2] = readline().split(' ');
        return { id: `$${i}`, operation, arg1, arg2, value: null }
    });
    return listValues;
}

function isNotFinished(values) {
    return !values.every(val => val.value !== null);
}

function changeValue(values, val) {
    if (!val.arg1.includes('$')) {
        val.value = val.arg1;
    } else {
        const v = values.find(v => v.id === val.arg1).value;
        if (v !== null) {
            val.value = +v;
            val.arg1 = v.toString();
        }
    }
}

function evaluate(values, val, operator) {
    let v1 = !val.arg1.includes('$') ? val.arg1 : values.find(v => v.id === val.arg1).value;
    let v2 = !val.arg2.includes('$') ? val.arg2 : values.find(v => v.id === val.arg2).value;
    if (v1 !== null) {
        val.arg1 = v1.toString();
    }
    if (v2 !== null) {
        val.arg2 = v2.toString();
    }
    if (v1 && v2) {
        if (operator === 'ADD') {
            val.value = +v1 + +v2;
        } else if (operator === 'SUB') {
            val.value = +v1 - +v2;
        } else if (operator === 'MULT') {
            val.value = +v1 * +v2;
        }
    }
}
