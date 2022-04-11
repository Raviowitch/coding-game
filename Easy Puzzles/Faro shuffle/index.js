// https://www.codingame.com/training/easy/faro-shuffle

gameLoop();

function gameLoop() {
    const n = parseInt(readline());
    let deck = readline().split(' ');
    for (let i = 0; i < n; i++) {
        deck = faroShuffle(deck);
    }
    console.log(deck.join(' '));
}

function faroShuffle(deck) {
    let deckShuffle = [];
    let part1 = deck.slice(0, Math.ceil(deck.length / 2));
    let part2 = deck.slice(Math.ceil(deck.length / 2));
    while (part1.length > 0 || part2.length > 0) {
        deckShuffle.push(part1.shift());
        if (part2.length > 0) {
            deckShuffle.push(part2.shift());
        }
    }
    return deckShuffle;
}