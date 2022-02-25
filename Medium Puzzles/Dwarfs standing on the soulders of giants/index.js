// https://www.codingame.com/training/medium/dwarfs-standing-on-the-shoulders-of-giants

gameLoop()

function gameLoop() {
    var people = getPeople();
    var maxInfluence = 0;
    people.forEach((p, key) => {
        var influence = 1 + findMax(key, people);
        if(influence > maxInfluence) {
            maxInfluence = influence;
        }
    });
    console.log(maxInfluence);
}
function getPeople() {
    const n = +readline(); 
    var people = new Map();
    for (let i = 0; i < n; i++) {
        [x, y] = readline().split(' ');
        if (!people.has(x)) {
            people.set(x, [])
        }
        people.set(x,  [...people.get(x), y]);
    }
    return people;
}
function findMax(key, people) {
    var max = 0;
    if(people.has(key)){
        people.get(key).forEach(value => {
            var influence = 1 + findMax(value, people);
            if(influence > max) {
                max = influence;
            }
        })
    }
    return max;
}
