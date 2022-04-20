// https://www.codingame.com/training/easy/dolbears-law

const M = +readline();
var valuesByMinutes = [];
for (let i = 0; i < M; i++) {
    const LINE = readline().split(' ');
    valuesByMinutes.push({ values: LINE, temp: getEstimateTemperature(LINE) });
}

gameloop(valuesByMinutes);

function gameloop(values) {
    var sumTemp = getSumTemp(values);
    console.log(sumTemp);
    if (sumTemp >= 5 && sumTemp <= 30) {
        var sumTemp1 = getSumWithSecondMethod(values);
        console.log(sumTemp1);
    }
}

function getEstimateTemperature(values) {
    var chirps = 0;
    values.forEach(val => {
        chirps += +val;
    })
    return 10 + (chirps - 40) / 7;
}

function getSumTemp(values) {
    var tempSum = 0;
    values.forEach(val => {
        tempSum += val.temp;
    })
    return parseFloat(tempSum / values.length).toFixed(1);
}

function getSumWithSecondMethod(values) {
    var result = 0;
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].values.length; j++) {
            result += +values[i].values[j]
        }
    }
    return parseFloat((result / (values.length * 7.5)) + 5).toFixed(1);
}