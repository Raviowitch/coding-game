gameLoop();

function gameLoop() {
    [p1, p2] = readline().split(' ');
    const ratio = readline().split(':').map(r => orderGene(r));
    const columns = [p1[0] + p1[2], p1[0] + p1[3], p1[1] + p1[2], p1[1] + p1[3]];
    const rows = [p2[0] + p2[2], p2[0] + p2[3], p2[1] + p2[2], p2[1] + p2[3]];
    const allCases = getAllCases(rows, columns);
    var result = [];
    ratio.forEach(r => {
        result.push(allCases.filter(c => c === r).length);
    })
    var gcd = findGCD(result, result.length);
    if (gcd > 0) {
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i] / gcd;
        }
    }
    console.log(result.join(':'));
}

function getAllCases(rows, columns) {
    var allCases = [];
    columns.forEach(c => {
        rows.forEach(r => {
            allCases.push(orderGene(c + r))
        })
    })
    return allCases;
}

function orderGene(gene) {
    var result = gene.split('');
    result.sort((a, b) => {
        return a.localeCompare(b)
    })
    result = result.slice(0, 2).reverse().join('') + result.slice(2).reverse().join('');
    return result;
}

function findGCD(arr, n) {
    let result = arr[0];
    for (let i = 1; i < n; i++) {
        result = gcd(arr[i], result);
        if (result == 1) {
            return 1;
        }
    }
    return result;
}

function gcd(a, b) {
    if (a == 0)
        return b;
    return gcd(b % a, a);
}