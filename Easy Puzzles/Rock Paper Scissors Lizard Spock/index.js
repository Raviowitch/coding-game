tournament(getPlayers());

function getPlayers() {
    var players = [];
    var numberOfPlayers = parseInt(readline());
    for (let i = 0; i < numberOfPlayers; i++) {
        var inputs = readline().split(' ');
        players.push({
            number: +inputs[0], sign: inputs[1], opponents: []
        });
    }
    return players;
}

function tournament(players) {
    const tempPlayers = [];
    for (let i = 1; i <= players.length - 1; i += 2) {
        const P1 = players[i - 1];
        const P2 = players[i];
        const winner = fight(P1, P2);
        winner.opponents.push(P1.number === winner.number ? P2.number : P1.number)
        tempPlayers.push(winner);
    }
    if (tempPlayers.length > 1) {
        tournament(tempPlayers);
    } else {
        console.log(tempPlayers[0].number)
        console.log(tempPlayers[0].opponents.join(' '))
    }
}

function fight(p1, p2) {
    if (p1.sign === p2.sign) {
        return p1.number < p2.number ? p1 : p2;
    }
    if (p1.sign === 'C' && ['P', 'L'].includes(p2.sign)) {
        return p1;
    } else if (p1.sign === 'P' && ['R', 'S'].includes(p2.sign)) {
        return p1;
    } else if (p1.sign === 'R' && ['L', 'C'].includes(p2.sign)) {
        return p1;
    } else if (p1.sign === 'L' && ['P', 'S'].includes(p2.sign)) {
        return p1;
    } else if (p1.sign === 'S' && ['R', 'C'].includes(p2.sign)) {
        return p1;
    }
    return p2;
}