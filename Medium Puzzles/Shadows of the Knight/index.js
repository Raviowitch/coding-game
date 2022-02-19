// https://www.codingame.com/training/medium/shadows-of-the-knight-episode-1

[W, H] = readline().split(' ').map(Number);
const N = +readline(); // Not used
[X, Y] = readline().split(' ').map(Number);
var minX = minY = 0, maxX = W, maxY = H;

while (true) {
    const bombDir = readline();
    if (bombDir.includes("U")) {
        maxY = Y-1;
        Y -= Math.round((Y-minY)/2);
    } else if (bombDir.includes("D")) {
        minY = Y+1;
        Y += Math.round((maxY-Y)/2);
    } 
    if (bombDir.includes("R")) {
        minX = X+1;
        X += Math.round((maxX-X)/2);
    } else if (bombDir.includes("L")) {
        maxX = X-1;
        X -= Math.round((X-minX)/2);
    }
    console.log(`${X} ${Y}`);
}
