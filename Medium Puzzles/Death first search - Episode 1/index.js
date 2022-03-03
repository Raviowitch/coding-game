// https://www.codingame.com/training/medium/death-first-search-episode-1

gameLoop();

function gameLoop() {
    [N, L, E] = readline().split(' ').map(Number);
    var nodes = getNodes(L, E);

    while (true) {
        const SI = +readline();
        var result = null;
        nodes.filter(n => n.isGateway === true).forEach(n => {
            if (n.links.includes(SI)) {
                result = `${SI} ${n.id}`;
            }
        })
        if (!result) {
            var firstGatewayWithLink = nodes.find(n => n.isGateway === true && n.links.length > 0);
            result = `${firstGatewayWithLink.id} ${firstGatewayWithLink.links[0]}`;
        }
        console.log(result);
    }

}

function getNodes(L, E) {
    var nodes = [];
    for (let i = 0; i < L; i++) {
        var inputs = readline().split(' ');
        const N1 = +inputs[0];
        const N2 = +inputs[1];
        if (!nodes.some(n => n.id === N1)) {
            nodes.push({ id: N1, links: [N2], isGateway: false });
        } else {
            nodes.find(n => n.id === N1).links.push(N2)
        }
        if (!nodes.some(n => n.id === N2)) {
            nodes.push({ id: N2, links: [N1], isGateway: false });
        } else {
            nodes.find(n => n.id === N2).links.push(N1)
        }
    }
    updateNodesWithGateways(nodes, E);
    return nodes;
}

function updateNodesWithGateways(nodes, E) {
    for (let i = 0; i < E; i++) {
        const EI = +readline();
        nodes.find(n => n.id === EI).isGateway = true
    }
}