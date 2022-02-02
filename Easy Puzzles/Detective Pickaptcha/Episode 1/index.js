var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
displayLog(`Width ${width}`, true)
displayLog(`Height ${height}`, true)
var map = [];
for (let i = 0; i < height; i++) {
    const line = readline().split('');
    line.forEach((point, index) => {
        map.push({ x: index, y: i, value: point })
    })
}
map.forEach(point => {
    if (point.value !== '#') {
        point.value = checkPassage(map, point, width, height);
    }
})

displayResult(map, height);

function checkPassage(map, point, width, height) {
    var passage = 0;
    if (point.x < (width - 1) && map.find(pt => pt.x === point.x + 1 && pt.y === point.y).value !== '#') {
        displayLog(`++X aprés`, true);
        passage++;
    }
    if (point.x > 0 && map.find(pt => pt.x === point.x - 1 && pt.y === point.y).value !== '#') {
        displayLog(`++X avant`, true);
        passage++;
    }
    if (point.y < (height - 1) && map.find(pt => pt.y === point.y + 1 && pt.x === point.x).value !== '#') {
        displayLog(`++Y après`, true);
        passage++;
    }
    if (point.y > 0 && map.find(pt => pt.y === point.y - 1 && pt.x === point.x).value !== '#') {
        displayLog(`++Y avant`, true);
        passage++;
    }
    return passage;
}

function displayResult(map, height) {
    for (let i = 0; i < height; i++) {
        console.log(map.filter(pt => pt.y === i).map(p => p.value).join(''));
    }
}

function displayLog(message, isDebug) {
    if (isDebug) {
        console.error(message);
    } else {
        console.log(message);
    }
}