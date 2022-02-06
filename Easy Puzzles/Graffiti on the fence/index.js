const fenceLength = parseInt(readline());
var fencesPaint = fetchData(readline());

gameLoop(fencesPaint, fenceLength);

function fetchData(N) {
    var result = [];
    for (let i = 0; i < N; i++) {
        var inputs = readline().split(' ').map(Number);
        const st = inputs[0];
        const ed = inputs[1];
        result.push([st, ed])
    }
    result.sort((a, b) => a[0] - b[0]);
    return result;
}

function gameLoop(fencesPaint, fenceLength) {
    let start = 0;
    let allPainted = true;
    for (let i = 0; i < fencesPaint.length; i++) {
        if (fencesPaint[i][0] > start) {
            console.log(start, fencesPaint[i][0]);
            allPainted = false;
        }
        start = Math.max(start, fencesPaint[i][1]);
    }
    displayResult(start, fenceLength, allPainted);
}

function displayResult(start, fenceLength, allPainted) {
    if (start < fenceLength) {
        console.log(start, fenceLength);
        allPainted = false;
    }
    if (allPainted) {
        console.log('All painted');
    }
}