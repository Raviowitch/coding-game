
const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    var line = readline().replace(/\./g, 0).replace(/f/g, 1);
    var minWaterDrops = getMinWaterDrops(line.split(''));
    console.log(minWaterDrops);
}

function getMinWaterDrops(area) {
    var waterDrops = 0;
    while (area.filter(cell => +cell === 1).length > 0) {
        // Find first cell with fire, drop water on its right if not the last
        var indexCellToDropWater = -1;
        area.forEach((cell, index) => {
            if (indexCellToDropWater === -1 && +cell === 1) {
                if (index < area.length - 1) {
                    indexCellToDropWater = index + 1;
                } else {
                    indexCellToDropWater = index;
                }
            }
        });

        // Remove fire where we drop water and cell on left and right
        area[indexCellToDropWater] = 0;
        if (indexCellToDropWater > 0) {
            area[indexCellToDropWater - 1] = 0;
        }
        if (indexCellToDropWater < area.length - 1) {
            area[indexCellToDropWater + 1] = 0;
        }   
        waterDrops++;
    }
    return waterDrops;
}