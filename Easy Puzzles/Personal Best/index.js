// https://www.codingame.com/training/easy/personal-best

gameLoop()

function gameLoop() {
    const gymnasts = readline().split(',').map(val => { return { name: val, bars: -Infinity, beam: -Infinity, floor: -Infinity } });
    const categories = readline().split(',');
    const N = parseInt(readline());
    for (let i = 0; i < N; i++) {
        const row = readline().split(',');
        var gymnast = gymnasts.find(g => g.name === row[0]);
        if (gymnast) {
            gymnast.bars = Math.max(gymnast.bars, +row[1]);
            gymnast.beam = Math.max(gymnast.beam, +row[2]);
            gymnast.floor = Math.max(gymnast.floor, +row[3]);
        }
    }
    displayResult(gymnasts, categories);
}

function displayResult(gymnasts, categories) {
    gymnasts.forEach(g => {
        var result = [];
        if (categories.includes('bars')) {
            result.push(g.bars);
        }
        if (categories.includes('beam')) {
            result.push(g.beam);
        }
        if (categories.includes('floor')) {
            result.push(g.floor);
        }
        console.log(result.join(','))
    })
}