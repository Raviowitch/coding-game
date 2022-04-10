// https://www.codingame.com/training/easy/the-dart-101

const N = parseInt(readline());
var players = [...Array(N)].map(_ => {
    return { name: readline(), shoots: [], rounds: [], result: 0 }
});
players.forEach(player => {
    player.shoots = readline().split(' ');
});

gameLoop(players);

function gameLoop(players) {
    players.forEach(player => {
        var scoreAtBeginingOfRound = 0;
        var shootsInRound = [];
        player.shoots.forEach(shoot => {
            var value = getScoreFromShoot(shoot);
            shootsInRound.push(value);
            if (player.result + value <= 101) {
                if (hasThreeMissInARound(value, shootsInRound)) {
                    value = -player.result;
                } else if (hasTwoMissSuccessiveInARound(value, shootsInRound)) {
                    value = -30;
                }
                player.result += value;
                player.result = Math.max(0, player.result);
                if (shootsInRound.length === 3) {
                    scoreAtBeginingOfRound = player.result;
                    player.rounds.push(shootsInRound);
                    shootsInRound = [];
                }
            } else {
                player.result = scoreAtBeginingOfRound;
                player.rounds.push(shootsInRound);
                shootsInRound = [];
            }
        })
    })
    console.log(findBestPlayer(players))
}

function hasThreeMissInARound(value, shootsInRound) {
    if (shootsInRound.length !== 3) return false; 
    return value < 0 && shootsInRound[shootsInRound.length - 2] === -20 && shootsInRound[shootsInRound.length - 3] === -20
}

function hasTwoMissSuccessiveInARound(value, shootsInRound) {
    if (shootsInRound.length !== 2) return false; 
    return value < 0 && shootsInRound[shootsInRound.length - 2] === -20
}

function getScoreFromShoot(shoot) {
    if (shoot === 'X') {
        return -20;
    } else if (shoot.includes('*')) {
        var temp = shoot.split('*');
        var score = +temp[0] * +temp[1];
        return score;
    } else {
        return +shoot;
    }
}

function findBestPlayer(players) {
    var bestPlayer = players[0];
    for (let i = 1; i < N; i++) {
        if (players[i].result > bestPlayer.result || (players[i].result === bestPlayer.result && players[i].rounds.length < bestPlayer.rounds.length)) {
            bestPlayer = players[i];
        }
    }
    return bestPlayer.name
}

