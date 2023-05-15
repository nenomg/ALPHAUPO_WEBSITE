/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function negativeRotateArray(arr) {
    var res = arr.slice();
    var tam = arr.length;

    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            res[i][tam - 1 - j] = arr[tam - 1 - i][j] * (-1);
        }
    }
    return res;
}



var wp = [
    [0., 0., 0., 0., 0., 0., 0., 0.],
    [5., 5., 5., 5., 5., 5., 5., 5.],
    [1., 1., 2., 3., 3., 2., 1., 1.],
    [0.5, 0.5, 1., 2.5, 2.5, 1., 0.5, 0.5],
    [0., 0., 0., 2., 2., 0., 0., 0.],
    [0.5, -0.5, -1., 0., 0., -1., -0.5, 0.5],
    [0.5, 1., 1., -2., -2., 1., 1., 0.5],
    [0., 0., 0., 0., 0., 0., 0., 0.]
];



var bp = this.negativeRotateArray(wp);

var wn = [
    [-5., -4., -3., -3., -3., -3., -4., -5.],
    [-4., -2., 0., 0., 0., 0., -2., -4.],
    [-3., 0., 1., 1.5, 1.5, 1., 0., -3.],
    [-3., 0.5, 1.5, 2., 2., 1.5, 0.5, -3.],
    [-3., 0., 1.5, 2., 2., 1.5, 0., -3.],
    [-3., 0.5, 1., 1.5, 1.5, 1., 0.5, -3.],
    [-4., -2., 0., 0.5, 0.5, 0., -2., -4.],
    [-5., -4., -3., -3., -3., -3., -4., -5.]
];

var bn = this.negativeRotateArray(wn);

var wb = [
    [-2., -1., -1., -1., -1., -1., -1., -2.],
    [-1., 0., 0., 0., 0., 0., 0., -1.],
    [-1., 0., 0.5, 1., 1., 0.5, 0., -1.],
    [-1., 0.5, 0.5, 1., 1., 0.5, 0.5, -1.],
    [-1., 0., 1., 1., 1., 1., 0., -1.],
    [-1., 1., 1., 1., 1., 1., 1., -1.],
    [-1., 0.5, 0., 0., 0., 0., 0.5, -1.],
    [-2., -1., -1., -1., -1., -1., -1., -2.]
];

var bb = this.negativeRotateArray(wb);

var wr = [
    [0., 0., 0., 0., 0., 0., 0., 0.],
    [0.5, 1., 1., 1., 1., 1., 1., 0.5],
    [-1., 0., 0.5, 1., 1., 0.5, 0., -0.5],
    [-1., 0.5, 0.5, 1., 1., 0.5, 0.5, -0.5],
    [-1., 0., 1., 1., 1., 1., 0., -0.5],
    [-1., 1., 1., 1., 1., 1., 1., -0.5],
    [-1., 0.5, 0., 0., 0., 0., 0.5, -0.5],
    [0., 0., 0., 0.5, 0.5, 0., 0., 0.]
];

var br = this.negativeRotateArray(wr);

var wq = [
    [-2, -1, -1, -0.5, -0.5, -1, -1, -2],
    [-1, 0., 0., 0., 0., 0., 0., -1],
    [-1, 0., 0.5, 0.5, 0.5, 0.5, 0., -1],
    [-0.5, 0., 0.5, 0.5, 0.5, 0.5, 0., -0.5],
    [0, 0., 0.5, 0.5, 0.5, 0.5, 0., -0.5],
    [-1, 0.5, 0.5, 0.5, 0.5, 0.5, 0., -1],
    [-1, 0., 0.5, 0., 0., 0., 0., -1],
    [-2, -1, -1, -0.5, -0.5, -1, -1, -2]
];

var bq = this.negativeRotateArray(wq);


var wk = [
    [-3, -4, -4, -5, -5, -4, -4, -3],
    [-3, -4, -4, -5, -5, -4, -4, -3],
    [-3, -4, -4, -5, -5, -4, -4, -3],
    [-3, -4, -4, -5, -5, -4, -4, -3],
    [-2, -3, -3, -4, -4, -3, -3, -2],
    [-1., -2, -2, -2, -2, -2, -2, -1],
    [2, 2, 0., 0., 0., 0., 2, 2],
    [2, 3, 1, 0, 0, 1, 3, 2]
];

var bk = negativeRotateArray(wk);








function minimax(board, depth) {
    if (depth === 0 || board.is_checkmate() || board.is_stalemate()) {
        return [this.fitness(board), null];
    } else {
        var toMove = board.toMove;
        var moves = board.getLegalMoves(board.toMove);

        //Maximizamos las blancas
        if (toMove === 0) {
            var bestScore = -9999999999;
            var bestMove = false;

            for (var i = 0; i < moves.length; i++) {
                board.makeMove(moves[i]);
                var res = minimax(board, depth - 1);
                board.revertLastMove(false);

                if (res[0] > bestScore) {
                    bestScore = res[0];
                    bestMove = moves[i];
                }else if(res[0] == bestScore){
                    if(Math.random()>0.5){
                        bestScore = res[0];
                        bestMove = moves[i];
                    }
                }
            }
            return [bestScore, bestMove];
        } else {
            var bestScore = 9999999999;
            var bestMove = false;

            for (var i = 0; i < moves.length; i++) {
                board.makeMove(moves[i]);
                var res = minimax(board, depth - 1);
                board.revertLastMove(false);

                if (res[0] < bestScore) {
                    bestScore = res[0];
                    bestMove = moves[i];
                }else if(res[0] == bestScore){
                    if(Math.random()>0.5){
                        bestScore = res[0];
                        bestMove = moves[i];
                    }
                }
            }
            return [bestScore, bestMove];
        }

    }

}




function minimaxAlphaBetaPruning(board, depth, alpha, beta) {
    if (depth === 0 || board.is_checkmate() || board.is_stalemate()) {
        return [this.fitness(board), null];
    } else {
        var toMove = board.toMove;
        var moves = board.getLegalMoves(board.toMove);

        //Maximizamos las blancas
        if (toMove === 0) {
            var bestMove = false;
            var bestVal = -99999999;

            for (var i = 0; i < moves.length; i++) {
                board.makeMove(moves[i]);
                var res = minimaxAlphaBetaPruning(board, depth - 1, alpha, beta);
                board.revertLastMove(false);

                if (bestVal < res[0]) {
                    bestMove = moves[i];
                    bestVal = res[0];
                }

                alpha = Math.max(alpha, bestVal);

                if (alpha >= beta) {
                    return [bestVal, bestMove];
                }

            }
            return [bestVal, bestMove];
        } else {
            var bestMove = false;
            var bestVal = 99999999;

            for (var i = 0; i < moves.length; i++) {
                board.makeMove(moves[i]);
                var res = minimaxAlphaBetaPruning(board, depth - 1, alpha, beta);
                board.revertLastMove(false);

                if (bestVal > res[0]) {
                    bestMove = moves[i];
                    bestVal = res[0];
                }

                beta = Math.min(beta, bestVal);

                if (beta<=alpha) {
                    return [bestVal, bestMove];
                }

            }
            return [bestVal, bestMove];
        }

    }

}












function minimaxAlphaBetaPruning2(board, depth, alpha, beta) {
    if (depth === 0 || board.is_checkmate() || board.is_stalemate()) {
        return [this.fitness2(board), null];
    } else {
        var toMove = board.toMove;
        var moves = board.getLegalMoves(board.toMove);

        //Maximizamos las blancas
        if (toMove === 0) {
            var bestMove = false;
            var bestVal = -99999999;

            for (var i = 0; i < moves.length; i++) {
                board.makeMove(moves[i]);
                var res = minimaxAlphaBetaPruning2(board, depth - 1, alpha, beta);
                board.revertLastMove(false);

                if (bestVal < res[0]) {
                    bestMove = moves[i];
                    bestVal = res[0];
                }

                alpha = Math.max(alpha, bestVal);

                if (alpha >= beta) {
                    return [bestVal, bestMove];
                }

            }
            return [bestVal, bestMove];
        } else {
            var bestMove = false;
            var bestVal = 99999999;

            for (var i = 0; i < moves.length; i++) {
                board.makeMove(moves[i]);
                var res = minimaxAlphaBetaPruning2(board, depth - 1, alpha, beta);
                board.revertLastMove(false);

                if (bestVal > res[0]) {
                    bestMove = moves[i];
                    bestVal = res[0];
                }

                beta = Math.min(beta, bestVal);

                if (beta<=alpha) {
                    return [bestVal, bestMove];
                }

            }
            return [bestVal, bestMove];
        }

    }

}



function filterChecksCaptures(moves, board){
    var cont = 0;
    var newmoves = [];
    for(var i = 0; i < moves.length; i++){
        if(board.isKingInCheckAfterMove(moves[i])){
            newmoves.push(moves[i]);
            moves.pop(i);
        }
        if(board.isCaptureAfterMove(moves[i])){
            newmoves.push(moves[i]);
            moves.pop(i);
        }
    }

    var moves_val = [];
    for(var i = 0; i < moves.length; i++){
        board.makeMove(moves[i]);
        moves_val.push([this.fitness(board), i]);
        board.revertLastMove(false);
    }

    if(board.toMove == 1){
        moves_val.sort(function(a, b) {
            return a[0] - b[0];
        });
    }else{
        moves_val.sort(function(a, b) {
            return b[0] - a[0];
        });
    }
    
    for(var i = 0; i<moves_val.length; i++){
        if(i >= 4){
            break;
        }
        newmoves.push(moves[moves_val[i][1]]);
    }

    return newmoves;

}



function fitness(board) {
    var res = board.material_value();

    if (board.is_checkmate()) {
        if (board.toMove === 1) {
            return 999999;
        } else {
            return -999999;
        }
    }

    return res;

}





function fitness2(board) {
    var res = board.material_value();

    if (board.is_checkmate()) {
        if (board.toMove === 1) {
            return 999999;
        } else {
            return -999999;
        }
    }

    /*
    var w_c = board.getLegalMoves(0).length;
    var b_c = (-1) * board.getLegalMoves(1).length;

    res = res + w_c + b_c;
    */
    
    for (var i = 0; i < board.pieces.length; i++) {
        var pc = board.pieces[i];
        if (pc.name === "wp") {
            res += wp[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "bp") {
            res += bp[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "wn") {
            res += wn[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "bn") {
            res += bn[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "wb") {
            res += wb[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "bb") {
            res += bb[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "wr") {
            res += wr[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "br") {
            res += br[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "wq") {
            res += wq[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "bq") {
            res += bq[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "wk") {
            res += wk[pc.pos[0]][pc.pos[1]];
        } else if (pc.name === "bk") {
            res += bk[pc.pos[0]][pc.pos[1]];
        }
    }
    
    return res;

}