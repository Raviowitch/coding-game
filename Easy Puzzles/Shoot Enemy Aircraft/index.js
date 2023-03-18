//https://www.codingame.com/training/easy/shoot-enemy-aircraft

gameLoop(getAircraftsPosition())

function getAircraftsPosition() {
    const n = parseInt(readline());
    var aircrafts = [];
    var missilePosition;
    for (let i = 0; i < n; i++) {
        readline().split('').forEach((pt, index) => {
            if (['<', '>'].includes(pt)) {
                aircrafts.push({ x: index, y: i });
            } else if (pt === '^') {
                missilePosition = { x: index, y: i };
            }
        })
    }
    aircrafts.forEach(aircraft => {
        const distanceH = Math.abs(aircraft.x - missilePosition.x);
        const distanceV = Math.abs(aircraft.y - missilePosition.y) + 1;
        aircraft.timeToShoot = distanceH - distanceV;
    })
    return aircrafts;
}

function gameLoop(aircrafts) {
    var missilesLaunch = 0;
    var i = 0;
    while (missilesLaunch < aircrafts.length) {
        if (aircrafts.some(aircraft => aircraft.timeToShoot === i)) {
            console.log('SHOOT');
            missilesLaunch++;
        } else {
            console.log('WAIT');
        }
        i++;
    }
}
