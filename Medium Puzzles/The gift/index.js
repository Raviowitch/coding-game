// https://www.codingame.com/training/medium/the-gift/solution

gameLoop();

function gameLoop() {
    const N = +readline();
    var C = +readline();
    var total = 0;
    var budgets = [...Array(N)].map(_=> {
        const B = +readline();
        total += B
        return B
    });

    if (total < C) {
        console.log("IMPOSSIBLE");
    } else {
        var num = budgets.length;
        budgets.sort((a, b) => { return a - b });
        budgets.forEach(b => {
            var moy = Math.floor(C / num--);
            if (b > moy) {
                b = moy;
            } 
            C -= b;
            console.log(b);
        })
    }
}
