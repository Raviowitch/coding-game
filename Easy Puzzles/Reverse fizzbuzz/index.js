// https://www.codingame.com/training/easy/reverse-fizzbuzz

gameLoop();

function gameLoop() {
    const n = +readline();
    var fizz = [];
    var buzz = [];
    var firstValueNumber;
    for (let i = 0; i < n; i++) {
        const line = readline();
        if (!firstValueNumber && !line.includes('Buzz') && !line.includes('Fizz')) {
            firstValueNumber = +line - i;
        }
        if (line.includes('Fizz')) {
            fizz.push(i);
        }
        if (line.includes('Buzz')) {
            buzz.push(i);
        }
    }
    firstValueNumber = firstValueNumber ?? 1;
    fizz = fizz.map(val => val + firstValueNumber);
    buzz = buzz.map(val => val + firstValueNumber);
    console.log(`${findGCD(fizz, fizz.length)} ${findGCD(buzz, buzz.length)}`);
}


function findGCD(arr, n) {
    let result = arr[0];
    for (let i = 1; i < n; i++) {
        result = gcd(arr[i], result);
        if (result == 1) {
            return 1;
        }
    }
    return result;
}

function gcd(a, b) {
    if (a == 0)
        return b;
    return gcd(b % a, a);
}