// Get all cards from the input and then sort then to get the lowest in first, etc
const cards = getAllCards(readline(), readline().split(' ')).sort((a, b) => { return a - b });

displayResult(gameLoop(cards));

function getAllCards(numberOfCards, cardsValue) {
    var result = [];
    for (let i = 0; i < numberOfCards; i++) {
        result.push(+cardsValue[i]);
    }
    return result;
}
function gameLoop(cards) {
    var sum = 0;
    while (cards.length > 1) {
        const newCard = cards[0] + cards[1];
        sum += newCard;
        cards.shift();
        cards.shift();
        cards.push(newCard);
        // We always want to sum the two cards with lower cost
        cards.sort((a, b) => { return a - b })
    }
    return sum;
}

function displayResult(cost) {
    console.log(cost);
}