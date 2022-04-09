// https://www.codingame.com/training/easy/a-bunny-and-carrots

gameLoop();

function gameLoop() {
    [height, width] = readline().split(' ').map(Number);
    const map = [...Array(height)].map(_ => new Array(width).fill('C'));
    const t = readline(); // Not Used

    readline().split(' ').forEach(choice => {
        var cellEaten = null;
        map.forEach((row, indexY) => {
            row.forEach((cell, indexX) => {
                if (indexX === choice - 1 && cell === 'C') {
                    cellEaten = { x: indexX, y: indexY }
                }
            })
        })
        removeCarrotEaten(map, cellEaten);
        console.log(calculatePerimeter(map, width, height));
    })
}

function removeCarrotEaten(map, cellEaten) {
    map[cellEaten.y][cellEaten.x] = 'X';
}

function calculatePerimeter(map, width, height) {
    var perimeter = 0;
    map.forEach((row, indexY) => {
        row.forEach((cell, indexX) => {
            if (cell === 'C') {
                if (indexY === 0 || (indexY > 0 && map[indexY - 1][indexX] !== 'C')) {
                    perimeter++;
                }
                if (indexY === height - 1 || (indexY < height - 1 && map[indexY + 1][indexX] !== 'C')) {
                    perimeter++;
                }
                if (indexX === 0 || (indexX > 0 && map[indexY][indexX - 1] !== 'C')) {
                    perimeter++;
                }
                if (indexX === width - 1 || (indexX < width - 1 && map[indexY][indexX + 1] !== 'C')) {
                    perimeter++;
                }
            }
        })
    })
    return perimeter;
}