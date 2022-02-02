// game loop
while (true) {
    var higherMountain = -1;
    var higherMountainIndex = -1;
    for (let i = 0; i < 8; i++) {
        const mountainH = parseInt(readline());
        console.error(mountainH)
        if (mountainH >= higherMountain) {
            higherMountain = mountainH;
            higherMountainIndex = i;
        }
    }
    console.log(higherMountainIndex); // The index of the mountain to fire on.
}
