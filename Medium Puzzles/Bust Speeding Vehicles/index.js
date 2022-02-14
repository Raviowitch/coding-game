const speedMax = +readline();
const N = +readline();

displayViolations(getSpeedViolations(getAllRecords(N)));

function getAllRecords(N) {
    var records = new Map();
    for (let i = 0; i < N; i++) {
        const R = readline().split(' ');
        if (records.has(R[0])) {
            records.set(R[0], [...records.get(R[0]), { km: +R[1], timestamp: +R[2] }]);
        } else {
            records.set(R[0], [{ km: +R[1], timestamp: +R[2] }]);
        }
    }
    return records;
}

function getSpeedViolations(recordsByCar) {
    var speedViolations = [];
    recordsByCar.forEach((records, car) => {
        var previousRecord = null;
        records.forEach(record => {
            if (previousRecord && checkIfSpeedViolation(previousRecord, record, speedMax)) {
                speedViolations.push(`${car} ${record.km}`);
            }
            previousRecord = record;
        })
    })
    return speedViolations;
}
function checkIfSpeedViolation(previous, actual, speedMax) {
    var distance = actual.km - previous.km;
    var timeInSec = actual.timestamp - previous.timestamp;
    var speed = distance / (timeInSec / 3600);
    return speed > speedMax;
}

function displayViolations(violations) {
    if (violations.length === 0) {
        console.log('OK');
    } else {
        violations.forEach(violation => {
            console.log(violation);
        })
    }
}