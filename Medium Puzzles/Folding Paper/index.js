// https://www.codingame.com/training/medium/folding-paper

const orders = readline().split('');
const side = readline();

gameLoop(orders, side);

function gameLoop(orders) {
    const views = createViews();
    for (let i = 0; i < orders.length; i++) {
        var actual = views.find(view => view.direction === orders[i]);
        views.find(view => view.isDownOrUp === actual.isDownOrUp && view.direction !== actual.direction).layers += actual.layers;
        views.filter(view => view.isDownOrUp !== actual.isDownOrUp).forEach(v => v.layers *= 2);
        actual.layers = 1;
    }
    console.log(views.find(view => view.direction === side).layers);
}

function createViews() {
    return [
        {
            direction: 'D',
            layers: 1,
            isDownOrUp: true
        },
        {
            direction: 'U',
            layers: 1,
            isDownOrUp: true
        },
        {
            direction: 'L',
            layers: 1,
            isDownOrUp: false
        },
        {
            direction: 'R',
            layers: 1,
            isDownOrUp: false
        },
    ];
    
}