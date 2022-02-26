// https://www.codingame.com/training/medium/next-car-license-plate

gameLoop();

function gameLoop() {
    var startPlate = readline().split('-');
    var sum = +startPlate[1] + +readline();
    while (sum > 999) {
        if (startPlate[2][1] !== 'Z') {
            startPlate[2] = addOneCharacter(startPlate[2], 0, 1);
        } else {
            if (startPlate[2][0] !== 'Z') {
                startPlate[2] = getNextChar(startPlate[2]) + 'A';
            } else {
                startPlate[2] = 'AA';
                startPlate[0] = startPlate[0][1] !== 'Z' ? addOneCharacter(startPlate[0], 0, 1) : getNextChar(startPlate[0]) + 'A';
            }
        }
        sum -= 999;
    }
    startPlate[1] = sum.toString().padStart(3, '0')
    console.log(startPlate.join('-'))
}

function addOneCharacter(str, valueToKeep, ValueToUp) {
    return str[valueToKeep] + getNextChar(str, ValueToUp);
}

function getNextChar(str, ValueToUp = 0) {
    return String.fromCharCode(str.charCodeAt(ValueToUp) + 1)
}