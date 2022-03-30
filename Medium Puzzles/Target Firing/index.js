// https://www.codingame.com/training/medium/target-firing

class Ship {
    constructor(type, hp, armor, damage) {
        this.type = type;
        this.hp = hp;
        this.armor = armor;
        this.damage = damage;
    }

    value() {
        var nbTourToKill = Math.ceil(this.hp / this.damageToTake());
        return this.damage / nbTourToKill;
    }

    damageToTake() {
        var damage = this.boostDamage() * 10 - this.armor;
        return damage <= 0 ? 1 : damage;
    }

    isDestroy() {
        return this.hp <= 0;
    }

    boostDamage() {
        return this.type === 'FIGHTER' ? 2 : 1;
    }
}

const N = +readline();

var ships = [...Array(N)].map(_ => {
    const inputs = readline().split(' ');
    return new Ship(inputs[0], +inputs[1], +inputs[2], +inputs[3])
});

ships.sort((a, b) => {
    return b.value() - a.value();
})

gameLoop(ships);

function gameLoop(ships) {
    var shield = 5000;
    while (ships.length > 0 && shield > 0) {
        shield -= attackOfAllShips(ships);
        ships[0].hp -= ships[0].damageToTake();
        if (ships[0].isDestroy()) {
            ships.shift();
        }
    }
    console.log(shield < 0 ? 'FLEE' : shield);
}

function attackOfAllShips(ships) {
    var result = 0;
    ships.forEach(ship => result += ship.damage)
    return result;
}