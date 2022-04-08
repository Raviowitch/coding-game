
gameLoop();

function gameLoop() {
    const catSpeed = +readline();
    var safeX, safeY;
    var minDistanceToWin = 80;
    while (true) {
        [mouseX, mouseY, catX, catY] = readline().split(' ').map(Number);
        if (safeX) {
            console.log(`${safeX} ${safeY}`)
        } else if (checkIfSafeToRushBorder(mouseX, mouseY, catX, catY, catSpeed, minDistanceToWin)) {
            safeX = Math.trunc(-catX * 1.01);
            safeY = Math.trunc(-catY * 1.01);
            console.log(`${safeX} ${safeY}`)
        } else {
            var dirX = -catX, dirY = -catY;
            catY < 0 ? dirY -= minDistanceToWin: dirY += minDistanceToWin;
            catX < 0 ? dirX -= minDistanceToWin: dirX += minDistanceToWin;
            console.log(`${dirX} ${dirY}`)
        }
    }
}


function checkIfSafeToRushBorder(mouseX, mouseY, catX, catY, catSpeed, minDistanceToWin) {
    const distFromMouseToBorder = Math.sqrt((-catX - mouseX) ** 2 + (-catY - mouseY) ** 2);
    const mouseTime = distFromMouseToBorder / 10;
    const catTime = (Math.PI * 500 - minDistanceToWin) / catSpeed;
    return mouseTime < catTime;
}