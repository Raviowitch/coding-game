// https://www.codingame.com/training/hard/the-greatest-number

const insertAt = (str, sub, pos) => { return `${str.slice(0, pos)}${sub}${str.slice(pos)}` };

const N = +readline();
const input = readline();

var isNegativeNumber = input.includes('-');
var isFloatingNumber = input.includes('.');
var numbers = input.split(' ').filter(val => val !== '-' && val !== '.').map(Number).sort((a, b) => { return isNegativeNumber ? a - b : b - a });

var result = `${isNegativeNumber ? '-' : ''}` + numbers.join('');

if (isFloatingNumber) {
    result = insertAt(result, '.', isNegativeNumber ? 2 : result.length - 1)
}
result = +result.toString();
console.log(result === -0 ? '0' : result);