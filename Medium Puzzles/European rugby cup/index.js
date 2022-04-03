// https://www.codingame.com/training/medium/european-rugby-champions-cup-ranking

class Pool {
    games = [];
    teams = [];
    constructor(teams) {
        teams.forEach(team => {
            this.teams.push(new Team(team));
        })
    }

    addGame(match) {
        this.games.push(match);
        const team1 = this.teams.find(team => team.name === match.team_1);
        const team2 = this.teams.find(team => team.name === match.team_2);
        team1.points += match.getTeam1Point();
        team2.points += match.getTeam2Point();
        team1.goalAverage += match.score_team_1 - match.score_team_2;
        team2.goalAverage += match.score_team_2 - match.score_team_1;
    }

    updateRanking() {
        this.teams.sort((a, b) => {
            if (b.points !== a.points) {
                return b.points > a.points ? 1 : -1;
            } else {
                return this.winnerBetween2teams(a, b) === 'TEAM_2' ? 1 : -1;
            }
        });
        this.teams.forEach((team, index) => {
            team.rank = index;
        })
    }

    winnerBetween2teams(team1, team2) {
        const gamesBetweenTwoTeams = this.games.filter(game => {
            return [team1.name, team2.name].includes(game.team_1) && [team1.name, team2.name].includes(game.team_2)
        });
        var ptT1 = 0, ptT2 = 0, scoreT1 = 0, scoreT2 = 0;
        if (gamesBetweenTwoTeams.length > 0) {
            gamesBetweenTwoTeams.forEach(g => {
                if (g.team_1 === team1.name) {
                    ptT1 += g.getTeam1Point();
                    ptT2 += g.getTeam2Point();
                    scoreT1 += g.score_team_1;
                    scoreT2 += g.score_team_2;
                } else {
                    ptT1 += g.getTeam2Point();
                    ptT2 += g.getTeam1Point();
                    scoreT1 += g.score_team_2;
                    scoreT2 += g.score_team_1;
                }
            })
        }
        if (ptT1 === ptT2) {
            return scoreT1 > scoreT2 ? 'TEAM_1' : 'TEAM_2';
        } else {
            return ptT1 > ptT2 ? 'TEAM_1' : 'TEAM_2';
        }
    }
}

class Team {
    points = 0;
    rank = 0;
    goalAverage = 0;
    constructor(name) {
        this.name = name;
    }
}

class Match {
    constructor(team_1, score_team_1, tries_team_1, team_2, score_team_2, tries_team_2) {
        this.team_1 = team_1;
        this.score_team_1 = +score_team_1;
        this.tries_team_1 = +tries_team_1;
        this.team_2 = team_2;
        this.score_team_2 = +score_team_2;
        this.tries_team_2 = +tries_team_2;
    }

    getWinner() {
        if (this.score_team_1 > this.score_team_2) {
            return 'TEAM_1';
        } else if (this.score_team_2 > this.score_team_1) {
            return 'TEAM_2';
        } else {
            return 'DRAW';
        }
    }

    getTeam1Point() {
        var result = 0;
        if (this.getWinner() === 'TEAM_1') {
            result += 4;
        } else if (this.getWinner() === 'DRAW') {
            result += 2;
        } else if (this.score_team_2 - this.score_team_1 <= 7) {
            result += 1;
        }
        if (this.tries_team_1 >= 4) {
            result += 1;
        }
        return result;
    }

    getTeam2Point() {
        var result = 0;
        if (this.getWinner() === 'TEAM_2') {
            result += 4;
        } else if (this.getWinner() === 'DRAW') {
            result += 2;
        } else if (this.score_team_1 - this.score_team_2 <= 7) {
            result += 1;
        }
        if (this.tries_team_2 >= 4) {
            result += 1;
        }
        return result;
    }
}

class Tournament {
    pools = []
    constructor() {
    }

    getPoolForAMatch(t1) {
        return this.pools.find(pool => pool.teams.find(team => team.name === t1))
    }

    getLeaders() {
        var leaders = [];
        this.pools.forEach(pool => {
            leaders.push(pool.teams.find(team => team.rank === 0));
        })
        leaders.sort((a, b) => {
            if (b.points !== a.points) {
                return b.points > a.points ? 1 : -1;
            } else {
                return b.goalAverage > a.goalAverage ? 1 : -1;
            }
        })
        return leaders;
    }

    getRunnersUp(pools) {
        var runnersUp = [];
        pools.forEach((pool, index) => {
            pool.teams.filter((t, i) => i > 0).forEach((team) => {
                runnersUp.push({ pool: index, team })
            })
        })
        runnersUp.sort((a, b) => {
            if (b.pool !== a.pool) {
                if (b.team.rank !== a.team.rank) {
                    return b.team.rank > a.team.rank ? -1 : 1;
                } else if (b.team.points !== a.team.points) {
                    return b.team.points > a.team.points ? 1 : -1;
                } else {
                    return b.team.goalAverage > a.team.goalAverage ? 1 : -1;
                }
            } else {
                return b.team.rank > a.team.rank ? -1 : 1;
            }
        })
        return runnersUp.slice(0, 3);
    }

    getBestTeams() {
        let bestTeams = { leaders: [], runnersUp: [] };
        bestTeams.leaders.push(...this.getLeaders(this.pools));
        bestTeams.runnersUp.push(...this.getRunnersUp(this.pools))
        return bestTeams;
    }

    displayResult() {
        const bestTeams = this.getBestTeams();
        console.log(`${bestTeams.leaders[0].name} - ${bestTeams.runnersUp[2].team.name}`);
        console.log(`${bestTeams.leaders[1].name} - ${bestTeams.runnersUp[1].team.name}`);
        console.log(`${bestTeams.leaders[2].name} - ${bestTeams.runnersUp[0].team.name}`);
        console.log(`${bestTeams.leaders[3].name} - ${bestTeams.leaders[4].name}`);
    };

}

var tournament = new Tournament()
for (let i = 0; i < 5; i++) {
    [t1, t2, t3, t4] = readline().split(',');
    tournament.pools.push(new Pool([t1, t2, t3, t4]));
}

for (let i = 0; i < 60; i++) {
    [team_1, score_team_1, tries_team_1, team_2, score_team_2, tries_team_2] = readline().split(',');
    const match = new Match(team_1, score_team_1, tries_team_1, team_2, score_team_2, tries_team_2)
    const pool = tournament.getPoolForAMatch(match.team_1);
    pool.addGame(match)
}

tournament.pools.forEach(pool => {
    pool.updateRanking();
});

tournament.displayResult();