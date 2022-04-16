
const A1 = +readline();
const N = +readline();
console.log(getNthTerm(A1, N));

function getNthTerm(a1, n) {
    values = new Map();
    let aN = a1;
    for (let i = 0; i < n - 1; i++) {
        if (values.has(aN)) {
            const nextVal = i - values.get(aN);
            values.set(aN, i);
            aN = nextVal;
        } else {
            values.set(aN, i);
            aN = 0;
        }
    }
    return aN;
}