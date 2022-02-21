// https://www.codingame.com/training/hard/alternative-vote

gameLoop();

function getCandidates() {
    return [...Array(+readline())].map((_, i) => { return { id: (i + 1).toString(), name: readline(), eliminated: false } });
}

function getVoters(numberOfVoters) {
    var voters = new Map();
    for (let i = 0; i < numberOfVoters; i++) {
        voters.set(i, readline().split(' '));
    }
    return voters;
}

function gameLoop(candidates, voters) {
    var candidates = getCandidates();
    var voters = getVoters(+readline());

    while (candidates.filter(candidat => !candidat.eliminated).length > 1) {
        var candidateToEliminate = findCandidatsWithLessVotes(voters, candidates.filter(candidat => !candidat.eliminated));
        removeVotesForEliminateCandidate(voters, candidateToEliminate);
        eliminateCandidateAndDisplayResult(candidates, candidateToEliminate);
    }
    console.log(`winner:${candidates.find(c => c.eliminated === false).name}`);
}

function eliminateCandidateAndDisplayResult(candidates, candidateToEliminate) {
    candidates[+candidateToEliminate - 1].eliminated = true;
    console.log(candidates[+candidateToEliminate - 1].name);
}

function findCandidatsWithLessVotes(voters, candidatesStillInCourse) {
    var candidats = new Map();
    candidatesStillInCourse.forEach(c => {
        candidats.set(c.id, 0)
    })
    voters.forEach(voters => {
        candidats.set(voters[0], candidats.get(voters[0]) + 1)
    });
    var looser = Infinity;
    var looserId = null;
    candidats.forEach((votes, key) => {
        if (votes < looser) {
            looser = votes;
            looserId = key;
        }
    })
    return looserId;
}

function removeVotesForEliminateCandidate(voters, idCandidate) {
    voters.forEach(votes => {
        if (votes.indexOf(idCandidate) !== -1) {
            votes.splice(votes.indexOf(idCandidate), 1);
        }
    })
}