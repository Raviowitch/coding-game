// https://www.codingame.com/training/hard/google-interview---the-two-egg-problem

const N = +readline();
var x = 1;
while(x*(x+1)/2 < N) { x++ }
console.log(x)