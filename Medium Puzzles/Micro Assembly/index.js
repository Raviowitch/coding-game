// https://www.codingame.com/training/medium/micro-assembly

var inputs = readline().split(' ');
var values = new Map();
values.set('a', +inputs[0]);
values.set('b', +inputs[1]);
values.set('c', +inputs[2]);
values.set('d', +inputs[3]);

var instructions = [...Array(+readline())].map(_ => readline().split(' '));

for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    var val1 = +(!isNaN(instruction[2]) ? instruction[2]: values.get(instruction[2]));
    if (instruction[0] === 'MOV') {
        values.set(instruction[1], val1);
    } else {
        var val2 = +(!isNaN(instruction[3]) ? instruction[3]: values.get(instruction[3]));
        if (instruction[0] === 'ADD') {
            values.set(instruction[1], val1 + val2)
        } else if (instruction[0] === 'SUB') {
            values.set(instruction[1], val1 - val2)
        } else if (instruction[0] === 'JNE' && val1 !== val2) {
            i = +instruction[1] -1;
        }
    } 
}

console.log(Array.from(values.values()).join(' '));