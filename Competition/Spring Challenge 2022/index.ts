enum ROLE {
    XTREM_DEFENSE = "X_DEF",
    DEFENSE = "DEF",
    ATTACK = "ATCK",
    EXPLORATOR = "EXPL",
}

enum SPELL {
    WIND = "WIND",
    CONTROL = "CONTROL",
    SHIELD = "SHIELD",
}

enum ACTION {
    WAIT = "WAIT",
    MOVE = "MOVE",
    SPELL = "SPELL",
}

enum ENTITY_TYPE {
    MONSTER = 0,
    MY_HERO = 1,
    ENNEMY_HERO = 2,
}

enum BASE_TYPE {
    MY_BASE = 1,
    ENNEMY_BASE = 2,
}

class Pos {
    constructor(public x: number, public y: number) { }

    equals = (pos: Pos): boolean => {
        return pos.x === this.x && pos.y === this.y;
    };
}

class Entity {
    distanceFromMyBase: number;
    distanceFromEnemyBase: number;
    constructor(
        protected game: Game,
        public id: number,
        public type: number,
        public pos: Pos,
        public shieldLife: number,
        public isControlled: number,
        public health?: number,
        public vx?: number,
        public vy?: number,
        public nearBase?: number,
        public threatFor?: number
    ) {
        this.distanceFromMyBase = this.getDistanceFrom(
            this.game.me.basePos.x,
            this.game.me.basePos.y
        );
        this.distanceFromEnemyBase = this.getDistanceFrom(
            this.game.enemy.basePos.x,
            this.game.enemy.basePos.y
        );
    }
    getDistanceFrom = (x: number, y: number): number => {
        return Math.sqrt(Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2));
    };
}

class Hero extends Entity {
    readonly CIRCLE_DISTANCE_FROM_HERO = 2200;
    readonly CIRCLE_DISTANCE_FROM_BASE = 6000;
    readonly CIRCLE_TARGET_SPIDER = 800;

    role: string;
    defaultSpotPos: Pos;

    constructor(
        public game: Game,
        id: number,
        type: number,
        pos: Pos,
        shieldLife: number,
        isControlled: number
    ) {
        super(game, id, type, pos, shieldLife, isControlled);

        if (id === 0) {
            this.role = ROLE.DEFENSE;
        } else if (id === 1) {
            this.role = ROLE.DEFENSE;
        } else if (id === 2) {
            this.role = ROLE.DEFENSE;
        }
    }

    spellWind = (pos: Pos): string => {
        this.game.me.mana -= this.game.me.SPELL_MANA_COST;
        return `${ACTION.SPELL} ${SPELL.WIND} ${pos.x} ${pos.y}`;
    };
    spellShield = (entityId: number): string => {
        return `${ACTION.SPELL} ${SPELL.SHIELD} ${entityId}`;
    };
    spellControl = (entityId: number): string => {
        return `${ACTION.SPELL} ${SPELL.CONTROL} ${entityId} ${this.pos.x} ${this.pos.y}`;
    };
    getClosestSpiderToMe = (distance: number): Spider => {
        const sortedSpider = this.game.spiders
            .filter(
                (e: Spider) => e.getDistanceFrom(this.pos.x, this.pos.y) <= distance
            )
            .sort(
                (a: Spider, b: Spider) =>
                    a.getDistanceFrom(this.pos.x, this.pos.y) -
                    b.getDistanceFrom(this.pos.x, this.pos.y)
            );
        if (sortedSpider.length > 0) {
            return sortedSpider[0];
        } else {
            return undefined;
        }
    };
    getClosestSpiderToEnemyBase = (): Spider => {
        const sortedSpider = this.game.spiders
            .filter(
                (e: Spider) => e.shieldLife === 0 && e.distanceFromEnemyBase <= 6000
            )
            .sort(
                (a: Spider, b: Spider) =>
                    a.getDistanceFrom(this.pos.x, this.pos.y) -
                    b.getDistanceFrom(this.pos.x, this.pos.y)
            );
        if (sortedSpider.length > 0) {
            return sortedSpider[0];
        } else {
            return undefined;
        }
    };
    getClosestEnemyToMe = (): Hero => {
        const sortedEnemies = this.game.enemy.heroes.filter(
            (e: Hero) =>
                e.getDistanceFrom(this.pos.x, this.pos.y) <=
                this.CIRCLE_DISTANCE_FROM_HERO
        );
        if (sortedEnemies.length > 0) {
            return sortedEnemies[0];
        } else {
            return undefined;
        }
    };
    defendToSpider = (spider: Spider): string => {
        const spiderDistanceFromMyBase = spider.getDistanceFrom(
            this.game.me.basePos.x,
            this.game.me.basePos.y
        );
        if (
            spiderDistanceFromMyBase < this.distanceFromMyBase &&
            spiderDistanceFromMyBase <= 3000
        ) {
            // Est-ce que je suis assez proche ?
            const distanceFromSpider = this.getDistanceFrom(
                spider.pos.x,
                spider.pos.y
            );
            if (
                distanceFromSpider <= this.game.me.SPELL_WIND_CIRCLE_DISTANCE &&
                this.game.me.canCast()
            ) {
                return this.spellWind(this.game.enemy.basePos);
            }
        }
        return `${ACTION.MOVE} ${spider.pos.x} ${spider.pos.y}`;
    };
    calculateNewRole = (): void => {
        if (this.role === ROLE.DEFENSE && this.game.turn >= 75) {
            if (this.id > 0) {
                this.role = ROLE.ATTACK;
            } else {
                this.role = ROLE.XTREM_DEFENSE;
            }
        }
        this.calculateDefaultSpot();
    };
    calculateDefaultSpot = (): void => {
        if (this.role === ROLE.XTREM_DEFENSE && this.id === 0) {
            this.defaultSpotPos =
                this.game.me.basePos.x === 0
                    ? new Pos(1130, 1130)
                    : new Pos(Game.WIDTH - 1130, Game.HEIGHT - 1130);
        } else if (this.role === ROLE.DEFENSE && this.id === 0) {
            this.defaultSpotPos =
                this.game.me.basePos.x === 0
                    ? new Pos(4500, 4500)
                    : new Pos(Game.WIDTH - 4500, Game.HEIGHT - 4500);
        } else if (this.role === ROLE.DEFENSE && this.id === 1) {
            this.defaultSpotPos =
                this.game.me.basePos.x === 0
                    ? new Pos(5800, 2200)
                    : new Pos(Game.WIDTH - 5800, Game.HEIGHT - 2200);
        } else if (this.role === ROLE.DEFENSE && this.id === 2) {
            this.defaultSpotPos =
                this.game.me.basePos.x === 0
                    ? new Pos(2200, 5800)
                    : new Pos(Game.WIDTH - 2200, Game.HEIGHT - 5800);
        } else if (this.role === ROLE.ATTACK) {
            this.defaultSpotPos =
                this.game.me.basePos.x === 0
                    ? new Pos(15000, 6200)
                    : new Pos(Game.WIDTH - 15000, Game.HEIGHT - 6200);
        } else if (this.role === ROLE.EXPLORATOR) {
            this.defaultSpotPos = new Pos(
                Math.floor(Game.WIDTH / 2),
                Game.HEIGHT / 2
            );
        }
    };

    nextAction = (): string => {
        const threathenedSpiders = this.game.getThreatenedSortedSpiders();
        this.calculateNewRole();
        switch (this.role) {
            case ROLE.XTREM_DEFENSE:
                if (threathenedSpiders.length > 0) {
                    const spider = threathenedSpiders[0];
                    const distanceFromBase = spider.getDistanceFrom(this.game.me.basePos.x, this.game.me.basePos.y);
                    if (distanceFromBase <= 2500 && this.game.me.canCast() && this.game.atLeastOneSpiderInRange(this.pos.x, this.pos.y, 1280)) {
                        return this.spellWind(this.game.enemy.basePos);
                    } else if (distanceFromBase <= 4700) {
                        return `${ACTION.MOVE} ${spider.pos.x} ${spider.pos.y}`;
                    } else {
                        return `${ACTION.MOVE} ${this.defaultSpotPos.x} ${this.defaultSpotPos.y}`;
                    }
                } else {
                    return `${ACTION.MOVE} ${this.defaultSpotPos.x} ${this.defaultSpotPos.y}`;
                }
            case ROLE.DEFENSE:
                if (threathenedSpiders.length === 0) {
                    return `${ACTION.MOVE} ${this.defaultSpotPos.x} ${this.defaultSpotPos.y}`;
                } else if (threathenedSpiders.length === 1) {
                    // Go tous sur elle
                    const spider = threathenedSpiders[0];
                    return `${ACTION.MOVE} ${spider.pos.x} ${spider.pos.y}`;
                } else {
                    // On regarde si la premiere arraigné est plus proche de l'autre hero defenseur que de soit
                    const distanceFromMe = threathenedSpiders[0].getDistanceFrom(
                        this.pos.x,
                        this.pos.y
                    );

                    const otherDefenser = this.game.me.heroes.find(
                        (h: Hero) => h.role === ROLE.DEFENSE && h.id !== this.id
                    );
                    let distanceFromOtherDefenser = Infinity;
                    if (otherDefenser) {
                        distanceFromOtherDefenser = threathenedSpiders[0].getDistanceFrom(
                            otherDefenser.pos.x,
                            otherDefenser.pos.y
                        );
                    }

                    if (distanceFromMe === distanceFromOtherDefenser) {
                        return this.defendToSpider(threathenedSpiders[this.id % 2]);
                    } else if (distanceFromMe < distanceFromOtherDefenser) {
                        // Go sur elle sinon go sur l'autre
                        return this.defendToSpider(threathenedSpiders[0]);
                    } else {
                        return this.defendToSpider(threathenedSpiders[1]);
                    }
                }
            case ROLE.ATTACK:
                console.error(this.distanceFromEnemyBase)
                if (this.game.me.canCast() && this.distanceFromEnemyBase <= 6000 && this.game.atLeastOneSpiderInRange(this.pos.x, this.pos.y, 1280)) {
                    return this.spellWind(this.game.enemy.basePos);
                } else {
                    const closestSpiderToEnemyBase = this.getClosestSpiderToEnemyBase();
                    if (closestSpiderToEnemyBase) {
                        return `${ACTION.MOVE} ${closestSpiderToEnemyBase.pos.x} ${closestSpiderToEnemyBase.pos.y}`;
                    } else {
                        return `${ACTION.MOVE} ${this.defaultSpotPos.x} ${this.defaultSpotPos.y}`;
                    }
                }
            case ROLE.EXPLORATOR:
                const closestSpider = this.getClosestSpiderToMe(
                    this.CIRCLE_DISTANCE_FROM_HERO
                );
                if (closestSpider) {
                    return `${ACTION.MOVE} ${closestSpider.pos.x} ${closestSpider.pos.y}`;
                } else {
                    // TODO go random pos
                    return `${ACTION.MOVE} ${this.defaultSpotPos.x} ${this.defaultSpotPos.y}`;
                }
        }
        return ACTION.WAIT;
    };
}

class Spider extends Entity {
    threatLevel: number;

    constructor(
        id: number,
        type: number,
        pos: Pos,
        shieldLife: number,
        isControlled: number,
        health: number,
        vx: number,
        vy: number,
        nearBase: number,
        threatFor: number,
        public game: Game
    ) {
        super(
            game,
            id,
            type,
            pos,
            shieldLife,
            isControlled,
            health,
            vx,
            vy,
            nearBase,
            threatFor
        );
        this.threatLevel = this.computeThreatLevel();
    }

    isDangerousForMyBase = (): boolean => {
        return this.threatFor === BASE_TYPE.MY_BASE;
    };
    isDangerousForEnemyBase = (): boolean => {
        return this.threatFor === BASE_TYPE.ENNEMY_BASE;
    };
    computeThreatLevel = (): number => {
        let threatLevel = 0;
        if (this.nearBase === 1 && this.isDangerousForMyBase()) {
            threatLevel = 1000;
        } else if (this.isDangerousForMyBase()) {
            threatLevel = 200;
        }
        threatLevel += 500 * (1 / (this.distanceFromMyBase + 1)) * 1000;

        return threatLevel;
    };
}

class Player {
    readonly SPELL_MANA_COST = 10;
    readonly SPELL_WIND_CIRCLE_DISTANCE = 1280;
    readonly SPELL_SHIELD_CIRCLE_DISTANCE = 2200;
    heroes = [];

    constructor(
        public basePos: Pos,
        public baseHealth: number,
        public mana: number
    ) { }
    setHealth = (value: number) => {
        this.baseHealth = value;
    };
    setMana = (value: number) => {
        this.mana = value;
    };
    canCast = (): boolean => {
        return this.mana >= this.SPELL_MANA_COST;
    };
    addHero = (entity: Hero) => {
        this.heroes.push(entity);
    };
}

class Game {
    static readonly WIDTH = 17630;
    static readonly HEIGHT = 9000;
    me: Player;
    enemy: Player;
    spiders: Spider[];
    turn: number;

    constructor(basePos: Pos) {
        this.me = new Player(basePos, 3, 0);
        this.enemy = new Player(
            new Pos(baseX === 0 ? Game.WIDTH : 0, baseY === 0 ? Game.HEIGHT : 0),
            3,
            0
        );
    }

    newTurn = (
        health: number,
        mana: number,
        enemyHealth: number,
        enemyMana: number,
        turn: number
    ) => {
        this.me.setHealth(health);
        this.me.setMana(mana);
        this.enemy.setHealth(enemyHealth);
        this.enemy.setMana(enemyMana);
        this.me.heroes = [];
        this.enemy.heroes = [];
        this.spiders = [];
        this.turn = turn;
    };

    addSpider = (entity: Spider) => {
        this.spiders.push(entity);
    };

    getHeroForIteration = (iteration: number): Hero => {
        return this.me.heroes.find((e: Entity) => e.id === iteration);
    };

    getDangerousSpiders = (): Spider[] => {
        return this.spiders.filter((e: Spider) => e.isDangerousForMyBase());
    };

    getDangerousSpidersForEnemy = (): Spider[] => {
        return this.spiders.filter((e: Spider) => e.isDangerousForEnemyBase());
    };

    getThreatenedSortedSpiders = (): Spider[] => {
        return this.getDangerousSpiders().sort(
            (a: Spider, b: Spider) => b.threatLevel - a.threatLevel
        );
    };

    getClosestEnemy = (): Spider => {
        const dangerousSpiders = this.spiders.sort(
            (a: Spider, b: Spider) => a.distanceFromMyBase - b.distanceFromMyBase
        );
        if (dangerousSpiders.length > 0) {
            return dangerousSpiders[0];
        } else {
            return undefined;
        }
    };

    atLeastOneSpiderInRange = (x: number, y: number, distance: number): boolean => {
        for (let i = 0; i < this.spiders.length; i++) {
            if (this.spiders[i].shieldLife === 0 && this.spiders[i].getDistanceFrom(x, y) <= distance) {
                return true;
            }
        }
        return false;
    }

    nextAction = (iteration: number): string => {
        const hero = this.getHeroForIteration(iteration);
        return hero.nextAction() + " " + hero.role;
    };
    debug = (message: string, ...rest) => {
        console.error(message, ...rest);
    };
}

const [baseX, baseY] = readline().split(" ").map(Number); // The corner of the map representing your base
const heroesPerPlayer = Number(readline()); // Always 3
const game = new Game(new Pos(baseX, baseY));

// game loop
let turn = 0;
while (true) {
    const [baseHealth, myMana]: number[] = readline().split(" ").map(Number);
    const [ennemyBaseHealth, ennemyMana]: number[] = readline()
        .split(" ")
        .map(Number);
    game.newTurn(baseHealth, myMana, ennemyBaseHealth, ennemyMana, turn++);

    const entityCount: number = Number(readline()); // Amount of heros and monsters you can see
    for (let i = 0; i < entityCount; i++) {
        const inputs: number[] = readline().split(" ").map(Number);
        if (inputs[1] === 1) {
            game.me.addHero(
                new Hero(
                    game,
                    i < 3 ? i : i - 3,
                    inputs[1],
                    new Pos(inputs[2], inputs[3]),
                    inputs[4],
                    inputs[5]
                )
            );
        } else if (inputs[1] === 0) {
            game.addSpider(
                new Spider(
                    inputs[0],
                    inputs[1],
                    new Pos(inputs[2], inputs[3]),
                    inputs[4],
                    inputs[5],
                    inputs[6],
                    inputs[7],
                    inputs[8],
                    inputs[9],
                    inputs[10],
                    game
                )
            );
        } else {
            game.enemy.addHero(
                new Hero(
                    game,
                    -1,
                    inputs[1],
                    new Pos(inputs[2], inputs[3]),
                    inputs[4],
                    inputs[5]
                )
            );
        }
    }
    for (let i = 0; i < heroesPerPlayer; i++) {
        console.log(game.nextAction(i));
    }
}
