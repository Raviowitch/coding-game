// https://www.codingame.com/training/medium/connect-the-hyper-dots

[count, n] = readline().split(' ').map(Number);

var points = [...Array(count)].map(_ => {
    [value, ...coordinates] = readline().split(' ');
    return { value, coordinates }
});

gameLoop(points);

function gameLoop(points) {
    var result = '';
    var previous = { val: null, coordinates: [...Array(n)].map(_ => 0) }
    while (points.length > 0) {
        var closestPointIndex = findClosest(points, previous, n)
        if (checkIfCrossAnAxis(previous, points[closestPointIndex])) {
            result += ' ';
        }
        result += points[closestPointIndex].value;
        previous = points[closestPointIndex];
        points.splice(closestPointIndex, 1);
    }
    console.log(result);
}

function findClosest(points, previous, n) {
    var closest = null;
    for (let i = 0; i < points.length; i++) {
        var distance = calculateDistance(previous, points[i], n)
        if (!closest || distance < closest.distance) {
            closest = { id: i, distance: distance };
        }
    }
    return closest.id;
}

function calculateDistance(pt1, pt2, n) {
    var distance = 0;
    for (let i = 0; i < n; i++) {
        distance += Math.pow(pt1.coordinates[i] - pt2.coordinates[i], 2)
    }
    distance = Math.sqrt(distance);
    return distance;
}

function checkIfCrossAnAxis(pt1, pt2) {
    for (let i = 0; i < n; i++) {
        if ((pt1.coordinates[i] < 0 && pt2.coordinates[i] > 0) || (pt1.coordinates[i] > 0 && pt2.coordinates[i] < 0)) {
            return true;
        }
    }
    return false;
}