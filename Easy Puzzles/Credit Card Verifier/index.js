// https://www.codingame.com/training/easy/credit-card-verifier-luhns-algorithm

const n = +readline();
for (let j = 0; j < n; j++) {
    var card = normalizeAndReverseCard(readline());
    console.log(isValidCreditCardNumber(card) ? 'YES' : 'NO');
}

function normalizeAndReverseCard(card) {
    return card.split(' ').join('').split('').reverse().join('');
}

function isValidCreditCardNumber(card) {
    var sum = 0;
    for (let i = 0; i < card.length; i++) {
        if (i % 2 === 1) {
            sum += card[i] * 2;
            if (card[i] * 2 >= 10) {
                sum -= 9;
            }
        } else {
            sum += +card[i];
        }
    }
    return sum % 10 === 0;
}