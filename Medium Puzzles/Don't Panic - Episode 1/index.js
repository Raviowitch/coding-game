// https://www.codingame.com/training/medium/don't-panic-episode-1

[nbFloors, width, nbRounds, exitFloor, exitPos, nbTotalClones, nbAdditionalElevators, nbElevators] = readline().split(' ').map(Number);

var elevators = [...Array(nbElevators)].map(_ => {
    var inputs = readline().split(' ');
    return { floor: +inputs[0], pos: +inputs[1] };
});

while (true) {
    var inputs = readline().split(' ');
    const cloneFloor = parseInt(inputs[0]);
    const clonePos = parseInt(inputs[1]);
    const direction = inputs[2];

    var posExitOrElevator = null;
    if (cloneFloor === exitFloor) {
        posExitOrElevator = exitPos;
    } else if (elevators.find(e => e.floor === cloneFloor)) {
        posExitOrElevator = elevators.find(e => e.floor === cloneFloor).pos;
    }

    if ((direction === "RIGHT" && posExitOrElevator < clonePos) || (direction === "LEFT" && posExitOrElevator > clonePos)) {
        console.log("BLOCK");
    } else {
        console.log("WAIT");
    }
}
