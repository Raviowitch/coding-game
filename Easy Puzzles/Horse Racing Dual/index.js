const N = parseInt(readline());
var horses = [];
for (let i = 0; i < N; i++) {
    const pi = parseInt(readline());
    horses.push(pi);
}
horses.sort((a,b)=>{return a-b});
var minGap = 10000001; // More than max horse power
var previous = horses[0];
for (let i = 1; i < horses.length; i ++) {
    minGap = Math.min(minGap, horses[i]-previous);
    previous = horses[i];
}

console.log(minGap);
