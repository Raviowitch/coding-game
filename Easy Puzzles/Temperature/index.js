const n = parseInt(readline()); // the number of temperatures to analyse
var inputs = readline().split(' ');

if (n === 0) {
    console.log(n);
}else {
    var closestTempFromZero = 5527;
    for (let i = 0; i < n; i++) {
        const t = parseInt(inputs[i]); // a temperature expressed as an integer ranging from -273 to 5526
        if (Math.abs(t) < Math.abs(closestTempFromZero) || (Math.abs(t) === Math.abs(closestTempFromZero) && closestTempFromZero < t)) {
            closestTempFromZero = t
        } 
    }
    console.log(closestTempFromZero);
}
