const numberOfCages = parseInt(readline());
const years = parseInt(readline());
var cages = createCages(numberOfCages);

gameLoop(years, cages)

function gameLoop(years, cages) {
    var atLeastOnePorcupineAlive = true;
    for (let i = 0; i < years && atLeastOnePorcupineAlive; i++) {
        cages.filter(cage => cage.sick > 0).forEach(cage => {
            var sickPorcupineLastYear = cage.sick;
            killSickPorcupine(cage);
            contaminatePorcupine(cage, sickPorcupineLastYear);
        })
        var porcupinesAlive = getTotalAlive(cages);
        if (porcupinesAlive === 0) {
            atLeastOnePorcupineAlive = false;
        }
        console.log(porcupinesAlive);
    }
}

function createCages(numberOfCages) {
    var result = [];
    for (let i = 0; i < numberOfCages; i++) {
        var cageData = readline().split(' ');
        const S = +cageData[0];
        const H = +cageData[1];
        const A = +cageData[2];
        result.push({ sick: S, healthy: H, alive: A })
    }
    return result;
}
function killSickPorcupine(cage) {
    cage.alive -= cage.sick;
    cage.alive = Math.max(0, cage.alive);
    cage.sick = 0;
    return cage;
}

function contaminatePorcupine(cage, sickPorcupineLastYear) {
    cage.healthy -= sickPorcupineLastYear * 2;
    cage.healthy = Math.max(0, cage.healthy);
    cage.sick = sickPorcupineLastYear * 2;
    return cage;
}

function getTotalAlive(cages) {
    var sum = 0;
    cages.forEach(cage => sum += cage.alive);
    return sum;
}