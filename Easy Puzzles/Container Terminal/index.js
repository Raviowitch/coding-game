const N = readline();
for (let i = 0; i < N; i++) {
    var areas = [];
    const line = readline().split('');
    line.forEach(container => {
        var areaIndex = getBestAreaForThisContainer(areas, container);
        if (areaIndex === -1) {
            areas.push(container);
        } else {
            areas[areaIndex] += container;
        }
    })
    console.log(areas.length);
}

// If no area with container equal or lower on the top return -1 else return area index
function getBestAreaForThisContainer(areas, container) {
    return areas.findIndex(area => area[area.length - 1] >= container);
}