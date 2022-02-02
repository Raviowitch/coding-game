var inputs = readline().split(' ');
var lightX = parseInt(inputs[0]); // the X position of the light of power
var lightY = parseInt(inputs[1]); // the Y position of the light of power
var thorX = parseInt(inputs[2]); // Thor's starting X position
var thorY = parseInt(inputs[3]); // Thor's starting Y position

// game loop
while (true) {
    const remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line. Not needed here

    var direction = ''

    // Check Y
    if(thorY < lightY) {
        direction += 'S';
        thorY++;
    }else if(thorY > lightY) {
        direction += 'N'
        thorY--;
    }

    // Check X
    if(thorX > lightX) {
        direction += 'W'
        thorX--;
    }else if(thorX < lightX) {
        direction += 'E'
        thorX++;
    } 
    console.log(direction)
}

