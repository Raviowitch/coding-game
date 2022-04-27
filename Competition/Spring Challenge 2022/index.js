var inputs = readline().split(' ');
const baseX = parseInt(inputs[0]);
const baseY = parseInt(inputs[1]);
const heroesPerPlayer = parseInt(readline());

const baseXOpponent = baseX === 0 ? 17630 : 0;
const baseYOpponent = baseY === 0 ? 9000 : 0;

var heroes_position = [[1130, 1130]];
if (baseX !== 0) {
    heroes_position = [[17630-1130, 9000-1130]];
}
while (true) {
    let spiders = [];
    let my_heroes = [];
    let opponent_heroes = [];
    let hero_infos_mana = 0;
    for (let i = 0; i < 2; i++) {
        var inputs = readline().split(' ');
        const health = parseInt(inputs[0]);
        const mana = parseInt(inputs[1]);
        if (i === 0) {
            hero_infos_mana = mana;
        }
    }
    const entityCount = parseInt(readline());
    for (let i = 0; i < entityCount; i++) {
        var inputs = readline().split(' ');
        const entity = createEntity(inputs);
        if (entity.type === 0) {
            spiders.push(entity);
        } else if (entity.type === 1) {
            my_heroes.push(entity);
        } else {
            opponent_heroes.push(entity);
        }
    }

    sorted_spiders = [];
    for (let i = 0; i < spiders.length; i++) {
        let threat_level = 0;
        if (spiders[i].nearBase === 1 && spiders[i].threatFor === 1) {
            threat_level = 1000;
        } else if (spiders[i].threatFor === 1) {
            threat_level = 200;
        }
        let distanceBetweenBaseAndSpider = getDistance(baseX, baseY, spiders[i]);
        console.error(distanceBetweenBaseAndSpider);
        threat_level += (500 * (1 / (distanceBetweenBaseAndSpider + 1))) * 1000;
        sorted_spiders.push({ threat_level, spider: spiders[i] });
    }
    sorted_spiders.sort((a, b) => {
        return b.threat_level - a.threat_level;
    })
    for (let i = 0; i < heroesPerPlayer; i++) {
        if (i === 0) {
            if (sorted_spiders.length > 0 && getDistance(baseX, baseY, sorted_spiders[0].spider) <= 2500 && atLeastOneSpiderClose(my_heroes[0].x, my_heroes[0].y, spiders, 1280) && hero_infos_mana >= 10) {
                console.log(`SPELL WIND ${baseXOpponent} ${baseYOpponent}`);
            } else if (sorted_spiders.length > 0 && getDistance(baseX, baseY, sorted_spiders[0].spider) <= 4700) {
                console.log(`MOVE ${sorted_spiders[0].spider.x} ${sorted_spiders[0].spider.y}`);
            } else {
                console.log(`MOVE ${heroes_position[0][0]} ${heroes_position[0][1]}`)
            }
        } else if (i === 1) {
            if (sorted_spiders.length > i) {
                console.log(`MOVE ${sorted_spiders[i].spider.x} ${sorted_spiders[i].spider.y}`);
            } else {
                if (sorted_spiders.length > 0 && i <= 1) {
                    console.log(`MOVE ${sorted_spiders[0].spider.x} ${sorted_spiders[0].spider.y}`);
                } else {
                    moveInFrontOfBase(i)
                }
            }
        } else {
            attackLogic(hero_infos_mana, spiders, my_heroes[2]);
        }
    }
}

function attackLogic(hero_infos_mana, spiders, attacker) {
    if (hero_infos_mana >= 10 && atLeastOneSpiderClose(attacker.x, attacker.y, spiders, 1280)) {
        console.log(`SPELL WIND ${baseXOpponent} ${baseYOpponent}`);
    } else {
        var closestSpider = findClosestSpiderOnEnnemyBase(spiders, 6200);
        if (closestSpider) {
            console.log(`MOVE ${closestSpider.x} ${closestSpider.y}`);
        } else if (baseX === 0) {
            console.log(`MOVE 14800 6200`);
        } else {
            console.log(`MOVE 2150 2150`);
        }
    }
}

function createEntity(inputs) {
    const id = parseInt(inputs[0]);
    const type = parseInt(inputs[1]); // 0=monster, 1=your hero, 2=opponent hero
    const x = parseInt(inputs[2]);
    const y = parseInt(inputs[3]);
    const shieldLife = parseInt(inputs[4]);
    const isControlled = parseInt(inputs[5]);
    const health = parseInt(inputs[6]);
    const vx = parseInt(inputs[7]);
    const vy = parseInt(inputs[8]);
    const nearBase = parseInt(inputs[9]);
    const threatFor = parseInt(inputs[10]);
    return { id, type, x, y, shieldLife, isControlled, health, vx, vy, nearBase, threatFor }
}

function getDistance(x, y, spider) {
    return Math.hypot((x - spider.x), (y - spider.y))
}

function moveInFrontOfBase(i) {
    if (baseX === 0) {
        console.log(`MOVE 4500 4200`);
    } else {
        console.log(`MOVE 12200 5200`);
    }
}

function atLeastOneSpiderClose(x, y, spiders, distance) {
    for (let i = 0; i < spiders.length; i++) {
        if(spiders[i].shieldLife === 0 && getDistance(x, y, spiders[i]) <= distance) {
            return true;
        }
    }
    return false;
}

function findClosestSpiderOnEnnemyBase(spiders, distance) {
    var closestDistance = Infinity;
    var closestSpider = null;
    for (let i = 0; i < spiders.length; i++) {
        var dist = getDistance(baseXOpponent, baseYOpponent, spiders[i]);
        if(spiders[i].shieldLife === 0 &&  dist < closestDistance && dist < distance) {
            closestDistance = getDistance(baseXOpponent, baseYOpponent, spiders[i]);
            closestSpider = spiders[i];
        }
    }
    return closestSpider;
}

function findClosestSpiderOnEnnemyBaseToControl(attacker, spiders, distance) {
    var closestDistance = Infinity;
    var closestSpider = null;
    for (let i = 0; i < spiders.length; i++) {
        var dist = getDistance(baseXOpponent, baseYOpponent, spiders[i]);
        var distSpiderToHero = getDistance(attacker.x, attacker.x, spiders[i]);
        if(spiders[i].shieldLife === 0 &&  dist < closestDistance && dist < distance && distSpiderToHero <= 2200) {
            closestDistance = getDistance(baseXOpponent, baseYOpponent, spiders[i]);
            closestSpider = spiders[i];
        }
    }
    return closestSpider;
}