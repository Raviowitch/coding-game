const score = +readline();

for (let i = 0; i <= score / 5; i++) {
    for (let j = 0; j <= i; j++) {
        for (let k = 0; k <= score / 3; k++) {
            if ((i * 5 + j * 2 + k * 3) === score) {
                console.log(`${i} ${j} ${k}`);
            }
        }
    }
}