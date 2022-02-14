// https://www.codingame.com/training/medium/the-fastest

console.log(gameLoop(readline()));

function gameLoop(participants) {
    var min = null;
    var minInString = null;
    for (let i = 0; i < participants; i++) {
        const t = readline().split(':');
        console.error(t)
        var timeInSec = +t[0] * 3600 + +t[1] * 60 + +t[2];
        console.error(timeInSec)
        if (min === null || timeInSec < min) {
            min = timeInSec;
            minInString = t.join(':')
        }
    }
    return minInString;
}