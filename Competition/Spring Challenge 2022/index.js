var inputs = readline().split(' ');
const baseX = parseInt(inputs[0]);
const baseY = parseInt(inputs[1]);
const heroesPerPlayer = parseInt(readline());

const baseXOpponent = baseX === 0 ? 17630 : 0;
const baseYOpponent = baseY === 0 ? 9000 : 0;

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
        let distanceBetweenBaseAndSpider = getDistance(spiders[i]);
        console.error(distanceBetweenBaseAndSpider);
        threat_level += (500 * (1 / (distanceBetweenBaseAndSpider + 1))) * 1000;
        sorted_spiders.push({ threat_level, spider: spiders[i] });
    }
    sorted_spiders.sort((a, b) => {
        return b.threat_level - a.threat_level;
    })
    for (let i = 0; i < heroesPerPlayer; i++) {
        // Le premier héros est statique, il reste en défense et se contente de faire des spells WIND pour repousser les ennemis
        // Strat pussy
        if (i === 0) {
            if (sorted_spiders.length > 0 && sorted_spiders[0].threat_level > 1200 && hero_infos_mana >= 10) {
                console.log(`SPELL WIND ${baseXOpponent} ${baseYOpponent}`);
            } else {
                console.log('WAIT');
            }
        } else {
            if (sorted_spiders.length > i) {
                console.log(`MOVE ${sorted_spiders[i].spider.x} ${sorted_spiders[i].spider.y}`);
            } else {
                if (sorted_spiders.length > 0) {
                    console.log(`MOVE ${sorted_spiders[0].spider.x} ${sorted_spiders[0].spider.y}`);
                } else {
                    console.log('WAIT');
                }
            }
        }



        // In the first league: MOVE <x> <y> | WAIT; In later leagues: | SPELL <spellParams>;
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

function getDistance(spider) {
    return Math.hypot((baseX - spider.x), (baseY - spider.y))
}