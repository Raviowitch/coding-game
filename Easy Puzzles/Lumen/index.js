 const N = parseInt(readline());
 const L = parseInt(readline());
 
 const room = [];
 
 for (let i = 0; i < N; i++) {
     var inputs = readline().split(' ');
     displayLog(inputs, true);
     for (let j = 0; j < N; j++) {
         const cell = inputs[j];
         room.push({ x: i, y: j, power: isCandle(cell) ? L : 0 })
     }
 }
 
 room.filter(r=>r.power > 0).forEach(candle => {
     for (let i = 0; i < N; i++) {
         for (let j = 0; j < N; j++) {
             if (Math.abs(i - candle.x) < L && Math.abs(j - candle.y) < L) {
                 room.find(position => position.x === i && position.y === j).power = 1;
             }
         }
     }
 });
 
 // Display number of safe position
 displayLog(room.filter(position => position.power === 0).length, false);
 
 function isCandle(value) {
     return value === 'C' ? true : false;
 }

 function displayLog(message, isDebug) {
    if (isDebug) {
        console.error(message);
    } else {
        console.log(message);
    }
}
