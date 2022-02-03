[n, m, c] = readline().split(' ');
var appliances = getAllAppliances(readline().split(' '), n);
var powerExceedMainFuse = false;
var maxConsumption = 0;
gameLoop(readline().split(' '), m, c);

function getAllAppliances(powerOfEachAppliance, numberOfAppliances) {
    var result = [];
    for (let i = 0; i < numberOfAppliances; i++) {
        const nx = parseInt(powerOfEachAppliance[i]);
        result.push({ id: i + 1, power: nx, isActif: false })
    }
    return result;
}

function gameLoop(idOfAppliancesWithSwitchActifValue, numberOfClickOnButton, mainFusePower) {
    for (let i = 0; i < numberOfClickOnButton; i++) {
        const mx = parseInt(idOfAppliancesWithSwitchActifValue[i]);
        var app = appliances.find(appliance => appliance.id === mx)
        app.isActif = !app.isActif;
        checkFuse(appliances, mainFusePower);
    }
    displayResult(powerExceedMainFuse, maxConsumption);
}

function checkFuse(appliances, mainFuse) {
    var appliancesOn = appliances.filter(appliance => appliance.isActif === true);
    if (appliancesOn.length > 0) {
        var sumConsumption = 0;
        appliancesOn.forEach(app => sumConsumption += app.power)
        if (sumConsumption > mainFuse) {
            powerExceedMainFuse = true;
        } else {
            maxConsumption = Math.max(maxConsumption, sumConsumption)
        }
    }
}

function displayResult(isBlown, maxConsumption) {
    if (isBlown) {
        console.log('Fuse was blown.');
    } else {
        console.log('Fuse was not blown.');
        console.log(`Maximal consumed current was ${maxConsumption} A.`);
    }
}