// https://www.codingame.com/training/easy/horse-racing-hyperduals

gameLoop();

function gameLoop() {
    var horses = [...Array(+readline())].map(_ => {
        var inputs = readline().split(' ');
        return { velocity: +inputs[0], elegance: +inputs[1] }
    });
    var minGap = Infinity;
    for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
            if (i !== j) {
                minGap = Math.min(minGap, getDistance(horses[i], horses[j]));
            }
        }
    }
    console.log(minGap);
}

function getDistance(horse, previousHorse) {
    return Math.abs(previousHorse.velocity - horse.velocity) + Math.abs(previousHorse.elegance - horse.elegance);
}