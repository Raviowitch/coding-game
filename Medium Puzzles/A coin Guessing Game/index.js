// https://www.codingame.com/training/medium/a-coin-guessing-game

[N, T] = readline().split(' ').map(Number);
var coins = createCoins(N * 2, getAllEvenNumbers(N * 2));

gameLoop(coins, T);

function gameLoop(coins, T) {
    for (let i = 0; i < T; i++) {
        var inputs = readline().split(' ').map(Number);
        deleteAllEvenNumbersNotPossible(coins, inputs);
    }
    deleteAllEvenNumbersNotPossibleBecauseOnlyOneLeft(coins);
    checkIfAEvenNumberIsPresentOnlyOnce(coins);
    console.log(coins.map(coin => coin.evenNumbers[0]).join(' '));
}

function createCoins(N, evenNumbers) {
    var coins = [];
    for (let i = 1; i < N; i += 2) {
        coins.push({ id: i, evenNumbers: [...evenNumbers] });
    }
    return coins;
}

function getAllEvenNumbers(limit) {
    var evenNumbers = [];
    for (let i = 2; i <= limit; i += 2) {
        evenNumbers.push(i);
    }
    return evenNumbers;
}

// Exemple: 3 1 6 => remove 6 for coins 3 & 1
function deleteAllEvenNumbersNotPossible(coins, values) {
    values.forEach(value => {
        if (value % 2 !== 0) {
            var c = coins.find(coin => coin.id === value);
            values.filter(v => v % 2 === 0).forEach(v => {
                if (c.evenNumbers.indexOf(v) !== -1) {
                    c.evenNumbers.splice(c.evenNumbers.indexOf(v), 1);
                }
            })
        }
    })
}

// Exemple with 3 coins: Coin 1 => [6], Coin 2 => [2,4,6], Coin 3 => [2,4,6]. Remove [6] from Coin 2 & 3
function deleteAllEvenNumbersNotPossibleBecauseOnlyOneLeft(coins) {
    coins.forEach((coin, index) => {
        if (coin.evenNumbers.length === 1) {
            var val = coin.evenNumbers[0];
            coins.forEach((c, i) => {
                if (c.evenNumbers.indexOf(val) !== -1 && index !== i) {
                    c.evenNumbers.splice(c.evenNumbers.indexOf(val), 1);
                }
            })
        }
    })
}

// Exemple with 3 coins: Coin 1 => [2,4,6], Coin 2 => [2,4], Coin 3 => [2,4]. Remove [2,4] from Coin 1 because 6 can only fit here
function checkIfAEvenNumberIsPresentOnlyOnce(coins) {
    var atLeastOneChange = false;
    var evenNumbersOccurences = new Map();
    coins.forEach(coin => {
        coin.evenNumbers.forEach(n => {
            if (evenNumbersOccurences.has(n)) {
                evenNumbersOccurences.set(n, evenNumbersOccurences.get(n) + 1)
            } else {
                evenNumbersOccurences.set(n, 1)
            }
        })
    });
    evenNumbersOccurences.forEach((value, key) => {
        if (value === 1) {
            coins.forEach(coin => {
                if (coin.evenNumbers.indexOf(key) !== -1 && coin.evenNumbers.length > 1) {
                    coin.evenNumbers = [key];
                    atLeastOneChange = true;
                }
            })
        }
    })
    if (atLeastOneChange) {
        checkIfAEvenNumberIsPresentOnlyOnce(coins);
    }
}
