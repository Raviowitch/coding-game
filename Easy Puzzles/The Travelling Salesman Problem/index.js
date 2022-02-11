// https://www.codingame.com/ide/puzzle/the-travelling-salesman-problem

gameLoop(getCities())

function getCities() {
    const numberOfcities = +readline();
    var cities = [];
    for (let i = 0; i < numberOfcities; i++) {
        var inputs = readline().split(' ');
        cities.push({ x: +inputs[0], y: +inputs[1] });
    }
    return cities;
}

function gameLoop(cities) {
    var totalDistance = 0;
    var firstCity = lastCityVisited = cities[0];
    while (cities.length > 0) {
        var closestCity = closestIndex = -1;
        cities.forEach((city, index) => {
            var d = distance(lastCityVisited, city);
            if (closestCity === -1 || d < closestCity) {
                closestCity = d;
                closestIndex = index;
            }
        })
        totalDistance += closestCity;
        lastCityVisited = cities.splice(closestIndex, 1)[0];

        // To return to the origin city
        if (cities.length === 0) {
            totalDistance += distance(lastCityVisited, firstCity);
        }
    }
    console.log(Math.round(totalDistance));
}

function distance(city1, city2) {
    return Math.sqrt((city1.x - city2.x) ** 2 + (city1.y - city2.y) ** 2)
}