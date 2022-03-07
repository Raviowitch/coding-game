gameLoop(+readline());

function gameLoop(N) {
    var number = 0;
    var listOfSubString = new Map();
    for (let i = 0; i < N; i++) {
        const telephone = readline();
        for (k = 1; k <= telephone.length; k++) {
            var sub = telephone.substring(0, k);
            if (!listOfSubString.has(sub)) {
                var s = sub.substring(0, sub.length);
                if (!listOfSubString.has(s)) {
                    number++;
                    listOfSubString.set(sub, sub);
                } else {
                    break;
                }
            }
        }
    }
    console.log(number);
}