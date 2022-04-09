const N = +readline();
var horses = [...Array(N)].map(_ => readline()).sort((a, b) => a - b);
var minGap = Infinity;
horses.forEach((horse, index) => {
    if (index !== 0) {
        minGap = Math.min(minGap, horse - previous);
    }
    previous = horse;
})
console.log(minGap);
