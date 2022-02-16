// https://www.codingame.com/training/medium/the-experience-for-creating-puzzles

gameLoop(readline(), readline(), 300 * readline())

function gameLoop(level, xp, xpTotal) {
    while (xpTotal >= xp) {
        level++;
        xpTotal -= xp;
        xp = Math.trunc(level * Math.sqrt(level) * 10);
    }
    console.log(level)
    console.log(xp - xpTotal)
}