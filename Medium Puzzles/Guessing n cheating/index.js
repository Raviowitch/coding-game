gameLoop()

function gameLoop() {
    var numberOfRounds = +readline()
    var acceptedAnswers = [1, 100];
    var aliceCheatingIndex = -1;
    for (let i = 0; i < numberOfRounds && aliceCheatingIndex === -1; i++) {
        const line = readline().split(' ');
        const bob = +line[0];
        const alice = line[1] + ' ' + line[2];
        if (aliceIsCheating(bob, alice, acceptedAnswers)) {
            aliceCheatingIndex = i + 1;
        } else {
            if (alice === 'too high') {
                acceptedAnswers[1] = Math.min(acceptedAnswers[1], bob - 1);
            }
            else if (alice === 'too low') {
                acceptedAnswers[0] = Math.max(acceptedAnswers[0], bob + 1);
            }
        }
    }
    displayResult(aliceCheatingIndex);
}

function aliceIsCheating(bob, alice, acceptedAnswers) {
    if (alice === 'too high' && acceptedAnswers[0] >= bob) {
        return true;
    }
    if (alice === 'too low' && acceptedAnswers[1] <= bob) {
        return true;
    }
    if (alice === 'right on' && (bob < acceptedAnswers[0] || bob > acceptedAnswers[1])) {
        return true;
    }
    return false;
}

function displayResult(index) {
    if (index !== -1) {
        console.log(`Alice cheated in round ${index}`);
    } else {
        console.log(`No evidence of cheating`);
    }
}