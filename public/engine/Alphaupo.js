/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Board {
    constructor() {
        this.pieces = [];
        this.piecesStack = [];
        this.movesStack = [];
        this.revertMoveStack = [];
        this.board = this.setUpBoard();
        this.toMove = 0;
        this.castle = [true, true, true, true];
        this.gameState = true;
        this.revertStackFlag = false;
    }

    setUp(board) {
        this.pieces = board.pieces;
        this.piecesStack = board.piecesStack;
        this.movesStack = board.movesStack;
        this.revertMoveStack = board.revertMoveStack;
        this.board = board.board;
        this.toMove = board.toMove;
        this.castle = board.castle;
        this.gameState = board.gameState;
        this.revertStackFlag = board.revertStackFlag;
    }


    setUpBoard() {
        var cont = 0;
        var res = [];
        for (var i = 0; i < 8; i++) {
            var aux = [];
            for (var j = 0; j < 8; j++) {
                aux.push(false);
                cont++;
            }
            res.push(aux);
        }


        for (var j = 0; j < 8; j++) {
            var p = new Pawn(0, [6, j]);
            res[6][j] = p;
            this.pieces.push(p);
            var p = new Pawn(1, [1, j]);
            res[1][j] = p;
            this.pieces.push(p);
        }

        var k = new Knight(0, [7, 1]);
        res[7][1] = k;
        this.pieces.push(k);
        var k = new Knight(0, [7, 6]);
        res[7][6] = k;
        this.pieces.push(k);

        var k = new Knight(1, [0, 1]);
        res[0][1] = k;
        this.pieces.push(k);
        var k = new Knight(1, [0, 6]);
        res[0][6] = k;
        this.pieces.push(k);

        var b = new Bishop(0, [7, 2]);
        res[7][2] = b;
        this.pieces.push(b);
        var b = new Bishop(0, [7, 5]);
        res[7][5] = b;
        this.pieces.push(b);

        var b = new Bishop(1, [0, 2]);
        res[0][2] = b;
        this.pieces.push(b);
        var b = new Bishop(1, [0, 5]);
        res[0][5] = b;
        this.pieces.push(b);

        var r = new Rook(0, [7, 0]);
        res[7][0] = r;
        this.pieces.push(r);
        var r = new Rook(0, [7, 7]);
        res[7][7] = r;
        this.pieces.push(r);

        var r = new Rook(1, [0, 0]);
        res[0][0] = r;
        this.pieces.push(r);
        var r = new Rook(1, [0, 7]);
        res[0][7] = r;
        this.pieces.push(r);

        var q = new Queen(0, [7, 3]);
        res[7][3] = q;
        this.pieces.push(q);
        var q = new Queen(1, [0, 3]);
        res[0][3] = q;
        this.pieces.push(q);

        var k = new King(0, [7, 4]);
        res[7][4] = k;
        this.pieces.push(k);
        var k = new King(1, [0, 4]);
        res[0][4] = k;
        this.pieces.push(k);

        return res;
    }

    deletePieceFromPieces(piece) {
        var i = piece.pos[0];
        var j = piece.pos[1];

        for (var idx = 0; idx < this.pieces.length; idx++) {
            if (piece.name === this.pieces[idx].name && piece.pos[0] === this.pieces[idx].pos[0] && piece.pos[1] === this.pieces[idx].pos[1]) {
                this.pieces.splice(idx, 1);
                return true;
            }
        }

        return false;

    }


    getMovesByPos(i, j) {
        var pc = this.board[i][j];
        if (pc === false) {
            return -1;
        } else {
            var aux_moves = pc.getMoves(this);

            //ON PASSANT
            if (pc.name === "wp" || pc.name === "bp") {
                var passant = this.canPseudoOnPassant(pc);
                if (passant !== false) {
                    aux_moves.push(passant);
                }
            }
            //

            //PROMOTION
            var prom = this.checkPromotionMoves(aux_moves, pc.color, pc.name);
            if (prom.length > 0) {
                aux_moves = [];
                for (var n = 0; n < prom.length; n++) {
                    aux_moves.push(prom[n]);
                }

            }
            //


            //CASTLE

            if (pc.name === "wk" && !this.isKingInCheck()) {
                if (this.canCastleRightWhite()) {
                    aux_moves.push([7, 4, 7, 6, "CASTLE-RW"]);
                }
                if (this.canCastleLeftWhite()) {
                    aux_moves.push([7, 4, 7, 2, "CASTLE-LW"]);
                }
            }
            if (pc.name === "bk") {
                if (this.canCastleRightBlack()) {
                    aux_moves.push([0, 4, 0, 6, "CASTLE-RB"]);
                }
                if (this.canCastleLeftBlack()) {
                    aux_moves.push([0, 4, 0, 2, "CASTLE-LB"]);
                }
            }
            //

            for (var i = 0; i < aux_moves.length; i++) {
                if (this.isKingInCheckAfterMove(aux_moves[i])) {
                    aux_moves.splice(i, 1);
                    i--;
                }
            }
            return aux_moves;
        }
    }


    checkPromotionMoves(moves, color, name) {
        var res = [];

        if (name === "wp" || name === "bp") {

            for (var i = 0; i < moves.length; i++) {
                if (color === 0 && moves[i][0] === 1 && moves[i][2] === 0) {
                    var aux_move = moves[i].slice();
                    aux_move.push("PROMOTE");

                    var promB = aux_move.slice();
                    var promN = aux_move.slice();
                    var promQ = aux_move.slice();
                    var promR = aux_move.slice();

                    promB.push("B");
                    promN.push("N");
                    promQ.push("Q");
                    promR.push("R");

                    res.push(promB);
                    res.push(promN);
                    res.push(promQ);
                    res.push(promR);
                } else if (color === 1 && moves[i][0] === 6 && moves[i][2] === 7) {
                    var aux_move = moves[i].slice();
                    aux_move.push("PROMOTE");

                    var promB = aux_move.slice();
                    var promN = aux_move.slice();
                    var promQ = aux_move.slice();
                    var promR = aux_move.slice();

                    promB.push("B");
                    promN.push("N");
                    promQ.push("Q");
                    promR.push("R");

                    res.push(promB);
                    res.push(promN);
                    res.push(promQ);
                    res.push(promR);
                }
            }
            return res;
        }

        return res;
    }


    canCastleRightWhite() {
        var res = true;
        if (this.board[7][5] === false && this.board[7][6] === false && this.castle[0] === true) {
            var color = this.toMove;
            if (color === 0) {
                color = 1;
            } else {
                color = 0;
            }
            var pseudoMoves = this.getPseudoLegalMoves(color);
            for (var i = 0; i < pseudoMoves.length; i++) {
                if (pseudoMoves[i][2] === 7 && (pseudoMoves[i][3] === 5 || pseudoMoves[i][3] === 6)) {
                    res = false;
                    break;
                }
            }
        } else {
            res = false;
        }
        return res;
    }

    canCastleLeftWhite() {
        var res = true;
        if (this.board[7][3] === false && this.board[7][2] === false && this.board[7][1] === false && this.castle[1] === true) {
            var color = this.toMove;
            if (color === 0) {
                color = 1;
            } else {
                color = 0;
            }
            var pseudoMoves = this.getPseudoLegalMoves(color);
            for (var i = 0; i < pseudoMoves.length; i++) {
                if (pseudoMoves[i][2] === 7 && (pseudoMoves[i][3] === 3 || pseudoMoves[i][3] === 2 || pseudoMoves[i][3] === 1)) {
                    res = false;
                    break;
                }
            }
        } else {
            res = false;
        }
        return res;
    }


    canCastleRightBlack() {
        var res = true;
        if (this.board[0][5] === false && this.board[0][6] === false && this.castle[2] === true) {
            var color = this.toMove;
            if (color === 0) {
                color = 1;
            } else {
                color = 0;
            }
            var pseudoMoves = this.getPseudoLegalMoves(color);
            for (var i = 0; i < pseudoMoves.length; i++) {
                if (pseudoMoves[i][2] === 0 && (pseudoMoves[i][3] === 5 || pseudoMoves[i][3] === 6)) {
                    res = false;
                    break;
                }
            }
        } else {
            res = false;
        }
        return res;
    }

    canCastleLeftBlack() {
        var res = true;
        if (this.board[0][3] === false && this.board[0][2] === false && this.board[0][1] === false && this.castle[3] === true) {
            var color = this.toMove;
            if (color === 0) {
                color = 1;
            } else {
                color = 0;
            }
            var pseudoMoves = this.getPseudoLegalMoves(color);
            for (var i = 0; i < pseudoMoves.length; i++) {
                if (pseudoMoves[i][2] === 0 && (pseudoMoves[i][3] === 3 || pseudoMoves[i][3] === 2 || pseudoMoves[i][3] === 1)) {
                    res = false;
                    break;
                }
            }
        } else {
            res = false;
        }
        return res;
    }

    canPseudoOnPassant(pawn) {
        var i = pawn.pos[0];
        var j = pawn.pos[1];
        var color = pawn.color;

        if (this.movesStack.length <= 0) {
            return false;
        }

        var aux = this.movesStack[this.movesStack.length - 1];
        var lastPieceMoved = this.board[aux[2]][aux[3]];

        if (lastPieceMoved === false) {
            return false;
        }

        if (color === 0 && lastPieceMoved.name === "bp" && aux[0] === 1 && aux[2] === 3) {
            if (i === 3) {
                if ((j - 1) === aux[3]) {
                    return [i, j, (i - 1), (j - 1), lastPieceMoved, "PASSANT"];
                }
                if ((j + 1) === aux[3]) {
                    return [i, j, (i - 1), (j + 1), lastPieceMoved, "PASSANT"];
                }
            }
        } else if (lastPieceMoved.name === "wp" && aux[0] === 6 && aux[2] === 4) {
            if (i === 4) {
                if ((j - 1) === aux[3]) {
                    return [i, j, (i + 1), (j - 1), lastPieceMoved, "PASSANT"];
                }
                if ((j + 1) === aux[3]) {
                    return [i, j, (i + 1), (j + 1), lastPieceMoved, "PASSANT"];
                }
            }
        }

        return false;
    }





    isKingInCheckAfterMove(move) {
        var i = move[0];
        var j = move[1];
        var color = this.board[i][j].color;
        var kingPos = this.findKingPos(color);

        if (kingPos[0] === i && kingPos[1] === j) {
            kingPos = [move[2], move[3]];
        }

        if (this.makePseudoMove(move) === true) {
            var color2 = -1;

            if (color === 0) {
                color2 = 1;
            } else {
                color2 = 0;
            }

            var moves = this.getPseudoLegalMoves(color2);
            for (var idx2 = 0; idx2 < moves.length; idx2++) {
                if (moves[idx2][2] === kingPos[0] && moves[idx2][3] === kingPos[1]) {
                    this.revertLastMove(false);
                    return true;
                }
            }

            this.revertLastMove(false);
        }

        return false;

    }

    isCaptureAfterMove(move) {
        var i = move[0];
        var j = move[1];
        var color = this.board[i][j].color;
        var val1 = this.material_value();
        var val2 = val1;


        if (this.makeMove(move) === true) {
            val2 = this.material_value();
            var color2 = -1;

            if (color === 0) {
                color2 = 1;
            } else {
                color2 = 0;
            }

            if (val1 != val2) {
                this.revertLastMove(false);
                return true;
            }
            else{
                this.revertLastMove(false);
            }
        }

        return false;

    }







    revertPromotion(moveFlag2, lastMove) {
        if (moveFlag2 === "PROMOTE") {
            var pc = this.board[lastMove[0]][lastMove[1]];
            var aux_p = new Pawn(pc.color, pc.pos);

            this.board[lastMove[0]][lastMove[1]] = aux_p;
            this.deletePieceFromPieces(pc);
            this.pieces.push(aux_p);
        }
    }

    revertCastle(moveFlag) {
        var m = this.movesStack.length;
        if (m === this.castle[0]) {
            this.castle[0] = true;
        }
        if (m === this.castle[1]) {
            this.castle[1] = true;
        }
        if (m === this.castle[2]) {
            this.castle[2] = true;
        }
        if (m === this.castle[3]) {
            this.castle[3] = true;
        }

        if (moveFlag === "CASTLE-RW") {
            this.board[7][4] = this.board[7][6];
            this.board[7][4].pos = [7, 4];
            this.board[7][6] = false;
            this.board[7][7] = this.board[7][5];
            this.board[7][7].pos = [7, 7];
            this.board[7][5] = false;
            return true;
        } else if (moveFlag === "CASTLE-LW") {
            this.board[7][4] = this.board[7][2];
            this.board[7][4].pos = [7, 4];
            this.board[7][2] = false;
            this.board[7][0] = this.board[7][3];
            this.board[7][0].pos = [7, 0];
            this.board[7][3] = false;
            return true;
        } else if (moveFlag === "CASTLE-RB") {
            this.board[0][4] = this.board[0][6];
            this.board[0][4].pos = [0, 4];
            this.board[0][6] = false;
            this.board[0][7] = this.board[0][5];
            this.board[0][7].pos = [0, 7];
            this.board[0][5] = false;
            return true;
        } else if (moveFlag === "CASTLE-LB") {
            this.board[0][4] = this.board[0][2];
            this.board[0][4].pos = [0, 4];
            this.board[0][2] = false;
            this.board[0][0] = this.board[0][3];
            this.board[0][0].pos = [0, 0];
            this.board[0][3] = false;
            return true;
        } else {
            return false;
        }

    }



    revertLastMove(stackFlag) {
        if (this.movesStack.length <= 0) {
            return;
        }

        var pc = this.piecesStack.pop();
        var lastMove = this.movesStack.pop();

        if (stackFlag) {
            this.revertMoveStack.push(lastMove);
        }


        var moveFlag = lastMove[lastMove.length - 1];
        var moveFlag2 = lastMove[lastMove.length - 2];

        if (!this.revertCastle(moveFlag)) {

            this.board[lastMove[0]][lastMove[1]] = this.board[lastMove[2]][lastMove[3]];
            if (this.board[lastMove[0]][lastMove[1]] !== false) {
                this.board[lastMove[0]][lastMove[1]].pos = [lastMove[0], lastMove[1]];
            }
            this.board[lastMove[2]][lastMove[3]] = false;
            if (pc !== false) {
                this.board[pc.pos[0]][pc.pos[1]] = pc;
                this.pieces.push(pc);
            }

            this.revertPromotion(moveFlag2, lastMove);
        }

        this.gameState = true;
        this.setToMove();
    }



    goForwardMove() {
        if (this.revertMoveStack.length <= 0) {
            return;
        }
        var move = this.revertMoveStack.pop();

        this.revertStackFlag = true;
        this.makeMove(move);
    }



    getGameState() {
        var moves = this.getLegalMoves(this.toMove);
        if (moves.length <= 0) {
            if (this.isKingInCheck()) {
                return "CHECKMATE";
            } else {
                return "STALEMATE";
            }
        }
        return false;
    }

    isKingInCheck() {
        var color = this.toMove;

        var kingPos = this.findKingPos(color);

        if (color === 0) {
            color = 1;
        } else {
            color = 0;
        }

        var moves = this.getPseudoLegalMoves(color);
        for (var i = 0; i < moves.length; i++) {
            if (moves[i][2] === kingPos[0] && moves[i][3] === kingPos[1]) {
                return true;
            }
        }

        return false;
    }


    getLegalMoves(color) {
        var res = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (color === this.pieces[i].color) {
                var fil = this.pieces[i].pos[0];
                var col = this.pieces[i].pos[1];

                var aux = this.getMovesByPos(fil, col);

                for (var idx = 0; idx < aux.length; idx++) {
                    res.push(aux[idx]);
                }
            }
        }
        return res;
    }


    getMatrixOfThreats(){
        var res = [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]]
        var white_moves = this.getLegalMoves(0);
        var black_moves = this.getLegalMoves(1);

        for(var i = 0; i < white_moves.length; i++){
            var m = white_moves[i][2];
            var n = white_moves[i][3];

            if(this.board[m][n] !== false){
                res[m][n] = res[m][n] + 1;
            }
        }

        for(var i = 0; i < black_moves.length; i++){
            var m = black_moves[i][2];
            var n = black_moves[i][3];

            if(this.board[m][n] !== false){
                res[m][n] = res[m][n] - 1;
            }
        }
        return res;
    }
    


    getPseudoLegalMoves(color) {
        var res = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].color === color) {
                var moves = this.pieces[i].getMoves(this);
                for (var j = 0; j < moves.length; j++) {
                    res.push(moves[j]);
                }
            }
        }
        return res;
    }

    findKingPos(color) {
        if (color === 0) {
            for (var i = 0; i < this.pieces.length; i++) {
                if (this.pieces[i].name === "wk") {
                    return this.pieces[i].pos;
                }
            }
        } else {
            for (var i = 0; i < this.pieces.length; i++) {
                if (this.pieces[i].name === "bk") {
                    return this.pieces[i].pos;
                }
            }
        }
        return false;
    }

    makeMove(move) {
        if (move.length <= 0) {
            return false;
        }

        var i = move[0];
        var j = move[1];
        var p = this.board[i][j];

        var checkOnPassant = false;

        if (p.name === "wp" || p.name === "bp") {
            checkOnPassant = true;
        }

        if (p === false) {
            return -1;
        } else {
            var moves = this.getMovesByPos(i, j);


            for (var cont = 0; cont < moves.length; cont++) {
                if (moves[cont][2] === move[2] && moves[cont][3] === move[3]) {
                    var pt = this.board[move[2]][move[3]];
                    if (pt !== false) {
                        this.piecesStack.push(pt);
                        this.deletePieceFromPieces(pt);
                    } else {
                        this.piecesStack.push(false);
                    }

                    var lidx = moves[cont][moves[cont].length - 1];

                    if (checkOnPassant && lidx === "PASSANT") {
                        var aux_piece = moves[cont][4];
                        var ap_i = aux_piece.pos[0];
                        var ap_j = aux_piece.pos[1];

                        this.board[ap_i][ap_j] = false;
                        this.piecesStack.pop();
                        this.piecesStack.push(aux_piece);

                        this.deletePieceFromPieces(aux_piece);

                    }

                    if (lidx === "CASTLE-RW") {
                        this.board[7][5] = this.board[7][7];
                        this.board[7][7] = false;
                        this.board[7][5].pos = [7, 5];
                    }

                    if (lidx === "CASTLE-LW") {
                        this.board[7][3] = this.board[7][0];
                        this.board[7][0] = false;
                        this.board[7][3].pos = [7, 3];
                    }

                    if (lidx === "CASTLE-RB") {
                        this.board[0][5] = this.board[0][7];
                        this.board[0][7] = false;
                        this.board[0][5].pos = [0, 5];
                    }

                    if (lidx === "CASTLE-LB") {
                        this.board[0][3] = this.board[0][0];
                        this.board[0][0] = false;
                        this.board[0][3].pos = [0, 3];
                    }

                    var updateStack = false;

                    if (move[move.length - 2] === "PROMOTE") {
                        updateStack = true;
                        var aux_pc = this.board[move[0]][move[1]];

                        if (move[move.length - 1] === "Q") {
                            var q = new Queen(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(q);
                            this.board[move[0]][move[1]] = q;
                        } else if (move[move.length - 1] === "N") {
                            var n = new Knight(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(n);
                            this.board[move[0]][move[1]] = n;
                        } else if (move[move.length - 1] === "B") {
                            var b = new Bishop(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(b);
                            this.board[move[0]][move[1]] = b;
                        } else if (move[move.length - 1] === "R") {
                            var r = new Rook(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(r);
                            this.board[move[0]][move[1]] = r;
                        }

                    }

                    var m = this.movesStack.length;
                    if (p.name === "wk") {
                        if (this.castle[0] === true) {
                            if (move[0] === 7 && move[1] === 4) {
                                this.castle[0] = m;
                            }
                        }
                        if (this.castle[1] === true) {
                            if (move[0] === 7 && move[1] === 4) {
                                this.castle[1] = m;
                            }
                        }
                    }

                    if (p.name === "bk") {
                        if (this.castle[2] === true) {
                            if (move[0] === 0 && move[1] === 4) {
                                this.castle[2] = m;
                            }
                        }
                        if (this.castle[3] === true) {
                            if (move[0] === 0 && move[1] === 4) {
                                this.castle[3] = m;
                            }
                        }
                    }


                    if (p.name === "wr" || p.name === "br") {
                        if (this.castle[1] === true && move[0] === 7 && move[1] === 0) {
                            this.castle[1] = m;
                        }
                        if (this.castle[0] === true && move[0] === 7 && move[1] === 7) {
                            this.castle[0] = m;
                        }
                        if (this.castle[3] === true && move[0] === 0 && move[1] === 0) {
                            this.castle[3] = m;
                        }
                        if (this.castle[2] === true && move[0] === 0 && move[1] === 7) {
                            this.castle[2] = m;
                        }
                    }

                    if (updateStack === true) {
                        this.movesStack.push(move);
                    } else {
                        this.movesStack.push(moves[cont]);
                    }

                    if (!this.revertStackFlag) {
                        this.revertMoveStack = [];
                    }
                    this.revertStackFlag = false;


                    this.board[move[2]][move[3]] = this.board[i][j];
                    this.board[i][j] = false;
                    this.board[move[2]][move[3]].pos = [move[2], move[3]];
                    this.setToMove();

                    var gameResult = this.getGameState();
                    if (gameResult === "CHECKMATE") {
                        this.gameState = "CHECKMATE";
                    } else if (gameResult === "STALEMATE") {
                        this.gameState = "STALEMATE";
                    }
                    return true;
                }
            }
        }

        return false;

    }


    makePseudoMove(move) {
        var i = move[0];
        var j = move[1];
        var p = this.board[i][j];
        var checkOnPassant = false;

        if (p.name === "wp" || p.name === "bp") {
            checkOnPassant = true;
        }

        if (p === false) {
            return -1;
        } else {
            var moves = p.getMoves(this);
            for (var cont = 0; cont < moves.length; cont++) {
                if (moves[cont][2] === move[2] && moves[cont][3] === move[3]) {
                    var pt = this.board[move[2]][move[3]];
                    if (pt !== false) {
                        this.piecesStack.push(pt);
                        this.deletePieceFromPieces(pt);
                    } else {
                        this.piecesStack.push(false);
                    }

                    var lidx = moves[cont][moves[cont].length - 1];

                    if (checkOnPassant && lidx === "PASSANT") {
                        var aux_piece = moves[cont][4];
                        var ap_i = aux_piece.pos[0];
                        var ap_j = aux_piece.pos[1];

                        this.board[ap_i][ap_j] = false;
                        this.piecesStack.pop();
                        this.piecesStack.push(aux_piece);

                        this.deletePieceFromPieces(aux_piece);

                    }

                    if (lidx === "CASTLE-RW") {
                        this.board[7][5] = this.board[7][7];
                        this.board[7][7] = false;
                        this.board[7][5].pos = [7, 5];
                    }

                    if (lidx === "CASTLE-LW") {
                        this.board[7][3] = this.board[7][0];
                        this.board[7][0] = false;
                        this.board[7][3].pos = [7, 3];
                    }

                    if (lidx === "CASTLE-RB") {
                        this.board[0][5] = this.board[0][7];
                        this.board[0][7] = false;
                        this.board[0][5].pos = [0, 5];
                    }

                    if (lidx === "CASTLE-LB") {
                        this.board[0][3] = this.board[0][0];
                        this.board[0][0] = false;
                        this.board[0][3].pos = [0, 3];
                    }

                    var updateStack = false;

                    if (moves[cont][moves[cont].length - 2] === "PROMOTE") {
                        var aux_pc = this.board[move[0]][move[1]];
                        updateStack = true;

                        if (lidx === "Q") {
                            var q = new Queen(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(q);
                        } else if (lidx === "N") {
                            var n = new Knight(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(n);
                        } else if (lidx === "B") {
                            var b = new Bishop(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(b);
                        } else if (lidx === "R") {
                            var r = new Rook(aux_pc.color, aux_pc.pos);
                            this.deletePieceFromPieces(aux_pc);
                            this.pieces.push(r);
                        }

                    }


                    if (updateStack) {
                        this.movesStack.push(move);
                    } else {
                        this.movesStack.push(moves[cont]);
                    }

                    this.board[move[2]][move[3]] = this.board[i][j];
                    this.board[i][j] = false;
                    this.board[move[2]][move[3]].pos = [move[2], move[3]];
                    this.setToMove();
                    return true;
                }
            }
        }

        return false;

    }

    is_checkmate() {
        return this.gameState === "CHECKMATE";
    }

    is_stalemate() {
        return this.gameState === "STALEMATE";
    }

    material_value() {
        var res = 0;
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].name === "wp") {
                res = res + 100;
            } else if (this.pieces[i].name === "bp") {
                res = res - 100;
            } else if (this.pieces[i].name === "wb") {
                res = res + 300;
            } else if (this.pieces[i].name === "bb") {
                res = res - 300;
            } else if (this.pieces[i].name === "wn") {
                res = res + 300;
            } else if (this.pieces[i].name === "bn") {
                res = res - 300;
            } else if (this.pieces[i].name === "wr") {
                res = res + 500;
            } else if (this.pieces[i].name === "br") {
                res = res - 500;
            } else if (this.pieces[i].name === "wq") {
                res = res + 900;
            } else if (this.pieces[i].name === "bq") {
                res = res - 900;
            } else if (this.gameState === "CHECKMATE") {
                if (this.toMove === 0) {
                    return -999999;
                } else {
                    return 999999;
                }
            }
        }
        return res;
    }


    moveToSan(move) {
        var pc = this.board[move[0]][move[1]];
        var pc2 = this.board[move[2]][move[3]];

        var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

        var piece_letter = "";

        if (pc.name === "wb" || pc.name === "bb") {
            piece_letter = "B";
        } else if (pc.name === "wn" || pc.name === "bn") {
            piece_letter = "N";
        } else if (pc.name === "wr" || pc.name === "br") {
            piece_letter = "R";
        } else if (pc.name === "wq" || pc.name === "bq") {
            piece_letter = "Q";
        } else if (pc.name === "wk" || pc.name === "bk") {
            piece_letter = "K";
        }

        var res = piece_letter;

        //Captura al paso
        if (move[move.length - 1] === "PASSANT") {
            res += letters[move[1]];
            res += "x";

            if (pc.color === 0) {
                var fil = 7 - move[2] + 1;
                res += letters[move[3]];
                res += (fil).toString();
            } else {
                var fil = 7 - move[2] - 1;
                res += letters[move[3]];
                res += (fil).toString();
            }
            return res;
        }

        //Si es caballo o torre comprobamos si la otra pieza puede moverse ahi tambien
        if (res === "R" || res === "N") {
            var pc3 = this.getTheOtherPiece(pc);

            if (pc3 !== false) {
                if (this.contieneMovimientoHacia([move[2], move[3]], pc3)) {
                    if (pc.pos[0] === pc3.pos[0]) {
                        res += (8 - pc.pos[0]).toString();
                    } else if (pc.pos[1] === pc3.pos[1]) {
                        res += letters[pc.pos[1]];
                    }
                }
            }
        }

        //Si existe una pieza de otro color poner la x
        if (pc2 !== false && pc2.color !== pc.color) {
            if (piece_letter === "") {
                res += letters[move[1]];
            }
            res += "x";
        }

        //Poner la casilla a la que nos movemos
        res += letters[move[3]];
        res += (8 - move[2]).toString();

        //Comprobar jaque
        if (this.isKingInCheckAfterMove(move)) {
            res += "+";
        }

        //Comprobar coronar
        if (move[move.length - 2] === "PROMOTE") {
            res += "=" + move[move.length - 1];
        }

        return res;

    }

    sanToMove(san) {
        var arr = san.replace('x', '');
        arr = arr.replace('+', '');
        arr = arr.split("");
        var m = arr.length;

        if (san === "O-O") {
            var kPos = this.findKingPos(this.toMove);
            var moves = this.getMovesByPos(kPos[0], kPos[1]);

            for (var i = 0; i < moves.length; i++) {
                if (moves[i][moves[i].length - 1] === "CASTLE-RW" || moves[i][moves[i].length - 1] === "CASTLE-RB") {
                    return moves[i];
                }
            }
        }
        if (san === "O-O-O") {
            var kPos = this.findKingPos(this.toMove);
            var moves = this.getMovesByPos(kPos[0], kPos[1]);

            for (var i = 0; i < moves.length; i++) {
                if (moves[i][moves[i].length - 1] === "CASTLE-LW" || moves[i][moves[i].length - 1] === "CASTLE-LB") {
                    return moves[i];
                }
            }
        }



        if (m <= 0) {
            return false;
        }

        var pc = false;
        var firstPos = [-1, -1];

        switch (arr[0]) {
            case "B":
                pc = this.findPiecesByName("B");
                break;
            case "N":
                pc = this.findPiecesByName("N");
                break;
            case "R":
                pc = this.findPiecesByName("R");
                break;
            case "Q":
                pc = this.findPiecesByName("Q");
                break;
            case "K":
                pc = this.findPiecesByName("K");
                break;
            case "a":
                firstPos[1] = 0;
                break;
            case "b":
                firstPos[1] = 1;
                break;
            case "c":
                firstPos[1] = 2;
                break;
            case "d":
                firstPos[1] = 3;
                break;
            case "e":
                firstPos[1] = 4;
                break;
            case "f":
                firstPos[1] = 5;
                break;
            case "g":
                firstPos[1] = 6;
                break;
            case "h":
                firstPos[1] = 7;
                break;
        }

        if (pc === false) {
            switch (arr[1]) {
                case "1":
                    firstPos[0] = 7;
                    break;
                case "2":
                    firstPos[0] = 6;
                    break;
                case "3":
                    firstPos[0] = 5;
                    break;
                case "4":
                    firstPos[0] = 4;
                    break;
                case "5":
                    firstPos[0] = 3;
                    break;
                case "6":
                    firstPos[0] = 2;
                    break;
                case "7":
                    firstPos[0] = 1;
                    break;
                case "8":
                    firstPos[0] = 0;
                    break;
            }

            var peones = this.findPiecesByName("P");



            if (firstPos[0] === -1) {
                //Encontrar peones en firstPos[1] y ver cual se puede mover a la siguiente casilla
                var nextPos = [-1, -1];

                switch (arr[1]) {
                    case "a":
                        nextPos[1] = 0;
                        break;
                    case "b":
                        nextPos[1] = 1;
                        break;
                    case "c":
                        nextPos[1] = 2;
                        break;
                    case "d":
                        nextPos[1] = 3;
                        break;
                    case "e":
                        nextPos[1] = 4;
                        break;
                    case "f":
                        nextPos[1] = 5;
                        break;
                    case "g":
                        nextPos[1] = 6;
                        break;
                    case "h":
                        nextPos[1] = 7;
                        break;
                }
                switch (arr[2]) {
                    case "1":
                        nextPos[0] = 7;
                        break;
                    case "2":
                        nextPos[0] = 6;
                        break;
                    case "3":
                        nextPos[0] = 5;
                        break;
                    case "4":
                        nextPos[0] = 4;
                        break;
                    case "5":
                        nextPos[0] = 3;
                        break;
                    case "6":
                        nextPos[0] = 2;
                        break;
                    case "7":
                        nextPos[0] = 1;
                        break;
                    case "8":
                        nextPos[0] = 0;
                        break;
                }

                var peones_aux = [];

                for (var i = 0; i < peones.length; i++) {
                    if (peones[i].pos[1] === firstPos[1]) {
                        peones_aux.push(peones[i]);
                    }
                }

                if (arr[m - 2] === "=" && m === 5 && ((arr[m - 1] === "Q") || (arr[m - 1] === "N") || (arr[m - 1] === "B") || (arr[m - 1] === "R"))) {
                    for (var i = 0; i < peones_aux.length; i++) {
                        if (this.contieneMovimientoHacia(nextPos, peones_aux[i])) {
                            return [peones[i].pos[0], peones[i].pos[1], nextPos[0], nextPos[1], "PROMOTE", arr[m - 1]];
                        }
                    }
                }

                for (var i = 0; i < peones_aux.length; i++) {
                    var move = this.contieneMovimientoHacia2(nextPos, peones_aux[i]);
                    if (move !== false) {

                        return move;
                    }
                }

            } else {
                if (arr[m - 2] === "=" && m === 4 && ((arr[m - 1] === "Q") || (arr[m - 1] === "N") || (arr[m - 1] === "B") || (arr[m - 1] === "R"))) {
                    for (var i = 0; i < peones.length; i++) {
                        if (this.contieneMovimientoHacia(firstPos, peones[i])) {
                            return [peones[i].pos[0], peones[i].pos[1], firstPos[0], firstPos[1], "PROMOTE", arr[m - 1]];
                        }
                    }
                }
                if (m === 2) {
                    for (var i = 0; i < peones.length; i++) {
                        if (this.contieneMovimientoHacia(firstPos, peones[i])) {
                            return [peones[i].pos[0], peones[i].pos[1], firstPos[0], firstPos[1]];
                        }
                    }
                }
            }
        }




        //Si es una pieza que no sea peon
        else {
            switch (arr[1]) {
                case "1":
                    firstPos[0] = 7;
                    break;
                case "2":
                    firstPos[0] = 6;
                    break;
                case "3":
                    firstPos[0] = 5;
                    break;
                case "4":
                    firstPos[0] = 4;
                    break;
                case "5":
                    firstPos[0] = 3;
                    break;
                case "6":
                    firstPos[0] = 2;
                    break;
                case "7":
                    firstPos[0] = 1;
                    break;
                case "8":
                    firstPos[0] = 0;
                    break;
                case "a":
                    firstPos[1] = 0;
                    break;
                case "b":
                    firstPos[1] = 1;
                    break;
                case "c":
                    firstPos[1] = 2;
                    break;
                case "d":
                    firstPos[1] = 3;
                    break;
                case "e":
                    firstPos[1] = 4;
                    break;
                case "f":
                    firstPos[1] = 5;
                    break;
                case "g":
                    firstPos[1] = 6;
                    break;
                case "h":
                    firstPos[1] = 7;
                    break;
            }



            if (firstPos[0] === -1 && firstPos[1] === -1) {
                var nextPos = [-1, -1];
                switch (arr[1]) {
                    case "a":
                        nextPos[1] = 0;
                        break;
                    case "b":
                        nextPos[1] = 1;
                        break;
                    case "c":
                        nextPos[1] = 2;
                        break;
                    case "d":
                        nextPos[1] = 3;
                        break;
                    case "e":
                        nextPos[1] = 4;
                        break;
                    case "f":
                        nextPos[1] = 5;
                        break;
                    case "g":
                        nextPos[1] = 6;
                        break;
                    case "h":
                        nextPos[1] = 7;
                        break;
                }
                switch (arr[2]) {
                    case "1":
                        nextPos[0] = 7;
                        break;
                    case "2":
                        nextPos[0] = 6;
                        break;
                    case "3":
                        nextPos[0] = 5;
                        break;
                    case "4":
                        nextPos[0] = 4;
                        break;
                    case "5":
                        nextPos[0] = 3;
                        break;
                    case "6":
                        nextPos[0] = 2;
                        break;
                    case "7":
                        nextPos[0] = 1;
                        break;
                    case "8":
                        nextPos[0] = 0;
                        break;
                }


                for (var i = 0; i < pc.length; i++) {
                    if (this.contieneMovimientoHacia(nextPos, pc[i])) {
                        return [pc[i].pos[0], pc[i].pos[1], nextPos[0], nextPos[1]];
                    }
                }
            } else if (firstPos[0] === -1 && !this.isInLetters(arr[2]) && m === 3) {
                firstPos[0] = this.getValueOfLetterNum(arr[2]);
                if (firstPos[0] !== false) {
                    for (var i = 0; i < pc.length; i++) {
                        if (this.contieneMovimientoHacia(firstPos, pc[i])) {
                            return [pc[i].pos[0], pc[i].pos[1], firstPos[0], firstPos[1]];
                        }
                    }
                }
            } else if (firstPos[0] === -1 && this.isInLetters(arr[2]) && m === 4) {
                var aux_pos = firstPos[1];
                firstPos[1] = this.getValueOfLetter(arr[2]);
                firstPos[0] = this.getValueOfLetterNum(arr[3]);
                if (firstPos[0] !== false) {
                    for (var i = 0; i < pc.length; i++) {
                        if (this.contieneMovimientoHacia(firstPos, pc[i]) && pc[i].pos[1] === aux_pos) {
                            return [pc[i].pos[0], pc[i].pos[1], firstPos[0], firstPos[1]];
                        }
                    }
                }
            } else if (firstPos[0] !== -1 && this.isInLetters(arr[2]) && m === 4) {
                var aux_pos = firstPos[0];
                firstPos[1] = this.getValueOfLetter(arr[2]);
                firstPos[0] = this.getValueOfLetterNum(arr[3]);
                if (firstPos[0] !== false) {
                    for (var i = 0; i < pc.length; i++) {
                        if (this.contieneMovimientoHacia(firstPos, pc[i]) && pc[i].pos[0] === aux_pos) {
                            return [pc[i].pos[0], pc[i].pos[1], firstPos[0], firstPos[1]];
                        }
                    }
                }
            }
        }
        return false;

    }


    getValueOfLetterNum(letter) {
        switch (letter) {
            case "1":
                return 7;
            case "2":
                return 6;
            case "3":
                return 5;
            case "4":
                return 4;
            case "5":
                return 3;
            case "6":
                return 2;
            case "7":
                return 1;
            case "8":
                return 0;
        }
        return false;
    }

    getValueOfLetter(letter) {
        switch (letter) {
            case "a":
                return 0;
            case "b":
                return 1;
            case "c":
                return 2;
            case "d":
                return 3;
            case "e":
                return 4;
            case "f":
                return 5;
            case "g":
                return 6;
            case "h":
                return 7;
        }
        return false;
    }


    isInLetters(letter) {
        switch (letter) {
            case "a":
                return true;
            case "b":
                return true;
            case "c":
                return true;
            case "d":
                return true;
            case "e":
                return true;
            case "f":
                return true;
            case "g":
                return true;
            case "h":
                return true;
        }
        return false;
    }


    findPiecesByName(name) {
        var res = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (((this.pieces[i].name[0] === "w" && this.toMove === 0) || (this.pieces[i].name[0] === "b" && this.toMove === 1)) && this.pieces[i].name[1].toUpperCase() === name) {
                res.push(this.pieces[i]);
            }
        }

        return res;
    }

    contieneMovimientoHacia(posicion, pc) {
        var moves = this.getMovesByPos(pc.pos[0], pc.pos[1]);

        for (var i = 0; i < moves.length; i++) {
            if (moves[i][2] === posicion[0] && moves[i][3] === posicion[1]) {
                return true;
            }
        }

        return false;
    }

    contieneMovimientoHacia2(posicion, pc) {
        var moves = this.getMovesByPos(pc.pos[0], pc.pos[1]);

        for (var i = 0; i < moves.length; i++) {
            if (moves[i][2] === posicion[0] && moves[i][3] === posicion[1]) {
                return moves[i];
            }
        }

        return false;
    }

    getTheOtherPiece(piece) {
        var pos = piece.pos;

        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].name === piece.name && !(pos[0] === this.pieces[i].pos[0] && pos[1] === this.pieces[i].pos[1])) {
                return this.pieces[i];
            }
        }

        return false;
    }


    setToMove() {
        if (this.toMove === 0) {
            this.toMove = 1;
        } else {
            this.toMove = 0;
        }
    }

    getFullGame(){
        var aux_flag = 0;
        var move_num = 1;
        var res = "";
        var board2 = new Board();
        for(var i=0; i<this.movesStack.length; i++){
            if(aux_flag == 0){
                res += move_num.toString() + "."
                aux_flag = 1;
                move_num++;
            }
            else if(aux_flag > 0){
                aux_flag = 0;
            }
            res += board2.moveToSan(this.movesStack[i]).toString() + " ";
            board2.makeMove(this.movesStack[i]);
            
    
        }

        if(res.length > 1){
            res = res.slice(0, -1);
        }
        return res;
    }



    toString() {
        var res = "";
        var size = this.board.length;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (this.board[i][j] === false) {
                    res += ".  ";
                } else {
                    res += this.board[i][j].toString() + "";
                }
            }
            res += "<br/>";
        }
        return res;
    }
}






class Piece {
    constructor(color, pos) {
        this.color = color;
        this.pos = pos;
    }
}

class Pawn extends Piece {

    constructor(color, pos) {
        super(color, pos);
        if (color === 0) {
            this.name = "wp";
        } else {
            this.name = "bp";
        }
    }

    getMoves(board) {
        var i = this.pos[0];
        var j = this.pos[1];
        var color = this.color;
        var squares = board.board;
        var res = [];


        if (color === 0) {

            //Un movimiento hacia arriba
            if ((i - 1) >= 0) {
                if (squares[i - 1][j] === false) {
                    res.push([i, j, (i - 1), j]);

                    //Primer movimiento dos hacia arriba
                    if (i === 6 && squares[i - 2][j] === false) {
                        res.push([i, j, (i - 2), j]);
                    }
                }
            }


            //Captura izquierda
            if ((i - 1) >= 0 && (j - 1) >= 0) {
                if (squares[i - 1][j - 1] !== false) {
                    if (squares[i - 1][j - 1].color === 1) {
                        res.push([i, j, (i - 1), (j - 1)]);
                    }
                }
            }

            //Captura derecha
            if ((i - 1) >= 0 && (j + 1) < 8) {
                if (squares[i - 1][j + 1] !== false) {
                    if (squares[i - 1][j + 1].color === 1) {
                        res.push([i, j, (i - 1), (j + 1)]);
                    }
                }
            }
        } else {
            //Un movimiento hacia abajo
            if ((i + 1) < 8) {
                if (squares[i + 1][j] === false) {
                    res.push([i, j, (i + 1), j]);

                    //Primer movimiento dos hacia abajo
                    if (i === 1 && squares[i + 2][j] === false) {
                        res.push([i, j, (i + 2), j]);
                    }
                }
            }


            //Captura izquierda
            if ((i + 1) < 8 && (j - 1) >= 0) {
                if (squares[i + 1][j - 1] !== false) {
                    if (squares[i + 1][j - 1].color === 0) {
                        res.push([i, j, (i + 1), (j - 1)]);
                    }
                }
            }

            //Captura derecha
            if ((i + 1) < 8 && (j + 1) < 8) {
                if (squares[i + 1][j + 1] !== false) {
                    if (squares[i + 1][j + 1].color === 0) {
                        res.push([i, j, (i + 1), (j + 1)]);
                    }
                }
            }
        }

        return res;
    }

    toString() {
        if (this.color === 1) {
            return "bp";
        } else {
            return "wp";
        }
    }
}









class Knight extends Piece {

    constructor(color, pos) {
        super(color, pos);
        if (color === 0) {
            this.name = "wn";
        } else {
            this.name = "bn";
        }
    }

    getMoves(board) {
        var i = this.pos[0];
        var j = this.pos[1];
        var color = this.color;
        var squares = board.board;
        var res = [];


        if ((i + 2) < 8 && (j - 1) >= 0) {
            if (squares[i + 2][j - 1] !== false) {
                if (squares[i + 2][j - 1].color !== color) {
                    res.push([i, j, (i + 2), (j - 1)]);
                }
            } else {
                res.push([i, j, (i + 2), (j - 1)]);
            }
        }

        if ((i + 2) < 8 && (j + 1) < 8) {
            if (squares[i + 2][j + 1] !== false) {
                if (squares[i + 2][j + 1].color !== color) {
                    res.push([i, j, (i + 2), (j + 1)]);
                }
            } else {
                res.push([i, j, (i + 2), (j + 1)]);
            }
        }

        if ((i + 1) < 8 && (j + 2) < 8) {
            if (squares[i + 1][j + 2] !== false) {
                if (squares[i + 1][j + 2].color !== color) {
                    res.push([i, j, (i + 1), (j + 2)]);
                }
            } else {
                res.push([i, j, (i + 1), (j + 2)]);
            }
        }

        if ((i - 1) >= 0 && (j + 2) < 8) {
            if (squares[i - 1][j + 2] !== false) {
                if (squares[i - 1][j + 2].color !== color) {
                    res.push([i, j, (i - 1), (j + 2)]);
                }
            } else {
                res.push([i, j, (i - 1), (j + 2)]);
            }
        }

        if ((i - 2) >= 0 && (j + 1) < 8) {
            if (squares[i - 2][j + 1] !== false) {
                if (squares[i - 2][j + 1].color !== color) {
                    res.push([i, j, (i - 2), (j + 1)]);
                }
            } else {
                res.push([i, j, (i - 2), (j + 1)]);
            }
        }

        if ((i - 2) >= 0 && (j - 1) >= 0) {
            if (squares[i - 2][j - 1] !== false) {
                if (squares[i - 2][j - 1].color !== color) {
                    res.push([i, j, (i - 2), (j - 1)]);
                }
            } else {
                res.push([i, j, (i - 2), (j - 1)]);
            }
        }

        if ((i - 1) >= 0 && (j - 2) >= 0) {
            if (squares[i - 1][j - 2] !== false) {
                if (squares[i - 1][j - 2].color !== color) {
                    res.push([i, j, (i - 1), (j - 2)]);
                }
            } else {
                res.push([i, j, (i - 1), (j - 2)]);
            }
        }

        if ((i + 1) < 8 && (j - 2) >= 0) {
            if (squares[i + 1][j - 2] !== false) {
                if (squares[i + 1][j - 2].color !== color) {
                    res.push([i, j, (i + 1), (j - 2)]);
                }
            } else {
                res.push([i, j, (i + 1), (j - 2)]);
            }
        }

        return res;
    }

}






class Bishop extends Piece {

    constructor(color, pos) {
        super(color, pos);
        if (color === 0) {
            this.name = "wb";
        } else {
            this.name = "bb";
        }
    }

    getMoves(board) {
        var i = this.pos[0];
        var j = this.pos[1];
        var color = this.color;
        var squares = board.board;
        var res = [];

        //Diagonal abajo derecha
        var aux_i = i + 1;
        var aux_j = j + 1;
        while (aux_i < 8 && aux_j < 8) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i++;
            aux_j++;
        }

        //Diagonal abajo izquierda
        var aux_i = i + 1;
        var aux_j = j - 1;
        while (aux_i < 8 && aux_j >= 0) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i++;
            aux_j--;
        }

        //Diagonal arriba izquierda
        var aux_i = i - 1;
        var aux_j = j - 1;
        while (aux_i >= 0 && aux_j >= 0) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i--;
            aux_j--;
        }

        //Diagonal arriba derecha
        var aux_i = i - 1;
        var aux_j = j + 1;
        while (aux_i >= 0 && aux_j < 8) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i--;
            aux_j++;
        }




        return res;

    }
}



class Rook extends Piece {

    constructor(color, pos, hasMoved) {
        super(color, pos);
        this.hasMoved = hasMoved;
        if (color === 0) {
            this.name = "wr";
        } else {
            this.name = "br";
        }
    }

    getMoves(board) {
        var i = this.pos[0];
        var j = this.pos[1];
        var color = this.color;
        var squares = board.board;
        var res = [];

        //Abajo
        for (var aux_i = i + 1; aux_i < 8; aux_i++) {
            if (squares[aux_i][j] === false) {
                res.push([i, j, aux_i, j]);
            } else {
                if (squares[aux_i][j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, j]);
                    break;
                }
            }
        }

        //Arriba
        for (var aux_i = i - 1; aux_i >= 0; aux_i--) {
            if (squares[aux_i][j] === false) {
                res.push([i, j, aux_i, j]);
            } else {
                if (squares[aux_i][j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, j]);
                    break;
                }
            }
        }

        //Derecha
        for (var aux_j = j - 1; aux_j >= 0; aux_j--) {
            if (squares[i][aux_j] === false) {
                res.push([i, j, i, aux_j]);
            } else {
                if (squares[i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, i, aux_j]);
                    break;
                }
            }
        }

        //Izquierda
        for (var aux_j = j + 1; aux_j < 8; aux_j++) {
            if (squares[i][aux_j] === false) {
                res.push([i, j, i, aux_j]);
            } else {
                if (squares[i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, i, aux_j]);
                    break;
                }
            }
        }

        return res;

    }

}

class Queen extends Piece {

    constructor(color, pos) {
        super(color, pos);
        if (color === 0) {
            this.name = "wq";
        } else {
            this.name = "bq";
        }
    }

    getMoves(board) {
        var i = this.pos[0];
        var j = this.pos[1];
        var color = this.color;
        var squares = board.board;
        var res = [];

        //Diagonal abajo derecha
        var aux_i = i + 1;
        var aux_j = j + 1;
        while (aux_i < 8 && aux_j < 8) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i++;
            aux_j++;
        }

        //Diagonal abajo izquierda
        var aux_i = i + 1;
        var aux_j = j - 1;
        while (aux_i < 8 && aux_j >= 0) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i++;
            aux_j--;
        }

        //Diagonal arriba izquierda
        var aux_i = i - 1;
        var aux_j = j - 1;
        while (aux_i >= 0 && aux_j >= 0) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i--;
            aux_j--;
        }

        //Diagonal arriba derecha
        var aux_i = i - 1;
        var aux_j = j + 1;
        while (aux_i >= 0 && aux_j < 8) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {

                if (squares[aux_i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, aux_j]);
                    break;
                }
            }
            aux_i--;
            aux_j++;
        }

        //Abajo
        for (var aux_i = i + 1; aux_i < 8; aux_i++) {
            if (squares[aux_i][j] === false) {
                res.push([i, j, aux_i, j]);
            } else {
                if (squares[aux_i][j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, j]);
                    break;
                }
            }
        }

        //Arriba
        for (var aux_i = i - 1; aux_i >= 0; aux_i--) {
            if (squares[aux_i][j] === false) {
                res.push([i, j, aux_i, j]);
            } else {
                if (squares[aux_i][j].color === color) {
                    break;
                } else {
                    res.push([i, j, aux_i, j]);
                    break;
                }
            }
        }

        //Derecha
        for (var aux_j = j - 1; aux_j >= 0; aux_j--) {
            if (squares[i][aux_j] === false) {
                res.push([i, j, i, aux_j]);
            } else {
                if (squares[i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, i, aux_j]);
                    break;
                }
            }
        }

        //Izquierda
        for (var aux_j = j + 1; aux_j < 8; aux_j++) {
            if (squares[i][aux_j] === false) {
                res.push([i, j, i, aux_j]);
            } else {
                if (squares[i][aux_j].color === color) {
                    break;
                } else {
                    res.push([i, j, i, aux_j]);
                    break;
                }
            }
        }



        return res;
    }


}


class King extends Piece {

    constructor(color, pos, hasMoved) {
        super(color, pos);

        this.hasMoved = hasMoved;
        if (color === 0) {
            this.name = "wk";
        } else {
            this.name = "bk";
        }
    }

    getMoves(board) {
        var i = this.pos[0];
        var j = this.pos[1];
        var color = this.color;
        var squares = board.board;
        var res = [];

        //Diagonal arriba izquierda
        var aux_i = (i - 1);
        var aux_j = (j - 1);
        if (aux_i >= 0 && aux_j >= 0) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {
                if (squares[aux_i][aux_j].color !== color) {
                    res.push([i, j, aux_i, aux_j]);
                }
            }
        }

        //Diagonal arriba derecha
        var aux_i = (i - 1);
        var aux_j = (j + 1);
        if (aux_i >= 0 && aux_j < 8) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {
                if (squares[aux_i][aux_j].color !== color) {
                    res.push([i, j, aux_i, aux_j]);
                }
            }
        }

        //Diagonal abajo derecha
        var aux_i = (i + 1);
        var aux_j = (j + 1);
        if (aux_i < 8 && aux_j < 8) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {
                if (squares[aux_i][aux_j].color !== color) {
                    res.push([i, j, aux_i, aux_j]);
                }
            }
        }

        //Diagonal abajo izquierda
        var aux_i = (i + 1);
        var aux_j = (j - 1);
        if (aux_i < 8 && aux_j >= 0) {
            if (squares[aux_i][aux_j] === false) {
                res.push([i, j, aux_i, aux_j]);
            } else {
                if (squares[aux_i][aux_j].color !== color) {
                    res.push([i, j, aux_i, aux_j]);
                }
            }
        }

        //Arriba
        var aux_i = (i - 1);
        if (aux_i >= 0) {
            if (squares[aux_i][j] === false) {
                res.push([i, j, aux_i, j]);
            } else {
                if (squares[aux_i][j].color !== color) {
                    res.push([i, j, aux_i, j]);
                }
            }
        }

        //Abajo
        var aux_i = (i + 1);
        if (aux_i < 8) {
            if (squares[aux_i][j] === false) {
                res.push([i, j, aux_i, j]);
            } else {
                if (squares[aux_i][j].color !== color) {
                    res.push([i, j, aux_i, j]);
                }
            }
        }

        //Derecha
        var aux_j = (j + 1);
        if (aux_j < 8) {
            if (squares[i][aux_j] === false) {
                res.push([i, j, i, aux_j]);
            } else {
                if (squares[i][aux_j].color !== color) {
                    res.push([i, j, i, aux_j]);
                }
            }
        }

        //Izquierda
        var aux_j = (j - 1);
        if (aux_j >= 0) {
            if (squares[i][aux_j] === false) {
                res.push([i, j, i, aux_j]);
            } else {
                if (squares[i][aux_j].color !== color) {
                    res.push([i, j, i, aux_j]);
                }
            }
        }

        return res;
    }


}