// https://www.codingame.com/training/medium/vote-counting

gameLoop();

function getVoters(numberOfVoters) {
    var voters = new Map();
    for (let i = 0; i < numberOfVoters; i++) {
        var inputs = readline().split(' ');
        voters.set(inputs[0], +inputs[1])
    }
    return voters;
}
function gameLoop() {
    const N = +readline();
    const M = +readline();
    var voters = getVoters(N);
    var votesYes = 0;
    var votesNo = 0;

    var votersOccurences = new Map();
    var votes = [];
    for (let i = 0; i < M; i++) {
        var inputs = readline().split(' ');
        const voterName = inputs[0];
        const voteValue = inputs[1];
        votes.push([voterName, voteValue])
        votersOccurences.set(voterName, votersOccurences.has(voterName) ? votersOccurences.get(voterName) + 1 : 1)
    }

    for (let i = 0; i < M; i++) {
        const voterName = votes[i][0];
        const voteValue = votes[i][1];
        if (voters.has(voterName) && votersOccurences.get(voterName) <= voters.get(voterName)) {
            if (voteValue === 'Yes') {
                votesYes++;
            } else if (voteValue === 'No') {
                votesNo++;
            }
        }
    }
    console.log(`${votesYes} ${votesNo}`);
}
