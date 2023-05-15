self.importScripts("../engine/Alphaupo.js")
self.importScripts("../engine/minimax.js")


var alg = -1;
var depth = -1;
var res = false;
var board_w = false;

addEventListener('message', function(event) {
    res = event.data;
    alg = res[1];
    depth = res[2];
    moves = res[0];


    var tablero = new Board();

    for (var i = 0; i < moves.length; i++) {
        tablero.makeMove(moves[i]);
    }

    if (alg === 0) {
        var move = minimax(tablero, depth);
    } else if (alg === 1) {
        var move = minimaxAlphaBetaPruning(tablero, depth, -99999999, 99999999);
    }
    else if (alg === 3) {
        var move = minimaxAlphaBetaPruning2(tablero, depth, -99999999, 99999999);
    }

    postMessage(move);
});